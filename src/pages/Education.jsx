import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { education as educationData } from '@/data/education';
import { getTimelineEventById } from '@/data/timelineEvents';

export default function Education() {
  const items = [...educationData].sort((a, b) => a.order - b.order);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Learning" title="Education" subtitle="Academic background and coursework." />
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    {item.logo_url ? <img src={item.logo_url} alt={item.institution} className="w-14 h-14 rounded-xl object-cover" /> : <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xl">🎓</div>}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground">{item.institution}</h3>
                          <p className="text-sm text-primary">{item.degree}{item.field_of_study ? ` · ${item.field_of_study}` : ''}</p>
                        </div>
                        {item.is_current && <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500">Current</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} — {item.is_current ? 'Present' : item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                      </p>
                      {item.gpa && <p className="text-xs text-muted-foreground mt-1">GPA: {item.gpa}</p>}
                      {item.description && <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{item.description}</p>}
                      {item.achievements && item.achievements.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {item.achievements.map((a, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><span className="text-primary">•</span> {a}</li>)}
                        </ul>
                      )}
                      {item.courses && item.courses.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.courses.map((c, idx) => <span key={idx} className="skill-tag">{c}</span>)}
                        </div>
                      )}
                      {(() => {
                        const timelineId = `edu-${item.id}-start`;
                        return getTimelineEventById(timelineId) ? (
                          <Link to={`/timeline?highlight=${timelineId}`} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-premium mt-3">
                            <Calendar className="w-3 h-3" /> View in Timeline
                          </Link>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your education" description="Your education history will appear here once added." />
          )}
        </div>
      </section>
    </motion.div>
  );
}