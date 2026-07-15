import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import WorkCard from '@/components/cards/WorkCard';
import AssetGroupCard from '@/components/cards/AssetGroupCard';
import {
  campaigns, getFeaturedCampaigns, getOrganizations, getCategories, getPortfolioStats,
} from '@/data/marketingIndex';
import { getAssetGroups } from '@/data/assetGroups';

const featuredCampaigns = getFeaturedCampaigns();
const organizations = getOrganizations();
const categories = getCategories();
const stats = getPortfolioStats();
const allGroups = getAssetGroups();

export default function Marketing() {
  const [orgFilter, setOrgFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(24);

  const orgFilteredCampaigns = orgFilter === 'All' ? campaigns : campaigns.filter((c) => c.organization === orgFilter);
  const filteredGroups = allGroups.filter((g) => {
    const orgMatch = orgFilter === 'All' || g.organization === orgFilter;
    const catMatch = categoryFilter === 'All' || g.assets.some((a) => a.category?.includes(categoryFilter));
    return orgMatch && catMatch;
  });
  const visibleGroups = filteredGroups.slice(0, visibleCount);

  useEffect(() => { setVisibleCount(24); }, [orgFilter, categoryFilter]);

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
            <p className="text-sm text-muted-foreground">No full campaign write-up for {orgFilter} yet — see the posts below.</p>
          )}
        </div>
      </section>

      {/* Post library — grouped deliverables, filterable by category, respects the organization filter above */}
      <section className="px-4 md:px-8 pb-20 border-t border-border/50 pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Post Library" title="Every deliverable, organized" align="left" />
          <div className="flex flex-wrap gap-2 mt-6 mb-2">
            {['All', ...categories.map((c) => c.category)].map((cat) => (
              <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-premium ${categoryFilter === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </div>

          {filteredGroups.length > 0 ? (
            <>
              <p className="text-xs text-muted-foreground mb-3">Showing {visibleGroups.length} of {filteredGroups.length} posts ({stats.totalAssets} total images)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleGroups.map((group, i) => <AssetGroupCard key={group.id} group={group} index={i} />)}
              </div>
              {visibleCount < filteredGroups.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleCount((v) => v + 24)}
                    className="px-6 py-2.5 rounded-full text-sm font-semibold glass text-foreground hover:border-primary/30 transition-premium"
                  >
                    Load More ({filteredGroups.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground mt-6">No posts match this filter.</p>
          )}
        </div>
      </section>
    </motion.div>
  );
}
