import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

// A single card representing one Asset Group ("Post") — one complete
// deliverable (which may be one image or a multi-image carousel/document),
// not a flat individual image. Used on the Marketing page and within
// campaign detail galleries so both surfaces share the same card UI.
export default function AssetGroupCard({ group, index = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: (index % 12) * 0.03 }}>
      <Link to={`/marketing/${group.id}`} className="glass-card overflow-hidden group block h-full">
        <div className="aspect-square relative">
          <img src={group.coverAsset.thumbnail_path} alt={group.coverAsset.alt_text} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {group.count > 1 && (
            <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold bg-background/80 backdrop-blur text-foreground">
              <Layers className="w-3 h-3" /> {group.count}
            </span>
          )}
        </div>
        <div className="p-3">
          <p className="text-sm text-foreground font-medium truncate">{group.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{[group.organization, group.collection].filter(Boolean).join(' · ')}</p>
        </div>
      </Link>
    </motion.div>
  );
}
