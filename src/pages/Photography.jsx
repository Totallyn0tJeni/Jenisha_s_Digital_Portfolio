import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { photos as photosData } from '@/data/photos';

export default function Photography() {
  const photos = photosData;
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const categories = ['All', ...new Set(photos.map((p) => p.category).filter(Boolean))];
  const filtered = filter === 'All' ? photos : photos.filter((p) => p.category === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Visual Storytelling" title="Photography" subtitle="Events, portraits, nature, and the world through my lens." />
        </div>
      </section>

      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-8">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-premium ${filter === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((photo, i) => (
                <motion.button
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => photo.image_url && setLightbox(photo)}
                  className="aspect-square rounded-2xl overflow-hidden glass-card group cursor-pointer"
                >
                  {photo.image_url ? (
                    <img src={photo.image_url} alt={photo.alt_text || photo.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <ImagePlaceholder label={photo.title || 'Upload Photo'} aspect="square" className="border-0 rounded-none h-full" />
                  )}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <ImagePlaceholder key={i} label="Upload Photo" aspect="square" />)}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[90] bg-background/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl" onClick={() => setLightbox(null)}>✕</button>
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.alt_text || ''} className="max-w-full max-h-[90vh] object-contain rounded-xl" />
            {(lightbox.title || lightbox.caption) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6 rounded-b-xl">
                {lightbox.title && <h3 className="font-display font-semibold text-foreground">{lightbox.title}</h3>}
                {lightbox.caption && <p className="text-sm text-muted-foreground">{lightbox.caption}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}