import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { formatMonthYear } from '@/lib/dateUtils';
import { getRelatedContentGrouped } from '@/lib/relationshipEngine';

/**
 * Automatically populated "Related Content" section for any detail page.
 * Pass the source item's content-type key + id; everything else (which
 * items are related, and why) comes from the relationship engine — nothing
 * here is hand-assigned per page.
 */
export default function RelatedContentSection({ typeKey, id, title = 'Related Content', limit = 12 }) {
  const grouped = getRelatedContentGrouped(typeKey, id, { limit });
  const groups = Object.values(grouped);
  if (groups.length === 0) return null;

  return (
    <div>
      <h2 className="font-display font-semibold text-xl text-foreground mb-4">{title}</h2>
      <div className="space-y-6">
        {groups.map((items) => (
          <div key={items[0].type}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2.5">
              {items[0].typeLabel}{items.length > 1 ? 's' : ''}
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {items.map((item) => (
                <motion.div key={`${item.type}-${item.id}`} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Link
                    to={item.path}
                    className="glass-card p-3.5 flex items-center justify-between gap-2 hover:border-primary/30 transition-premium group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.subtitle}{item.date ? ` · ${formatMonthYear(item.date)}` : ''}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-primary transition-premium" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
