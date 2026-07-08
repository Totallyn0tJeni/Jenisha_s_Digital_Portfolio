import { motion } from 'framer-motion';
import { Code2, Megaphone, Users, Camera, Brain, Heart, Sparkles, Rocket } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const iconMap = { Code2, Megaphone, Users, Camera, Brain, Heart, Sparkles, Rocket };

export default function CardsSection({ config = {}, section }) {
  const items = config.items || [];

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {section?.title && <SectionHeading title={section.title} />}
        {items.length > 0 ? (
          <div className={`grid gap-5 ${items.length <= 4 ? 'sm:grid-cols-2 lg:grid-cols-' + items.length : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
            {items.map((item, i) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground mx-auto mb-4">
                  <Sparkles className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="h-4 w-24 bg-muted rounded mx-auto mb-2" />
                <div className="h-3 w-full bg-muted/50 rounded" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}