import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Rectangular crossfade carousel — used for the About page portrait slot.
 * Distinct from the circular HeroImageCarousel used in the hero section.
 */
export default function AboutPhotoCarousel({ images = [], intervalMs = 4000, className = '' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(t);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;
  const current = images[index];

  return (
    <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-soft ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current.id}
          src={current.src}
          alt={current.alt || 'Photo'}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-primary shadow-[0_0_8px_1px] shadow-primary/60' : 'w-1.5 bg-white/50 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
