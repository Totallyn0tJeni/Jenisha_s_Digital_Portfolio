import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import WorkCard from '@/components/cards/WorkCard';
import { work } from '@/data/work';
import { marketingContent } from '@/data/marketingContent';

// Large campaigns are simply filtered from the Work collection — never duplicated.
const campaigns = work.filter((w) => w.work_type === 'marketing_campaign');

export default function Marketing() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-10">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> Marketing
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mt-4">
            Brand, <span className="text-gradient">campaign</span>, and content work
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">
            Full-scale campaigns live in Work below, alongside the smaller graphics, posts, and content pieces behind them.
          </p>
        </div>
      </section>

      {/* Large campaigns — filtered from Work, not duplicated */}
      {campaigns.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeading eyebrow="Campaigns" title="Large-scale marketing work" align="left" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {campaigns.map((c, i) => <WorkCard key={c.id} work={c} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Smaller marketing content — lives only here, never in Work */}
      <section className="px-4 md:px-8 pb-20 border-t border-border/50 pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Content" title="Posts, graphics & smaller pieces" align="left" />
          {marketingContent.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {marketingContent.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass-card overflow-hidden group">
                  <div className="aspect-square">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <ImagePlaceholder label={item.title || 'Portfolio Media Coming Soon'} aspect="square" className="border-0 rounded-none h-full" />
                    )}
                  </div>
                  {item.title && (
                    <div className="p-3">
                      <p className="text-sm text-foreground font-medium truncate">{item.title}</p>
                      {item.platform && <p className="text-xs text-muted-foreground mt-0.5">{item.platform}</p>}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="Individual posts, graphics, and one-off content coming soon"
                description="Add entries to src/data/marketingContent/items/ — each with a title, platform, organization, and image_url."
              />
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
