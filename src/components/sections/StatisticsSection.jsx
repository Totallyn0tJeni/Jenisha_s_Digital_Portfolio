import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function StatisticsSection({ config = {}, section }) {
  const { settings } = useSiteSettings();
  const stats = config.items || settings?.stats || [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {section?.title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-12"
          >
            {section.title}
          </motion.h2>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.length > 0 ? stats.map((stat, i) => (
            <Counter key={i} stat={stat} inView={inView} delay={i * 0.1} />
          )) : (
            [...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-display font-bold text-muted-foreground/30">—</div>
                <p className="text-sm text-muted-foreground/50 mt-1">Add stats in CMS</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Counter({ stat, inView, delay }) {
  const [value, setValue] = useState(0);
  const target = parseInt(String(stat.value).replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = String(stat.value).replace(/[0-9]/g, '') || '';

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient">{value}{suffix}</div>
      <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
    </motion.div>
  );
}