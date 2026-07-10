import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function AboutPreview() {
  const { settings } = useSiteSettings();
  const secondary = settings?.secondary_stats || [];
  const quickFacts = settings?.quick_facts || [];
  const portrait = settings?.hero_image_url;

  const headline = settings?.hero_title || 'Driven by curiosity. Focused on impact.';
  const bio = settings?.description || "I'm a first-year Computer Science Co-op student at McMaster University with a habit of saying yes to too many things — and making them work anyway.";

  const headlineWords = headline.trim().split(/\s+/);
  const totalWords = headlineWords.length;
  const gradientStartIndex = Math.max(0, totalWords - 2);

  return (
    <section className="px-4 md:px-8 py-16 md:py-24 border-y border-border/50 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Editorial copy */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> About Me
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.08] mt-4 tracking-tight">
            {headlineWords.map((word, i) => (
              <span key={i}>
                {i >= gradientStartIndex ? <span className="text-gradient">{word}</span> : word}
                {i < totalWords - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-md leading-relaxed text-[15px]">{bio}</p>

          {/* Quick facts inline */}
          {quickFacts.length > 0 && (
            <div className="mt-6 space-y-2">
              {quickFacts.slice(0, 3).map((fact, i) => (
                <div key={i} className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-primary/70 uppercase tracking-wide w-24 shrink-0">{fact.label}</span>
                  <span className="text-sm text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
          )}

          <Link to="/about" className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full font-semibold text-sm glass text-foreground hover:border-primary/30 transition-premium group">
            More About Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Right: Portrait image with overlapping layered cards */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          {/* Soft gradient backdrop */}
          <div className="absolute inset-[-8%] rounded-[2rem] bg-gradient-soft opacity-60 blur-2xl" />

          {/* Portrait */}
          {portrait ? (
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-soft">
              <img src={portrait} alt={settings?.site_name || 'Portrait'} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="relative aspect-[4/5] rounded-3xl bg-gradient-soft border border-border flex items-center justify-center shadow-soft">
              <span className="font-display font-bold text-7xl text-gradient">{(settings?.site_name || 'JP').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}</span>
            </div>
          )}

          {/* Overlapping stat card — bottom left */}
          {secondary.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="absolute -bottom-6 -left-4 md:-left-8 glass-strong rounded-2xl p-4 md:p-5 shadow-card max-w-[200px]">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-gradient">{secondary[0]?.value}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{secondary[0]?.label}</p>
            </motion.div>
          )}

          {/* Overlapping stat card — top right */}
          {secondary.length > 1 && (
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} className="absolute -top-4 -right-2 md:-right-6 glass-strong rounded-2xl p-4 md:p-5 shadow-card max-w-[180px]">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-gradient">{secondary[1]?.value}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{secondary[1]?.label}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}