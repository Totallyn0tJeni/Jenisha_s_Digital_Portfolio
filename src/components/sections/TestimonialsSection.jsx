import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeading from '../SectionHeading';

export default function TestimonialsSection({ config = {}, section }) {
  const [testimonials, setTestimonials] = useState([]);
  const count = config.count || 3;

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Testimonial.filter({ status: 'published' }, 'order', count);
        setTestimonials(data);
      } catch (e) { setTestimonials([]); }
    })();
  }, [count]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {section?.title && <SectionHeading title={section.title} />}
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className={idx < (t.rating || 5) ? 'text-amber-400' : 'text-muted-foreground/30'}>★</span>
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-5 italic">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  {t.avatar_url ? (
                    <img src={t.avatar_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">
                      {t.author_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author_name}</p>
                    {t.author_role && <p className="text-xs text-muted-foreground">{t.author_role}{t.author_organization ? ` · ${t.author_organization}` : ''}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground/50 italic">Testimonials will appear here once added.</p>
          </div>
        )}
      </div>
    </section>
  );
}