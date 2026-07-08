import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Moon, Sun, FileDown, Mail } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSiteSettings, useNavigation } from '@/hooks/useSiteSettings';
import { useTheme } from '@/lib/ThemeContext';

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const { main, explore } = useNavigation();
  const { toggleTheme, resolvedTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Global ⌘K listener
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) { onClose(); } else { /* open handled by parent */ }
      }
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Search across entities
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const [work, blog, photos, leadership, orgs, awards, ugc] = await Promise.all([
          base44.entities.Work.filter({ status: 'published' }, '-order', 5).catch(() => []),
          base44.entities.BlogPost.filter({ status: 'published' }, '-published_date', 5).catch(() => []),
          base44.entities.Photo.filter({ status: 'published' }, '-order', 5).catch(() => []),
          base44.entities.LeadershipRole.filter({ status: 'published' }, '-order', 5).catch(() => []),
          base44.entities.Organization.filter({ status: 'published' }, '-order', 5).catch(() => []),
          base44.entities.Award.filter({ status: 'published' }, '-order', 5).catch(() => []),
          base44.entities.Ugc.filter({ status: 'published' }, '-order', 5).catch(() => []),
        ]);
        const q = query.toLowerCase();
        const match = (text) => String(text || '').toLowerCase().includes(q);

        const allResults = [
          ...work.filter((w) => match(w.title) || match(w.tagline) || match(w.description) || (w.tags || []).some((t) => match(t)))
            .map((w) => ({ type: 'Work', label: w.title, subtitle: w.work_type?.replace(/_/g, ' '), path: `/work/${w.slug || w.id}` })),
          ...blog.filter((b) => match(b.title) || match(b.excerpt))
            .map((b) => ({ type: 'Blog', label: b.title, subtitle: 'Article', path: `/blog/${b.id}` })),
          ...photos.filter((p) => match(p.title) || match(p.category))
            .map((p) => ({ type: 'Photo', label: p.title || p.category, subtitle: p.category, path: '/photography' })),
          ...leadership.filter((l) => match(l.organization) || match(l.role_title))
            .map((l) => ({ type: 'Leadership', label: l.role_title, subtitle: l.organization, path: '/leadership' })),
          ...orgs.filter((o) => match(o.name))
            .map((o) => ({ type: 'Organization', label: o.name, subtitle: o.role, path: '/organizations' })),
          ...awards.filter((a) => match(a.title) || match(a.organization))
            .map((a) => ({ type: 'Award', label: a.title, subtitle: a.organization, path: '/awards' })),
          ...ugc.filter((u) => match(u.title) || match(u.brand) || match(u.campaign))
            .map((u) => ({ type: 'UGC', label: u.title, subtitle: u.brand || u.category, path: '/ugc' })),
        ];
        setResults(allResults.slice(0, 10));
      } catch (e) {
        setResults([]);
      }
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const pages = useMemo(() => [...main, ...explore], [main, explore]);

  const quickActions = useMemo(() => [
    { label: 'Toggle Theme', subtitle: resolvedTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark', icon: resolvedTheme === 'dark' ? Sun : Moon, action: toggleTheme },
    { label: 'Download Resume', subtitle: 'Get my PDF resume', icon: FileDown, action: () => settings?.resume_pdf_url && window.open(settings.resume_pdf_url, '_blank') },
    { label: 'Contact', subtitle: 'Get in touch', icon: Mail, path: '/contact' },
  ], [resolvedTheme, toggleTheme, settings]);

  const filteredPages = query.trim()
    ? pages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : pages;

  const handleSelect = (item) => {
    if (item.action) { item.action(); onClose(); return; }
    if (item.path) { navigate(item.path); onClose(); }
  };

  const allItems = [...filteredPages.map((p) => ({ type: 'Page', ...p })), ...results, ...quickActions.map((q) => ({ type: 'Action', ...q }))];
  const activeItem = allItems[activeIndex];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[12vh] px-4"
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl glass-strong rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, allItems.length - 1)); }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
                  if (e.key === 'Enter' && activeItem) { e.preventDefault(); handleSelect(activeItem); }
                }}
                placeholder="Search everything..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base focus:outline-none"
              />
              <kbd className="text-xs text-muted-foreground font-mono px-2 py-0.5 rounded bg-muted">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto scrollbar-thin">
              {loading && <div className="px-5 py-8 text-center text-sm text-muted-foreground">Searching...</div>}

              {!loading && !query.trim() && (
                <>
                  <Section label="Pages">
                    {filteredPages.map((page, i) => (
                      <PaletteItem key={page.path} item={{ type: 'Page', ...page }} index={i} activeIndex={activeIndex} onSelect={handleSelect} onHover={setActiveIndex} />
                    ))}
                  </Section>
                  <Section label="Quick Actions">
                    {quickActions.map((action, i) => {
                      const idx = filteredPages.length + i;
                      return <PaletteItem key={action.label} item={{ type: 'Action', ...action }} index={idx} activeIndex={activeIndex} onSelect={handleSelect} onHover={setActiveIndex} />;
                    })}
                  </Section>
                </>
              )}

              {!loading && query.trim() && allItems.length === 0 && (
                <div className="px-5 py-10 text-center text-sm text-muted-foreground">No results for "{query}"</div>
              )}

              {!loading && query.trim() && results.length > 0 && (
                <Section label="Results">
                  {results.map((item, i) => (
                    <PaletteItem key={i} item={item} index={i} activeIndex={activeIndex} onSelect={handleSelect} onHover={setActiveIndex} />
                  ))}
                </Section>
              )}
              {!loading && query.trim() && filteredPages.length > 0 && (
                <Section label="Pages">
                  {filteredPages.map((page, i) => {
                    const idx = results.length + i;
                    return <PaletteItem key={page.path} item={{ type: 'Page', ...page }} index={idx} activeIndex={activeIndex} onSelect={handleSelect} onHover={setActiveIndex} />;
                  })}
                </Section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ label, children }) {
  return (
    <div className="py-2">
      <p className="px-5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function PaletteItem({ item, index, activeIndex, onSelect, onHover }) {
  const active = index === activeIndex;
  return (
    <button
      onClick={() => onSelect(item)}
      onMouseEnter={() => onHover(index)}
      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-premium ${active ? 'bg-primary/10' : ''}`}
    >
      {item.icon ? <item.icon className="w-4 h-4 text-muted-foreground" /> : <ArrowRight className="w-4 h-4 text-muted-foreground" />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
        {item.subtitle && <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>}
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">{item.type}</span>
    </button>
  );
}