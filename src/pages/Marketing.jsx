import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import WorkCard from '@/components/cards/WorkCard';
import {
  campaigns, getFeaturedCampaigns, getOrganizations, getCategories, getPortfolioStats,
} from '@/data/marketingIndex';
import { assets } from '@/data/assets';

const featuredCampaigns = getFeaturedCampaigns();
const organizations = getOrganizations();
const categories = getCategories();
const stats = getPortfolioStats();

export default function Marketing() {
  const [orgFilter, setOrgFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const orgFilteredCampaigns = orgFilter === 'All' ? campaigns : campaigns.filter((c) => c.organization === orgFilter);
  const filteredAssets = assets.filter((a) => {
    const orgMatch = orgFilter === 'All' || a.organization === orgFilter;
    const catMatch = categoryFilter === 'All' || a.category?.includes(categoryFilter);
    return orgMatch && catMatch;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> Marketing
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mt-4">
            Brand, <span className="text-gradient">campaign</span>, and content work
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">
            Full-scale campaigns with real deliverables and results, backed by the graphics, posts, and assets behind them.
          </p>

          {/* Real, computed portfolio stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { label: 'Assets', value: stats.totalAssets },
              { label: 'Campaigns', value: stats.totalCampaigns },
              { label: 'Organizations', value: stats.totalOrganizations },
              { label: 'Featured', value: stats.featuredCampaigns },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className="font-display font-bold text-2xl text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured campaigns — scored, not manually cherry-picked (see src/data/marketingIndex.js) */}
      {featuredCampaigns.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeading eyebrow="Featured" title="Flagship campaigns" align="left" />
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {featuredCampaigns.map((c, i) => <WorkCard key={c.id} work={c} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Browse by organization */}
      <section className="px-4 md:px-8 pb-16 border-t border-border/50 pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Campaigns" title="Browse by organization" align="left" />
          <div className="flex flex-wrap gap-2 mt-6 mb-8">
            {['All', ...organizations.map((o) => o.name)].map((org) => (
              <button key={org} onClick={() => setOrgFilter(org)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-premium ${orgFilter === org ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
                {org}
              </button>
            ))}
          </div>
          {orgFilteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgFilteredCampaigns.map((c, i) => <WorkCard key={c.id} work={c} index={i} />)}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No full campaign write-up for {orgFilter} yet — see the assets below.</p>
          )}
        </div>
      </section>

      {/* Asset library — filterable by category, respects the organization filter above */}
      <section className="px-4 md:px-8 pb-20 border-t border-border/50 pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Asset Library" title="Every piece, organized" align="left" />
          <div className="flex flex-wrap gap-2 mt-6 mb-2">
            {['All', ...categories.map((c) => c.category)].map((cat) => (
              <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-premium ${categoryFilter === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </div>

          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {filteredAssets.map((asset, i) => (
                <motion.div key={asset.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 12) * 0.03 }} className="glass-card overflow-hidden group">
                  <div className="aspect-square">
                    <img src={asset.thumbnail_path} alt={asset.alt_text} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-foreground font-medium truncate">{asset.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{[asset.organization, asset.collection].filter(Boolean).join(' · ')}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-6">No assets match this filter.</p>
          )}
        </div>
      </section>
    </motion.div>
  );
}
