import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useNavigation } from '@/hooks/useSiteSettings';
import SectionHeading from '@/components/SectionHeading';

export default function Search() {
  const { main, explore } = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const [work, blog, photos, leadership, orgs, awards, timeline, ugc] = await Promise.all([
          base44.entities.Work.filter({ status: 'published' }, '-order', 50).catch(() => []),
          base44.entities.BlogPost.filter({ status: 'published' }, '-published_date', 50).catch(() => []),
          base44.entities.Photo.filter({ status: 'published' }, 'order', 50).catch(() => []),
          base44.entities.LeadershipRole.filter({ status: 'published' }, 'order', 50).catch(() => []),
          base44.entities.Organization.filter({ status: 'published' }, 'order', 50).catch(() => []),
          base44.entities.Award.filter({ status: 'published' }, 'order', 50).catch(() => []),
          base44.entities.TimelineEvent.filter({ status: 'published' }, '-date', 50).catch(() => []),
          base44.entities.Ugc.filter({ status: 'published' }, 'order', 50).catch(() => []),
        ]);
        const q = query.toLowerCase();
        const match = (text) => String(text || '').toLowerCase().includes(q);

        const all = [
          ...work.filter((w) => match(w.title) || match(w.tagline) || match(w.description)).map((w) => ({ type: 'Work', label: w.title, subtitle: w.work_type?.replace(/_/g, ' '), path: `/work/${w.slug || w.id}` })),
          ...blog.filter((b) => match(b.title) || match(b.excerpt)).map((b) => ({ type: 'Blog', label: b.title, subtitle: b.category, path: `/blog/${b.id}` })),
          ...photos.filter((p) => match(p.title) || match(p.category)).map((p) => ({ type: 'Photo', label: p.title || p.category, subtitle: p.category, path: '/photography' })),
          ...leadership.filter((l) => match(l.organization) || match(l.role_title)).map((l) => ({ type: 'Leadership', label: l.role_title, subtitle: l.organization, path: '/leadership' })),
          ...orgs.filter((o) => match(o.name)).map((o) => ({ type: 'Organization', label: o.name, subtitle: o.role, path: '/organizations' })),
          ...awards.filter((a) => match(a.title) || match(a.organization)).map((a) => ({ type: 'Award', label: a.title, subtitle: a.organization, path: '/awards' })),
          ...timeline.filter((t) => match(t.title) || match(t.description)).map((t) => ({ type: 'Timeline', label: t.title, subtitle: new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }), path: '/timeline' })),
          ...ugc.filter((u) => match(u.title) || match(u.brand) || match(u.campaign)).map((u) => ({ type: 'UGC', label: u.title, subtitle: u.brand || u.category, path: '/ugc' })),
        ];
        setResults(all);
      } catch (e) { setResults([]); }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filters = ['all', ...new Set(results.map((r) => r.type))];
  const filtered = filter === 'all' ? results : results.filter((r) => r.type === filter);
  const pages = [...main, ...explore];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Discover" title="Search" subtitle="Find anything across the entire platform." />

          <div className="relative mb-8">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search work, blog, photography, leadership..."
              autoFocus
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:border-primary/50 transition-premium"
            />
          </div>

          {!query.trim() ? (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Pages</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pages.map((page) => (
                  <Link key={page.path} to={page.path} className="glass-card p-4 flex items-center justify-between group">
                    <span className="font-medium text-foreground group-hover:text-primary transition-premium">{page.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-premium" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filters.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
                  {filters.map((f) => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-premium ${filter === f ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              )}

              {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 rounded-xl shimmer" />)}</div>
              ) : filtered.length > 0 ? (
                <div className="space-y-2">
                  {filtered.map((item, i) => (
                    <Link key={i} to={item.path} className="glass-card p-4 flex items-center justify-between group">
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-premium">{item.label}</p>
                        {item.subtitle && <p className="text-sm text-muted-foreground">{item.subtitle}</p>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground/60">{item.type}</span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-premium" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">No results for "{query}"</p>
              )}
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
}