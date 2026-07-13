import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/**
 * Every marketing/design asset published to the site — the single source of
 * truth for images used across Marketing campaigns, Work, and (in future)
 * Photography. Add a new asset by creating a file in items/; nothing else
 * references raw image paths directly — everyone queries this collection.
 */
export const assets = loadItems(modules);

export const getAssetById = (id) => assets.find((a) => a.id === id);
export const getAssetsByCampaign = (campaignId) => assets.filter((a) => a.campaign === campaignId);
export const getAssetsByOrganization = (org) => assets.filter((a) => a.organization === org);
export const getAssetsByCategory = (category) => assets.filter((a) => a.category?.includes(category));
export const getAssetsByCollection = (campaignId, collection) =>
  assets.filter((a) => a.campaign === campaignId && a.collection === collection);

/** Sub-campaigns (collection field) that exist within a given campaign, in first-seen order. */
export const getSubcampaigns = (campaignId) => {
  const seen = [];
  for (const a of getAssetsByCampaign(campaignId)) {
    if (a.collection && !seen.includes(a.collection)) seen.push(a.collection);
  }
  return seen;
};

export default assets;
