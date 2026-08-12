import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

/**
 * Rotating photo carousel that lives inside the hero's circular frame.
 * Falls back to a labeled placeholder tile per-slide when no `src` is set yet,
 * so the design reads intentionally even before real photos are added.
 */
export default function HeroImageCarousel({ images = [], initials = '', intervalMs = 4500 }) {
  const [index, setIndex] = useState(0);
  const slides = images.length > 0 ? images : [{ id: 'fallback', src: '', alt: '', label: '' }];

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  const current = slides[index];

  return (
    <div className="relative w-full h-full rounded-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {current.src ? (
            <img src={current.src} alt={current.alt || 'Portfolio photo'} className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ background: 'radial-gradient(circle at 50% 40%, hsl(var(--primary) / 0.25), hsl(var(--surface)) 70%)' }}
            >
              {initials ? (
                <span className="font-display font-bold text-7xl md:text-8xl text-gradient">{initials}</span>
              ) : (
                <Camera className="w-10 h-10 text-primary/60" strokeWidth={1.5} />
              )}
              {current.label && (
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground [font-family:'IBM_Plex_Mono',_monospace]">
                  {current.label} photo coming soon
                </span>
              )}
            </div>
          )}
          {/* subtle glass overlay so imported photos stay on-brand with the rest of the hero */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && slides.length <= 10 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Show ${s.label || 'photo'} ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-primary shadow-[0_0_8px_1px] shadow-primary/60' : 'w-1.5 bg-foreground/25 hover:bg-foreground/40'
              }`}
            />
          ))}
        </div>
      )}
      {slides.length > 10 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur text-[10px] font-mono text-foreground/80">
          {index + 1} / {slides.length}
        </div>
      )}
    </div>
  );
}
