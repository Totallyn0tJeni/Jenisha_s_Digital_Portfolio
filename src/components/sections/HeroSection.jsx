import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImagePlaceholder from '../ImagePlaceholder';

export default function HeroSection({ config = {}, page }) {
  const hero = page?.hero_section || config;
  const title = hero?.title || config.title || 'Welcome';
  const subtitle = hero?.subtitle || config.subtitle;
  const image = hero?.image || config.image;
  const ctaPrimary = hero?.cta_primary || config.cta_primary;
  const ctaSecondary = hero?.cta_secondary || config.cta_secondary;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 md:px-8 py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl md:text-7xl text-foreground leading-[1.05] tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {ctaPrimary && (
              <Link
                to={ctaPrimary.link || '/work'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium group"
              >
                {ctaPrimary.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            {ctaSecondary && (
              <Link
                to={ctaSecondary.link || '/contact'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass text-foreground hover:border-primary/30 transition-premium"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}