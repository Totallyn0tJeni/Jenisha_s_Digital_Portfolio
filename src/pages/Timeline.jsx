import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ExternalLink,
  GraduationCap, Briefcase, Users, Rocket, Award, Sparkles, HeartHandshake, CalendarDays,
} from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';
import { timelineEvents } from '@/data/timelineEvents';

const categoryConfig = {
  career: { badge: 'bg-violet-500', pill: 'bg-violet-500/15 text-violet-400', label: 'Career', Icon: Briefcase },
  education: { badge: 'bg-blue-500', pill: 'bg-blue-500/15 text-blue-400', label: 'Education', Icon: GraduationCap },
  award: { badge: 'bg-amber-500', pill: 'bg-amber-500/15 text-amber-400', label: 'Award', Icon: Award },
  certification: { badge: 'bg-cyan-500', pill: 'bg-cyan-500/15 text-cyan-400', label: 'Certification', Icon: Award },
  project: { badge: 'bg-emerald-500', pill: 'bg-emerald-500/15 text-emerald-400', label: 'Project', Icon: Rocket },
  event: { badge: 'bg-pink-500', pill: 'bg-pink-500/15 text-pink-400', label: 'Event', Icon: CalendarDays },
  milestone: { badge: 'bg-fuchsia-500', pill: 'bg-fuchsia-500/15 text-fuchsia-400', label: 'Milestone', Icon: Sparkles },
  volunteer: { badge: 'bg-rose-500', pill: 'bg-rose-500/15 text-rose-400', label: 'Volunteer', Icon: HeartHandshake },
  leadership: { badge: 'bg-indigo-500', pill: 'bg-indigo-500/15 text-indigo-400', label: 'Leadership', Icon: Users },
};

export default function Timeline() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const [filter, setFilter] = useState('all');
  const highlightRef = useRef(null);

  // Chronological, oldest first — this is a growth story, read top to bottom.
  const sorted = [...timelineEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
  const availableCategories = [...new Set(sorted.map((e) => e.category))].filter(Boolean);
  const filtered = filter === 'all' ? sorted : sorted.filter((e) => e.category === filter);

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      const timer = setTimeout(() => highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      return () => clearTimeout(timer);
    }
  }, [highlightId, filter]);

  const formatDate = (event) => {
    if (event.date_display) return event.date_display;
    return event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
  };

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
            A handful of turning points — not a full activity log — tracing the path from student to STEM involvement, leadership, technical growth, and what's ahead.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      {sorted.length > 0 && (
        <div className="px-4 md:px-8 pb-10">
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
            <div className="relative">
              {/* single straight line — left-aligned on mobile, centered on desktop. Simple, always correct. */}
              <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-1/2" />

              <div className="space-y-8">
                {filtered.map((event, i) => {
                  const cat = categoryConfig[event.category] || categoryConfig.milestone;
                  const Icon = cat.Icon;
                  const isHighlighted = event.id === highlightId;
                  const isRight = i % 2 === 1;

                  return (
                    <motion.div
                      key={event.id}
                      ref={isHighlighted ? highlightRef : null}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.4 }}
                      className="relative lg:grid lg:grid-cols-[1fr_3rem_1fr] lg:gap-x-6"
                    >
                      {/* badge — a normal grid/flex item, never absolutely positioned, so it can never sit on top of text */}
                      <div className="absolute left-5 lg:static lg:col-start-2 -translate-x-1/2 lg:translate-x-0 flex justify-center">
                        <div className={`w-9 h-9 rounded-full ${cat.badge} flex items-center justify-center ring-4 ring-background shadow-md shrink-0`}>
                          <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                        </div>
                      </div>

                      {/* left column content — used on desktop when this item is on the left; empty otherwise */}
                      <div className="hidden lg:block lg:col-start-1 lg:row-start-1 lg:text-right">
                        {!isRight && (
                          <div className={`glass-card p-5 inline-block text-left w-full max-w-md ${isHighlighted ? 'border-primary ring-2 ring-primary/30' : ''}`}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${cat.pill}`}>{cat.label}</span>
                              <time className="text-xs font-mono text-muted-foreground">{formatDate(event)}</time>
                            </div>
                            <h3 className="font-display font-semibold text-base text-foreground leading-snug">{event.title}</h3>
                            {event.description && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{event.description}</p>}
                            {event.related_path && (
                              <Link to={event.related_path} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-2 transition-premium">
                                <ExternalLink className="w-3 h-3" /> View related {event.related_entity_type}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>

                      {/* right column content — used on desktop when this item is on the right */}
                      <div className="hidden lg:block lg:col-start-3 lg:row-start-1">
                        {isRight && (
                          <div className={`glass-card p-5 inline-block w-full max-w-md ${isHighlighted ? 'border-primary ring-2 ring-primary/30' : ''}`}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${cat.pill}`}>{cat.label}</span>
                              <time className="text-xs font-mono text-muted-foreground">{formatDate(event)}</time>
                            </div>
                            <h3 className="font-display font-semibold text-base text-foreground leading-snug">{event.title}</h3>
                            {event.description && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{event.description}</p>}
                            {event.related_path && (
                              <Link to={event.related_path} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-2 transition-premium">
                                <ExternalLink className="w-3 h-3" /> View related {event.related_entity_type}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>

                      {/* mobile — single column, always to the right of the badge, no grid needed */}
                      <div className="lg:hidden pl-14">
                        <div className={`glass-card p-5 ${isHighlighted ? 'border-primary ring-2 ring-primary/30' : ''}`}>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${cat.pill}`}>{cat.label}</span>
                            <time className="text-xs font-mono text-muted-foreground">{formatDate(event)}</time>
                          </div>
                          <h3 className="font-display font-semibold text-base text-foreground leading-snug">{event.title}</h3>
                          {event.description && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{event.description}</p>}
                          {event.related_path && (
                            <Link to={event.related_path} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-2 transition-premium">
                              <ExternalLink className="w-3 h-3" /> View related {event.related_entity_type}
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <EmptyState title="Your timeline will appear here" description="Flag records with timeline_featured: true (or add a hand-authored entry in src/data/timeline/items/) to see them here." />
          )}
        </div>
      </section>

      <ContinueExploring />
    </motion.div>
  );
}
