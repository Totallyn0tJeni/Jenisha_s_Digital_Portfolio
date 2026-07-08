import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Award.filter({ status: 'published' }, 'order', 100);
        setAwards(data);
      } catch (e) { setAwards([]); }
      setLoading(false);
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Recognition" title="Awards" subtitle="Achievements and honors earned along the way." />
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-2xl shimmer" />)}</div>
          ) : awards.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {awards.map((award, i) => (
                <motion.div key={award.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xl">🏆</div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{award.title}</h3>
                      <p className="text-sm text-primary">{award.organization}</p>
                      {award.date && <p className="text-xs text-muted-foreground mt-1">{new Date(award.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>}
                      {award.description && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{award.description}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Your awards will appear here" description="Add awards and recognitions from the admin dashboard." />
          )}
        </div>
      </section>
    </motion.div>
  );
}