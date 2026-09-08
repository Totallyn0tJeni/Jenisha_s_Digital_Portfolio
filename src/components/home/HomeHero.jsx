import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Camera, Users, TrendingUp } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import SocialIcons from '@/components/SocialIcons';
import ResumeDownload from '@/components/ResumeDownload';
import HeroImageCarousel from '@/components/home/HeroImageCarousel';
import { heroImages } from '@/data/heroImages';

export default function HomeHero() {
  const { settings } = useSiteSettings();
  const siteName = settings?.site_name || 'Jenisha Patel';
  const words = siteName.trim().split(/\s+/);
  const initials = words.map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const subtitle = settings?.hero_subtitle || 'Building at the intersection of technology, leadership, and creative impact.';
  const ctaPrimary = settings?.hero_cta_primary || { label: 'Explore My Work', link: '/work' };
  const ctaSecondary = settings?.hero_cta_secondary || { label: "Let's Connect", link: '/contact' };
  const badge = settings?.tagline || 'Computer Science · Builder · Leader';

  // Evenly spaced around the circle's edge (angle measured from center, 0deg = right, clockwise).
  const iconBadges = [
  { icon: Code2, angle: 315, delay: 0 }, // upper-right
  { icon: Camera, angle: 45, delay: 1.1 }, // lower-right
  { icon: Users, angle: 135, delay: 2.2 }, // lower-left
  { icon: TrendingUp, angle: 225, delay: 3.1 }, // upper-left
  ];
  const dots = [
  { angle: 0, delay: '0s' },
  { angle: 120, delay: '1.4s' },
  { angle: 240, delay: '2.4s' },
  ];
  const badgeRadius = 42; // % from center — just outside the 66%-diameter circle
  const dotRadius = 34; // % from center — sits right on the circle's edge
  const posOnCircle = (angleDeg, radius) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { left: `${50 + radius * Math.cos(rad)}%`, top: `${50 + radius * Math.sin(rad)}%` };
  };


  return (
    <section className="relative px-4 md:px-8 pt-12 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          {/* Left: Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-primary bg-primary/10 border border-primary/30 [font-family:'IBM_Plex_Mono',_monospace]">
              
              <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_2px] shadow-amber-400/60 bg-[hsl(var(--warning))]" />
              {badge}
            </motion.span>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-xl md:text-2xl text-muted-foreground mt-5">Hi, I'm</motion.p>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.02] tracking-tight mt-2">
              {words.map((word, i) =>
              <span key={i}>{i > 0 && ' '}<span className={i === words.length - 1 ? 'text-gradient' : ''}>{word}</span></span>
              )}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-base md:text-lg text-muted-foreground mt-5 max-w-md leading-relaxed">{subtitle}</motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-wrap gap-3 mt-8">
              <Link to={ctaPrimary.link || '/work'} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium group glow-primary">
                {ctaPrimary.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to={ctaSecondary.link || '/contact'} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass text-foreground hover:border-primary/30 transition-premium">
                {ctaSecondary.label}
              </Link>
              <ResumeDownload variant="outline" label="Download Résumé" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-8">
              <SocialIcons settings={settings} size="md" />
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            <div className="absolute inset-[6%] rounded-full border border-dashed border-border" />
            <div className="absolute inset-[-4%] rounded-full border border-dashed border-border opacity-50" />
            <div className="w-2/3 aspect-square rounded-full border border-border shadow-glow relative overflow-hidden">
              <HeroImageCarousel images={heroImages} initials={initials} />
            </div>
            {iconBadges.map(({ icon: Icon, angle, delay }, i) =>
            <div key={i} style={posOnCircle(angle, badgeRadius)} className="absolute -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl glass-strong flex items-center justify-center shadow-card">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </motion.div>
              </div>
            )}
            {dots.map(({ angle, delay }, i) => (
              <span
                key={i}
                style={{ ...posOnCircle(angle, dotRadius), animationDelay: delay }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_2px] shadow-amber-400/60 animate-pulse"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>);

}