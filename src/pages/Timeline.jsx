import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ExternalLink, Image as ImageIcon,
  GraduationCap, Briefcase, Users, Rocket, Award, Sparkles, HeartHandshake, CalendarDays,
} from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';
import { timelineEvents } from '@/data/timelineEvents';

const categoryConfig = {
  career: { color: 'bg-violet-500/15 text-violet-400', dot: 'border-violet-500', hex: '#8b5cf6', label: 'Career', Icon: Briefcase },
  education: { color: 'bg-blue-500/15 text-blue-400', dot: 'border-blue-500', hex: '#3b82f6', label: 'Education', Icon: GraduationCap },
  award: { color: 'bg-amber-500/15 text-amber-400', dot: 'border-amber-500', hex: '#f59e0b', label: 'Award', Icon: Award },
  certification: { color: 'bg-cyan-500/15 text-cyan-400', dot: 'border-cyan-500', hex: '#06b6d4', label: 'Certification', Icon: Award },
  project: { color: 'bg-emerald-500/15 text-emerald-400', dot: 'border-emerald-500', hex: '#10b981', label: 'Project', Icon: Rocket },
  event: { color: 'bg-pink-500/15 text-pink-400', dot: 'border-pink-500', hex: '#ec4899', label: 'Event', Icon: CalendarDays },
  milestone: { color: 'bg-fuchsia-500/15 text-fuchsia-400', dot: 'border-fuchsia-500', hex: '#d946ef', label: 'Milestone', Icon: Sparkles },
  volunteer: { color: 'bg-rose-500/15 text-rose-400', dot: 'border-rose-500', hex: '#f43f5e', label: 'Volunteer', Icon: HeartHandshake },
  leadership: { color: 'bg-indigo-500/15 text-indigo-400', dot: 'border-indigo-500', hex: '#6366f1', label: 'Leadership', Icon: Users },
};

/** Waypoints for the winding "pipe" rail — wide alternating swing for a loopy, rounded turn. */
function railPoints(n) {
  return Array.from({ length: n }, (_, i) => ({ x: i % 2 === 0 ? 20 : 80, y: i * 100 }));
}

/** One smooth bezier segment per pair of consecutive nodes, so each can carry its own gradient. */
function buildRailSegments(n) {
  if (n < 2) return [];
  const pts = railPoints(n);
  const segments = [];
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const midY = (p0.y + p1.y) / 2;
    segments.push({ id: `seg-${i}`, d: `M ${p0.x} ${p0.y} C ${p0.x} ${midY} ${p1.x} ${midY} ${p1.x} ${p1.y}` });
  }
  return segments;
}

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
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 w-full max-w-md rounded-full mt-6 origin-left"
            style={{ background: 'linear-gradient(90deg, #f59e0b, #ec4899, #d946ef, #8b5cf6, #6366f1, #3b82f6, #06b6d4, #10b981)' }}
          />
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

      {/* Timeline rail */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          {filtered.length > 0 ? (
            <div className="relative">
              {/* mobile rail — unchanged straight line */}
              <div className="absolute left-[15px] lg:hidden top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />

              {/* desktop rail — thick winding gradient "pipe" that shifts color milestone to milestone */}
              <svg
                className="hidden lg:block absolute inset-0 w-full h-full overflow-visible"
                viewBox={`0 0 100 ${Math.max(1, filtered.length - 1) * 100}`}
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  {buildRailSegments(filtered.length).map((seg, i) => {
                    const fromHex = (categoryConfig[filtered[i]?.category] || categoryConfig.milestone).hex;
                    const toHex = (categoryConfig[filtered[i + 1]?.category] || categoryConfig.milestone).hex;
                    return (
                      <linearGradient key={seg.id} id={`rail-${seg.id}`} gradientUnits="userSpaceOnUse" x1="0" y1={i * 100} x2="0" y2={(i + 1) * 100}>
                        <stop offset="0%" stopColor={fromHex} />
                        <stop offset="100%" stopColor={toHex} />
                      </linearGradient>
                    );
                  })}
                </defs>
                {buildRailSegments(filtered.length).map((seg) => (
                  <path key={seg.id} d={seg.d} stroke={`url(#rail-${seg.id})`} strokeWidth="22" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>

              <div className="space-y-10 lg:space-y-20">
                {filtered.map((event, i) => {
                  const cat = categoryConfig[event.category] || categoryConfig.milestone;
                  const Icon = cat.Icon;
                  const isHighlighted = event.id === highlightId;
                  const isRight = i % 2 === 1;
                  const railX = isRight ? '80%' : '20%';

                  return (
                    <motion.div
                      key={event.id}
                      ref={isHighlighted ? highlightRef : null}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative pl-10 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-x-10 ${isRight ? '' : ''}`}
                    >
                      {/* node — small dot on mobile, large solid badge sitting on the pipe on desktop */}
                      <div
                        style={{ '--rail-x': railX }}
                        className={`absolute z-10 left-0 lg:left-[var(--rail-x)] top-1 lg:top-1/2 w-8 h-8 lg:w-14 lg:h-14 -translate-x-[calc(50%-15px)] lg:-translate-x-1/2 lg:-translate-y-1/2 rounded-full bg-background border-2 lg:border-4 lg:border-background ${cat.dot} flex items-center justify-center shadow-[0_0_0_5px_hsl(var(--primary)/0.08)] lg:shadow-lg ${event.is_milestone ? 'shadow-glow' : ''}`}
                      >
                        <span className="hidden lg:block absolute inset-0 rounded-full" style={{ backgroundColor: cat.hex }} />
                        <Icon className="relative w-3.5 h-3.5 lg:w-6 lg:h-6 text-foreground/80 lg:text-white" strokeWidth={2} />
                      </div>

                      {/* card — alternates sides on desktop, always full-width on mobile */}
                      <div className={`${isRight ? 'lg:col-start-2 lg:pl-14' : 'lg:col-start-1 lg:pr-14 lg:flex lg:justify-end lg:text-right'}`}>
                        <div
                          className={`glass-card p-5 md:p-6 inline-block w-full lg:max-w-md transition-premium ${isHighlighted ? 'border-primary ring-2 ring-primary/30' : ''}`}
                        >
                          <div className={`flex items-center gap-2.5 mb-2.5 flex-wrap ${isRight ? '' : 'lg:justify-end'}`}>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                            <time className="text-xs font-mono text-muted-foreground">{formatDate(event)}</time>
                          </div>
                          <h3 className="font-display font-semibold text-lg text-foreground leading-snug">{event.title}</h3>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{event.description}</p>
                          )}

                          {event.image_url ? (
                            <div className="mt-4 rounded-xl overflow-hidden border border-border">
                              <img src={event.image_url} alt={event.title} className="w-full max-h-56 object-cover" loading="lazy" />
                            </div>
                          ) : (
                            <div className={`mt-4 rounded-xl border border-dashed border-primary/20 bg-surface/50 flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground/70 ${isRight ? '' : 'lg:justify-end'}`}>
                              <ImageIcon className="w-3.5 h-3.5" /> Photo coming soon
                            </div>
                          )}

                          {event.related_path && (
                            <Link to={event.related_path} className={`inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-4 transition-premium ${isRight ? '' : 'lg:flex-row-reverse'}`}>
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
