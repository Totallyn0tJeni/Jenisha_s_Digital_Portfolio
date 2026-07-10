import { motion } from 'framer-motion';
import { ExternalLink, FileDown } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { resources as resourcesData, DOWNLOAD_CATEGORIES } from '@/data/resources';

const typeIcons = { article: '📄', tool: '🔧', template: '📋', guide: '📖', video: '🎬', pdf: '📕', course: '🎓', other: '🔗' };

export default function Resources() {
  const downloads = resourcesData.filter((r) => r.resource_type === 'download');
  const items = resourcesData.filter((r) => r.resource_type !== 'download');
  const downloadsByCategory = DOWNLOAD_CATEGORIES.map((cat) => ({
    category: cat,
    item: downloads.find((d) => d.download_category === cat),
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Downloads" title="Downloadable Materials" subtitle="Media kit, brand assets, and rate cards — grab what you need." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {downloadsByCategory.map(({ category, item }) => (
              <div key={category} className="glass-card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileDown className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground text-sm">{category}</p>
                  {item?.file_url ? (
                    <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:text-primary/80 transition-premium">Download →</a>
                  ) : (
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-20 border-t border-border/50 pt-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Knowledge" title="Curated Links" subtitle="Articles, tools, and guides I recommend." />
          {items.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-5 group flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">{typeIcons[item.resource_type] || '🔗'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-premium">{item.title}</h3>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-premium" />
                    </div>
                    {item.description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{item.description}</p>}
                    {item.category && <span className="inline-block mt-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.category}</span>}
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first resource" description="Add entries to src/data/resources.js." />
          )}
        </div>
      </section>
    </motion.div>
  );
}