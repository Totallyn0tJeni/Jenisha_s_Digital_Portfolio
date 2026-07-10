import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ExternalLink, Star, Image as ImageIcon, ChevronDown } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';
import { timelineEvents } from '@/data/timelineEvents';

const categoryConfig = {
  career: { color: 'bg-violet-500/15 text-violet-400', dot: 'border-violet-500', label: 'Career' },
  education: { color: 'bg-blue-500/15 text-blue-400', dot: 'border-blue-500', label: 'Education' },
  award: { color: 'bg-amber-500/15 text-amber-400', dot: 'border-amber-500', label: 'Award' },
  certification: { color: 'bg-cyan-500/15 text-cyan-400', dot: 'border-cyan-500', label: 'Certification' },
  project: { color: 'bg-emerald-500/15 text-emerald-400', dot: 'border-emerald-500', label: 'Project' },
  event: { color: 'bg-pink-500/15 text-pink-400', dot: 'border-pink-500', label: 'Event' },
  milestone: { color: 'bg-fuchsia-500/15 text-fuchsia-400', dot: 'border-fuchsia-500', label: 'Milestone' },
  volunteer: { color: 'bg-rose-500/15 text-rose-400', dot: 'border-rose-500', label: 'Volunteer' },
  leadership: { color: 'bg-indigo-500/15 text-indigo-400', dot: 'border-indigo-500', label: 'Leadership' },
};

export default function Timeline() {
  const events = timelineEvents;
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const [filter, setFilter] = useState('all');
  const highlightRef = useRef(null);

  // Sort chronologically (newest first)
  const sorted = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get unique categories that exist in the data
  const availableCategories = [...new Set(sorted.map((e) => e.category))].filter(Boolean);
  const filtered = filter === 'all' ? sorted : sorted.filter((e) => e.category === filter);

  // Group by year — most recent year open by default, or the highlighted event's year if deep-linked
  const byYear = filtered.reduce((acc, e) => {
    const year = e.date ? new Date(e.date).getFullYear() : 'Undated';
    (acc[year] ||= []).push(e);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => b - a);
  const highlightYear = highlightId ? String(new Date(events.find((e) => e.id === highlightId)?.date || '').getFullYear()) : null;
  const [openYears, setOpenYears] = useState(() => new Set(highlightYear ? [highlightYear] : years.slice(0, 1)));
  useEffect(() => { setOpenYears(new Set(highlightYear ? [highlightYear] : years.slice(0, 1))); }, [filter]);

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      const timer = setTimeout(() => highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      return () => clearTimeout(timer);
    }
  }, [highlightId, openYears]);

  const toggleYear = (year) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

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
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {years.map((year) => {
                const isOpen = openYears.has(year);
                const yearEvents = byYear[year];
                return (
                  <div key={year} className="glass-card overflow-hidden">
                    <button onClick={() => toggleYear(year)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-primary/5 transition-premium">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-xl text-foreground">{year}</span>
                        <span className="text-xs font-mono text-muted-foreground px-2.5 py-0.5 rounded-full bg-surface border border-border">{yearEvents.length} event{yearEvents.length > 1 ? 's' : ''}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="relative pl-8 pr-5 pb-6">
                        <div className="absolute left-6 top-0 bottom-6 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
                        <div className="space-y-6">
                          {yearEvents.map((event, i) => {
                            const cat = categoryConfig[event.category] || categoryConfig.milestone;
                            const isHighlighted = event.id === highlightId;
                            return (
                              <motion.div
                                key={event.id}
                                ref={isHighlighted ? highlightRef : null}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.4 }}
                                className="relative"
                              >
                                <div className={`absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 ${cat.dot} shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]`} />
                                {event.is_milestone && (
                                  <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-amber-400 shadow-[0_0_0_4px_hsl(38_92%_50%/0.15)] animate-pulse" />
                                )}
                                <div className={`bg-surface/60 rounded-xl p-4 md:p-5 border transition-premium ${isHighlighted ? 'border-primary ring-2 ring-primary/30' : 'border-border/60'}`}>
                                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                                    <time className="text-xs font-mono text-muted-foreground">{formatDate(event.date)}</time>
                                    {event.is_milestone && <span className="flex items-center gap-1 text-xs text-amber-400"><Star className="w-3 h-3 fill-amber-400" /> Milestone</span>}
                                  </div>
                                  <h3 className="font-display font-semibold text-base text-foreground">{event.title}</h3>
                                  {event.description && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{event.description}</p>}

                                  {event.image_url ? (
                                    <div className="mt-3 rounded-xl overflow-hidden border border-border">
                                      <img src={event.image_url} alt={event.title} className="w-full max-h-64 object-cover" loading="lazy" />
                                    </div>
                                  ) : (
                                    <div className="mt-3 rounded-xl border border-dashed border-primary/20 bg-surface/50 flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground/70">
                                      <ImageIcon className="w-3.5 h-3.5" /> Photo coming soon
                                    </div>
                                  )}

                                  {event.related_path && (
                                    <Link to={event.related_path} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-3 transition-premium">
                                      <ExternalLink className="w-3 h-3" /> View related {event.related_entity_type}
                                    </Link>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState title="Your timeline will appear here" description="Populated automatically from education, experience, leadership, awards, certifications, and featured work — add dates to those entries to see them here." />
          )}
        </div>
      </section>

      <ContinueExploring />
    </motion.div>
  );
}