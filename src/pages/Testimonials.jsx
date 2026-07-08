import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Testimonial.filter({ status: 'published' }, 'order', 100);
        setItems(data);
      } catch (e) { setItems([]); }
      setLoading(false);
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Kind Words" title="Testimonials" subtitle="What people say about working with me." />
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-5">{[...Array(4)].map((_, i) => <div key={i} className="h-44 rounded-2xl shimmer" />)}</div>
          ) : items.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-5">
              {items.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, idx) => <span key={idx} className={idx < (t.rating || 5) ? 'text-amber-400' : 'text-muted-foreground/30'}>★</span>)}
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-5 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    {t.avatar_url ? <img src={t.avatar_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">{t.author_name?.[0]}</div>}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.author_name}</p>
                      <p className="text-xs text-muted-foreground">{[t.author_role, t.author_organization].filter(Boolean).join(' · ')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first testimonial" description="Testimonials will appear here once added." />
          )}
        </div>
      </section>
    </motion.div>
  );
}