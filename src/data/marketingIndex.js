// The relational layer over the marketing/portfolio data. Nothing here is
// stored — it's all computed from work/ (campaigns) and assets/ (images),
// which are the actual sources of truth. This keeps "Organizations",
// "Categories", "Tags", and featured-campaign selection from ever drifting
// out of sync with the underlying records, since they're derived every time
// rather than hand-maintained in a parallel collection.

import { work } from './work';
import { assets, getAssetsByCampaign, getSubcampaigns } from './assets';

export const campaigns = work.filter((w) => w.work_type === 'marketing_campaign');

/**
 * Organizations, derived from campaigns + assets (not a stored collection).
 * Each entry aggregates every campaign and asset tagged with that org name.
 */
export function getOrganizations() {
  const names = new Set([
    ...campaigns.map((c) => c.organization).filter(Boolean),
    ...assets.map((a) => a.organization).filter(Boolean),
  ]);
  return [...names].map((name) => ({
    name,
    campaigns: campaigns.filter((c) => c.organization === name),
    assets: assets.filter((a) => a.organization === name),
  })).sort((a, b) => b.assets.length - a.assets.length);
}

/** All distinct categories across every asset, with counts. */
export function getCategories() {
  const counts = {};
  for (const a of assets) {
    for (const cat of a.category || []) counts[cat] = (counts[cat] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([category, count]) => ({ category, count }));
}

/** All distinct tags across every asset, with counts. */
export function getTags() {
  const counts = {};
  for (const a of assets) {
    for (const t of a.tags || []) counts[t] = (counts[t] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }));
}

/**
 * Featured-campaign score — a transparent, rules-based proxy for portfolio
 * "depth" (how fully documented and substantial a campaign is), NOT a claim
 * about subjective visual quality or creativity, which can't be computed
 * from metadata. Weighted by: deliverables, objectives, results/metrics,
 * case-study completeness, collaborator count, linked experience, and
 * asset volume. Top-scoring campaigns are marked featured; the rest aren't.
 */
export function getCampaignScore(c) {
  const caseStudyFields = ['challenge', 'strategy', 'execution', 'results', 'reflection'];
  const caseStudyCompleteness = caseStudyFields.filter((f) => c[f]).length + (c.goals?.length > 0 ? 1 : 0);
  return (
    (c.deliverables?.length || 0) * 2 +
    (c.objectives?.length || 0) * 1 +
    (c.metrics?.length || 0) * 2 +
    (c.outcomes?.length || 0) * 2 +
    caseStudyCompleteness * 2 +
    (c.collaborators?.length || 0) * 1 +
    (c.related_experience_id ? 5 : 0) +
    getAssetsByCampaign(c.id).length * 1
  );
}

export function getScoredCampaigns() {
  return [...campaigns].map((c) => ({ ...c, _score: getCampaignScore(c) })).sort((a, b) => b._score - a._score);
}

export function getFeaturedCampaigns() {
  return campaigns.filter((c) => c.featured);
}

/** Real portfolio statistics, computed from the actual collections. */
export function getPortfolioStats() {
  const years = new Set(assets.map((a) => a.campaign && work.find((w) => w.id === a.campaign)?.date?.slice(0, 4)).filter(Boolean));
  const softwareCounts = {};
  for (const a of assets) for (const s of a.software || []) softwareCounts[s] = (softwareCounts[s] || 0) + 1;
  const mostUsedSoftware = Object.entries(softwareCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const orgs = getOrganizations();
  const mostActiveOrg = orgs[0]?.name || null;

  const byType = {};
  for (const a of assets) byType[a.asset_type] = (byType[a.asset_type] || 0) + 1;

  return {
    totalAssets: assets.length,
    totalCampaigns: campaigns.length,
    featuredCampaigns: getFeaturedCampaigns().length,
    totalOrganizations: orgs.length,
    yearsCovered: [...years].sort(),
    mostActiveOrganization: mostActiveOrg,
    mostUsedSoftware,
    assetsByType: byType,
  };
}

export { getAssetsByCampaign, getSubcampaigns };

/**
 * The cover/hero image for a campaign — the asset within it marked
 * `featured: true`, falling back to the first asset if none is marked.
 * This replaces a hardcoded `hero_image` field on the Work item, so the
 * image path only ever lives in one place (the asset record itself).
 */
export function getCampaignHeroImage(campaignId) {
  const campaignAssets = getAssetsByCampaign(campaignId);
  const hero = campaignAssets.find((a) => a.featured) || campaignAssets[0];
  return hero?.web_path || '';
}

export default campaigns;
