import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';

export default function CTASection({ config = {}, section }) {
  const title = config.title || section?.title || "Let's build something meaningful together.";
  const subtitle = config.subtitle || "I'm always open to new opportunities, collaborations, and conversations.";
  const buttonLabel = config.button_label || 'Get in Touch';
  const buttonLink = config.button_link || '/contact';

  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto glass-card p-10 md:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-soft opacity-50" />
        <div className="relative z-10">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-5 leading-tight">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">{subtitle}</p>
          <Link
            to={buttonLink}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium group"
          >
            {buttonLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}