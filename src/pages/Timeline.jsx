import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Image as ImageIcon } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';

const categoryConfig = {
  career: { color: 'bg-violet-500/15 text-violet-400', dot: 'border-violet-500', label: 'Career' },
  education: { color: 'bg-blue-500/15 text-blue-400', dot: 'border-blue-500', label: 'Education' },
  award: { color: 'bg-amber-500/15 text-amber-400', dot: 'border-amber-500', label: 'Award' },
  project: { color: 'bg-emerald-500/15 text-emerald-400', dot: 'border-emerald-500', label: 'Project' },
  event: { color: 'bg-pink-500/15 text-pink-400', dot: 'border-pink-500', label: 'Event' },
  milestone: { color: 'bg-fuchsia-500/15 text-fuchsia-400', dot: 'border-fuchsia-500', label: 'Milestone' },
  volunteer: { color: 'bg-rose-500/15 text-rose-400', dot: 'border-rose-500', label: 'Volunteer' },
  leadership: { color: 'bg-indigo-500/15 text-indigo-400', dot: 'border-indigo-500', label: 'Leadership' },
};

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.TimelineEvent.filter({ status: 'published' }, '-date', 200);
        setEvents(data);
      } catch (e) { setEvents([]); }
      setLoading(false);
    })();
  }, []);

  // Sort chronologically (newest first)
  const sorted = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get unique categories that exist in the data
  const availableCategories = [...new Set(sorted.map((e) => e.category))].filter(Boolean);
  const filtered = filter === 'all' ? sorted : sorted.filter((e) => e.category === filter);

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Page Hero */}
      <section className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> My Journey
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mt-4">
            The story so <span className="text-gradient">far</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">
            From elementary school through university — key moments, milestones, and turning points in chronological order.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      {sorted.length > 0 && (
        <div className="px-4 md:px-8 pb-6">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-premium ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
              All
            </button>
            {availableCategories.map((cat) => {
              const config = categoryConfig[cat] || categoryConfig.milestone;
              return (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-premium ${filter === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-28 rounded-2xl shimmer" />)}</div>
          ) : filtered.length > 0 ? (
            <div className="relative pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
              <div className="space-y-8">
                {filtered.map((event, i) => {
                  const cat = categoryConfig[event.category] || categoryConfig.milestone;
                  return (
                    <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.04, duration: 0.5 }} className="relative">
                      <div className={`absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 ${cat.dot} shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]`} />
                      {event.is_milestone && (
                        <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-amber-400 shadow-[0_0_0_4px_hsl(38_92%_50%/0.15)] animate-pulse" />
                      )}
                      <div className="glass-card p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                          <time className="text-xs font-mono text-muted-foreground">{formatDate(event.date)}</time>
                          {event.is_milestone && <span className="flex items-center gap-1 text-xs text-amber-400"><Star className="w-3 h-3 fill-amber-400" /> Milestone</span>}
                        </div>
                        <h3 className="font-display font-semibold text-lg text-foreground">{event.title}</h3>
                        {event.description && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{event.description}</p>}

                        {event.image_url && (
                          <div className="mt-4 rounded-xl overflow-hidden border border-border">
                            <img src={event.image_url} alt={event.title} className="w-full max-h-64 object-cover" loading="lazy" />
                          </div>
                        )}

                        {event.related_entity_type && event.related_entity_id && (
                          <Link to={`/${event.related_entity_type.toLowerCase()}/${event.related_entity_id}`} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-4 transition-premium">
                            <ExternalLink className="w-3 h-3" /> View related {event.related_entity_type}
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <EmptyState title="Your timeline will appear here" description="Add timeline events from the admin dashboard to tell your story chronologically." />
          )}
        </div>
      </section>

      <ContinueExploring />
    </motion.div>
  );
}