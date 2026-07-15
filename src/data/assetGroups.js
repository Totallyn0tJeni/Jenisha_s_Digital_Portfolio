// Asset Groups ("Posts") — the layer between Campaign and individual Assets.
// Nothing is stored here: groups are derived from the `group_id` field already
// present on each Asset record (src/data/assets/items/*.js). Assets themselves
// were never renamed, regenerated, or duplicated — this just organizes the
// existing records into logical deliverables/carousels/posts.

import { assets } from './assets';
import { work } from './work';
import { getRoleById } from './experienceRoles';
import { getTimelineEventById, getTimelineEventIdForRole } from './timelineEvents';

function groupTitle(first, count) {
  if (count > 1) return first.collection || first.title;
  return first.title;
}

function buildGroup(groupId, groupAssets) {
  const sorted = [...groupAssets].sort((a, b) => a.group_index - b.group_index);
  const first = sorted[0];
  const cover = sorted.find((a) => a.featured) || first;
  return {
    id: groupId,
    title: groupTitle(first, sorted.length),
    campaign: first.campaign,
    organization: first.organization,
    collection: first.collection,
    groupType: first.group_type,
    tags: [...new Set(sorted.flatMap((a) => a.tags || []))],
    software: [...new Set(sorted.flatMap((a) => a.software || []))],
    assets: sorted,
    coverAsset: cover,
    count: sorted.length,
  };
}

/** All asset groups, optionally filtered first at the asset level. */
export function getAssetGroups(filterFn) {
  const list = filterFn ? assets.filter(filterFn) : assets;
  const byGroup = {};
  for (const a of list) (byGroup[a.group_id] ||= []).push(a);
  return Object.entries(byGroup).map(([id, groupAssets]) => buildGroup(id, groupAssets));
}

export function getAssetGroupById(id) {
  const groupAssets = assets.filter((a) => a.group_id === id);
  if (groupAssets.length === 0) return null;
  return buildGroup(id, groupAssets);
}

export function getAssetGroupsByCampaign(campaignId) {
  return getAssetGroups((a) => a.campaign === campaignId);
}

/**
 * "Used In" — everywhere this group's campaign connects to, inferred from
 * existing relationships (campaign -> related_experience_id -> role -> org),
 * not manually re-entered per asset.
 */
export function getUsedIn(group) {
  const used = [];
  const campaignWork = work.find((w) => w.id === group.campaign);

  if (campaignWork) {
    used.push({ type: 'Campaign', label: campaignWork.title, path: `/work/${campaignWork.slug || campaignWork.id}` });
    used.push({ type: 'Portfolio Section', label: 'Marketing', path: '/marketing' });

    if (campaignWork.related_experience_id) {
      const role = getRoleById(campaignWork.related_experience_id);
      if (role) {
        const label = role.source === 'experience' ? role.title : role.position;
        used.push({
          type: role.source === 'experience' ? 'Experience' : 'Leadership',
          label: `${label} — ${role.organization}`,
          path: `/experience/${role.id}`,
        });
        const timelineId = getTimelineEventIdForRole(role.source, role.id);
        const timelineEvent = getTimelineEventById(timelineId);
        if (timelineEvent) {
          used.push({
            type: 'Timeline',
            label: new Date(timelineEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
            path: `/timeline?highlight=${timelineId}`,
          });
        }
      }
    }
  }

  if (group.organization) {
    used.push({ type: 'Organization', label: group.organization, path: `/marketing` });
  }

  return used;
}

/** Related work — other asset groups from the same campaign, excluding this one. */
export function getRelatedGroups(group, limit = 6) {
  return getAssetGroupsByCampaign(group.campaign)
    .filter((g) => g.id !== group.id)
    .slice(0, limit);
}

/**
 * Ordered list of every group in a campaign (for prev/next-post navigation),
 * sorted by collection then group order.
 */
export function getCampaignGroupSequence(campaignId) {
  return getAssetGroupsByCampaign(campaignId).sort((a, b) => {
    if (a.collection !== b.collection) return (a.collection || '').localeCompare(b.collection || '');
    return (a.assets[0]?.group_index ?? 0) - (b.assets[0]?.group_index ?? 0);
  });
}

/** Previous/next post within the same campaign, and previous/next campaign entirely. */
export function getGroupNavigation(group) {
  const sequence = getCampaignGroupSequence(group.campaign);
  const idx = sequence.findIndex((g) => g.id === group.id);
  const prevPost = idx > 0 ? sequence[idx - 1] : null;
  const nextPost = idx >= 0 && idx < sequence.length - 1 ? sequence[idx + 1] : null;

  const campaigns = work.filter((w) => w.work_type === 'marketing_campaign');
  const campIdx = campaigns.findIndex((c) => c.id === group.campaign);
  const prevCampaign = campIdx > 0 ? campaigns[campIdx - 1] : null;
  const nextCampaign = campIdx >= 0 && campIdx < campaigns.length - 1 ? campaigns[campIdx + 1] : null;

  return { prevPost, nextPost, prevCampaign, nextCampaign };
}

export default getAssetGroups;
