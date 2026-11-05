import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { certifications } from '@/data/certifications';

export default function StatsRow() {
  const { settings } = useSiteSettings();
  // The certification count comes from the data so it can never drift from the Certifications page.
  const stats = (settings?.stats || []).map((s) =>
    s.label === 'Certifications' ? { ...s, value: String(certifications.length) } : s
  );
  if (stats.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:justify-between gap-4">
        {stats.map((stat, i) => {
          const body = (
            <>
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient leading-none">{stat.value}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-3">{stat.label}</p>
            </>
          );
          const cls = 'glass-card p-6 md:p-7 text-center lg:flex-1 lg:min-w-0 block';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="lg:flex-1 lg:min-w-0"
            >
              {stat.link ? (
                <Link to={stat.link} className={`${cls} hover:border-primary/40 hover:-translate-y-0.5 transition-premium`}>{body}</Link>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
