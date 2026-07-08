import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function StatsRow() {
  const { settings } = useSiteSettings();
  const stats = settings?.stats || [];
  if (stats.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card p-5 text-center"
          >
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.value}</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}