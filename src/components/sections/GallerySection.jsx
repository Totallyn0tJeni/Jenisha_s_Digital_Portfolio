import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ImagePlaceholder from '../ImagePlaceholder';
import SectionHeading from '../SectionHeading';

export default function GallerySection({ config = {}, section }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const count = config.count || 4;

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Photo.filter({ status: 'published' }, 'order', count);
        setPhotos(data);
      } catch (e) { setPhotos([]); }
      setLoading(false);
    })();
  }, [count]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          {section?.title && <SectionHeading title={section.title} align="left" />}
          <Link to="/photography" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-premium">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.length > 0 ? photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="aspect-square rounded-2xl overflow-hidden glass-card group cursor-pointer"
            >
              <img src={photo.image_url} alt={photo.alt_text || photo.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
          )) : (
            [...Array(count)].map((_, i) => <ImagePlaceholder key={i} label="Upload Photo" aspect="square" />)
          )}
        </div>
      </div>
    </section>
  );
}