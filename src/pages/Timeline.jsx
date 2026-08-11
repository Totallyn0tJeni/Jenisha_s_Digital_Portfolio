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

/** Waypoints for the winding "pipe" rail — wide loop like the reference, no card box to avoid. */
function railPoints(n) {
  return Array.from({ length: n }, (_, i) => ({ x: i % 2 === 0 ? 18 : 82, y: i * 100 }));
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

  const badgeLabel = (event) => (event.date ? new Date(event.date).getFullYear() : '');

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
                  <path key={seg.id} d={seg.d} stroke={`url(#rail-${seg.id})`} strokeWidth="26" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>

              <div className="space-y-14 lg:space-y-24">
                {filtered.map((event, i) => {
                  const cat = categoryConfig[event.category] || categoryConfig.milestone;
                  const Icon = cat.Icon;
                  const isHighlighted = event.id === highlightId;
                  const isRight = i % 2 === 1;
                  const railX = isRight ? '82%' : '18%';

                  return (
                    <motion.div
                      key={event.id}
                      ref={isHighlighted ? highlightRef : null}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative pl-14 lg:pl-0"
                    >
                      {/* badge — small dot + year on mobile, large badge with year sitting on the pipe on desktop */}
                      <div
                        style={{ '--rail-x': railX }}
                        className={`absolute z-10 left-0 lg:left-[var(--rail-x)] top-0 w-11 h-11 lg:w-16 lg:h-16 -translate-x-1/2 lg:-translate-x-1/2 rounded-full border-4 border-background flex items-center justify-center shadow-lg ${isHighlighted ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''}`}
                      >
                        <span className="absolute inset-0 rounded-full" style={{ backgroundColor: cat.hex }} />
                        <span className="relative text-[10px] lg:text-xs font-bold text-white font-mono">{badgeLabel(event)}</span>
                      </div>

                      {/* text — plain, no card box, positioned beside the badge and toward center on desktop */}
                      <div
                        style={{ '--text-ml': isRight ? '0px' : 'calc(18% + 2.5rem)', '--text-mr': isRight ? 'calc(18% + 2.5rem)' : '0px', '--text-maxw': 'calc(82% - 5rem)' }}
                        className={`lg:max-w-[var(--text-maxw)] ${isRight ? 'lg:ml-auto lg:mr-[var(--text-mr)] lg:text-right' : 'lg:ml-[var(--text-ml)] lg:text-left'}`}
                      >
                        <div className={`flex items-center gap-2 mb-1.5 ${isRight ? '' : 'lg:justify-end'}`}>
                          <Icon className="w-4 h-4" style={{ color: cat.hex }} strokeWidth={1.75} />
                          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wide">{formatDate(event)}</span>
                        </div>
                        <h3 className="font-display font-bold text-lg leading-snug" style={{ color: cat.hex }}>{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{event.description}</p>
                        )}
                        {event.related_path && (
                          <Link to={event.related_path} className={`inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-2 transition-premium ${isRight ? '' : 'lg:flex-row-reverse'}`}>
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
            <EmptyState title="Your timeline will appear here" description="Flag records with timeline_featured: true (or add a hand-authored entry in src/data/timeline/items/) to see them here." />
          )}
        </div>
      </section>

      <ContinueExploring />
    </motion.div>
  );
}
