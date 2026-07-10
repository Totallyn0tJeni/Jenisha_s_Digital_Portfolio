import { ImagePlus } from 'lucide-react';

/**
 * Reusable image placeholder.
 * Shows a dashed-border box with tasteful "coming soon" text.
 * Used everywhere an image is expected but not yet uploaded.
 *
 * Props:
 * - label: text shown (e.g., "Portfolio Media Coming Soon")
 * - aspect: 'square' | 'video' | 'wide' | 'tall' | 'auto'
 * - className: additional classes
 */
export default function ImagePlaceholder({ label = 'Portfolio Media Coming Soon', aspect = 'auto', className = '' }) {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    tall: 'aspect-[3/4]',
    auto: 'min-h-[200px]',
  }[aspect];

  return (
    <div
      className={`${aspectClass} ${className} rounded-2xl border-2 border-dashed border-primary/25 bg-surface/50 flex flex-col items-center justify-center gap-3 text-center p-6 transition-premium hover:border-primary/40 hover:bg-primary/5`}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary/60">
        <ImagePlus className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}