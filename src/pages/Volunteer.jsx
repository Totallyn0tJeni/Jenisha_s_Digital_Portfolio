import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { volunteerWork as volunteerData } from '@/data/volunteerWork';

export default function Volunteer() {
  const items = [...volunteerData].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Giving Back" title="Volunteer Work" subtitle="Causes and communities I care about." />
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground">{item.role || item.organization}</h3>
                      <p className="text-sm text-primary">{item.role ? item.organization : ''}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.is_current && <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500">Current</span>}
                      {item.hours && <span className="text-xs text-muted-foreground">{item.hours} hours</span>}
                    </div>
                  </div>
                  {item.description && <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{item.description}</p>}
                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {item.achievements.map((a, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><span className="text-primary">•</span> {a}</li>)}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first volunteer role" description="Add entries to src/data/volunteerWork.js." />
          )}
        </div>
      </section>
    </motion.div>
  );
}