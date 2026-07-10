// Unified view over the two role-shaped collections (src/data/experience/ and
// src/data/leadership/), which store the same *kind* of thing (a role someone
// held) but use slightly different field names (`role_title` vs `position`).
//
// This module is the single place that normalizes and merges them — nothing
// else should duplicate that logic, and nothing stores a separate copy of
// this data. Add/remove a role by editing its file in experience/items/ or
// leadership/items/; everything derived here (including the homepage
// Featured Roles section) updates automatically.

import { experience, getExperienceById } from './experience';
import { leadership, getLeadershipById } from './leadership';

function normalize(item, source) {
  return {
    ...item,
    source, // 'experience' | 'leadership'
    title: source === 'experience' ? item.role_title : item.position,
  };
}

/** Every role from both collections, normalized to a common shape. */
export const allRoles = [
  ...experience.map((e) => normalize(e, 'experience')),
  ...leadership.map((l) => normalize(l, 'leadership')),
];

/** Roles marked `featured: true` in their own data file — used by the homepage. */
export const getFeaturedRoles = () => allRoles.filter((r) => r.featured).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

/** Look up a single role by id across both collections (ids are unique across the two). */
export const getRoleById = (id) => {
  const exp = getExperienceById(id);
  if (exp) return normalize(exp, 'experience');
  const lead = getLeadershipById(id);
  if (lead) return normalize(lead, 'leadership');
  return null;
};

export default allRoles;
