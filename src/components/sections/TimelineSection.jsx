import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeading from '../SectionHeading';

const categoryConfig = {
  career: { color: 'bg-violet-500/15 text-violet-400', label: 'Career' },
  education: { color: 'bg-blue-500/15 text-blue-400', label: 'Education' },
  award: { color: 'bg-amber-500/15 text-amber-400', label: 'Award' },
  project: { color: 'bg-emerald-500/15 text-emerald-400', label: 'Project' },
  event: { color: 'bg-pink-500/15 text-pink-400', label: 'Event' },
  milestone: { color: 'bg-fuchsia-500/15 text-fuchsia-400', label: 'Milestone' },
  volunteer: { color: 'bg-rose-500/15 text-rose-400', label: 'Volunteer' },
  leadership: { color: 'bg-indigo-500/15 text-indigo-400', label: 'Leadership' },
};

export default function TimelineSection({ config = {}, section }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const count = config.count || 10;

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.TimelineEvent.filter({ status: 'published' }, '-date', count);
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(sorted);
      } catch (e) { setEvents([]); }
      setLoading(false);
    })();
  }, [count]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {section?.title && <SectionHeading title={section.title} />}
        {events.length > 0 ? (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {events.map((event, i) => {
                const cat = categoryConfig[event.category] || categoryConfig.milestone;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative pl-12"
                  >
                    <div className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full ${cat.color} ring-4 ring-background`} />
                    <div className="glass-card p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                        <time className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </time>
                        {event.is_milestone && <span className="text-xs text-primary">★ Milestone</span>}
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground">{event.title}</h3>
                      {event.description && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{event.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground/50 italic py-12">Timeline events will appear here once added.</p>
        )}
      </div>
    </section>
  );
}