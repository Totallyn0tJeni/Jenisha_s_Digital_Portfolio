/**
 * Resolves the free-text `organization` string already present on Experience,
 * Leadership, Work, Award, etc. records to one or more canonical Organization
 * IDs — without storing an `organization_id` on every item file.
 *
 * Why resolve instead of hand-assigning organization_id everywhere:
 *  - The `organization` string is already the source of truth on each item.
 *  - Adding organization_id to every item would be manual synchronization —
 *    exactly what we're trying to avoid. This derives the link instead.
 *  - New content just needs the same organization name string it already
 *    needs today; linking happens automatically.
 *
 * Matching strategy (in order):
 *  1. Exact match of the whole string against a known org's name or alias.
 *     This must come first — some real org names themselves contain "," or
 *     "&" (e.g. "Brampton FBLC, JEC & TA"), so naive splitting would break them.
 *  2. If no whole-string match, split on "," / "&" and resolve each part
 *     independently — this correctly handles fields that really do list
 *     multiple institutions (e.g. "Hilldale Public School, Williams Parkway
 *     Senior Public School & Chinguacousy Secondary School").
 *  3. Anything that still doesn't resolve is left unresolved rather than
 *     guessed at — no organization link is safer than a wrong one.
 */

import { organizations } from './index';

function normalize(str) {
  return (str || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

// Built once: every known name/alias -> org id.
const LOOKUP = new Map();
for (const org of organizations) {
  LOOKUP.set(normalize(org.name), org.id);
  for (const alias of org.aliases || []) {
    LOOKUP.set(normalize(alias), org.id);
  }
}

const resolveCache = new Map();

/** Resolve a raw organization string to an array of org ids (may be empty, one, or several). */
export function resolveOrganizationIds(orgString) {
  if (!orgString) return [];
  if (resolveCache.has(orgString)) return resolveCache.get(orgString);

  let result;
  const wholeMatch = LOOKUP.get(normalize(orgString));
  if (wholeMatch) {
    result = [wholeMatch];
  } else {
    const parts = orgString.split(/,|&/).map((p) => p.trim()).filter(Boolean);
    const resolvedParts = parts.map((p) => LOOKUP.get(normalize(p))).filter(Boolean);
    // Only trust the split if every part resolved — a partial match means
    // our guess about how to split was probably wrong.
    result = resolvedParts.length === parts.length && parts.length > 0 ? [...new Set(resolvedParts)] : [];
  }

  resolveCache.set(orgString, result);
  return result;
}

/** Convenience: resolve to full Organization objects instead of ids. */
export function resolveOrganizations(orgString) {
  const ids = resolveOrganizationIds(orgString);
  return ids.map((id) => organizations.find((o) => o.id === id)).filter(Boolean);
}

/** The single primary org for a string that's expected to resolve to one (e.g. Experience.organization). */
export function resolvePrimaryOrganization(orgString) {
  return resolveOrganizations(orgString)[0] || null;
}

export function getOrganizationById(id) {
  return organizations.find((o) => o.id === id) || null;
}

export function getOrganizationBySlugOrId(slugOrId) {
  return organizations.find((o) => o.id === slugOrId || o.slug === slugOrId) || null;
}
