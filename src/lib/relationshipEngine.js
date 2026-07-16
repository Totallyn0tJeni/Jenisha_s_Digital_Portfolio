/**
 * Universal Related Content Engine — logic half (see contentRegistry.js for
 * the data-shape half). One implementation of "how related are these two
 * things" used by every detail page (Experience, Work, Marketing, Awards,
 * Certifications, Photography, Blog, Organizations) instead of each page
 * hand-rolling its own related-content logic.
 *
 * Matching signals, weighted by how strong a relationship they imply:
 *   shared organization  -> 4 pts each
 *   shared collaborator  -> 3 pts each
 *   shared tag           -> 2 pts each
 *   shared skill         -> 2 pts each
 *   shared technology     -> 1 pt each
 *   dates within ~6 months -> 1 pt
 *
 * All item profiles are built once (module load) and memoized, per the
 * project's performance requirements — detail pages just filter/sort an
 * already-computed array rather than recomputing relationships per render.
 */

import { CONTENT_TYPES } from './contentRegistry';
import { resolveOrganizationIds } from '@/data/organizations/resolve';

const norm = (s) => (s || '').trim().toLowerCase();
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

function buildProfile(typeKey, config, item) {
  const orgIds = new Set(config.getOrgStrings(item).flatMap((s) => resolveOrganizationIds(s)));
  return {
    type: typeKey,
    typeLabel: config.label,
    id: config.getId(item),
    title: config.getTitle(item),
    subtitle: config.getSubtitle(item),
    path: config.getPath(item),
    date: config.getDate(item) || null,
    organizationIds: orgIds,
    tags: new Set(config.getTags(item).map(norm).filter(Boolean)),
    skills: new Set(config.getSkills(item).map(norm).filter(Boolean)),
    technologies: new Set(config.getTechnologies(item).map(norm).filter(Boolean)),
    collaborators: new Set(config.getCollaborators(item).map(norm).filter(Boolean)),
    raw: item,
  };
}

// Built once at module load; every detail page shares this same array.
let ALL_PROFILES = null;
function getAllProfiles() {
  if (ALL_PROFILES) return ALL_PROFILES;
  ALL_PROFILES = [];
  for (const [typeKey, config] of Object.entries(CONTENT_TYPES)) {
    for (const item of config.getItems()) {
      ALL_PROFILES.push(buildProfile(typeKey, config, item));
    }
  }
  return ALL_PROFILES;
}

function intersectionSize(setA, setB) {
  let count = 0;
  for (const v of setA) if (setB.has(v)) count++;
  return count;
}

function scoreProfiles(a, b) {
  let score = 0;
  score += intersectionSize(a.organizationIds, b.organizationIds) * 4;
  score += intersectionSize(a.collaborators, b.collaborators) * 3;
  score += intersectionSize(a.tags, b.tags) * 2;
  score += intersectionSize(a.skills, b.skills) * 2;
  score += intersectionSize(a.technologies, b.technologies) * 1;
  if (a.date && b.date) {
    const diff = Math.abs(new Date(a.date).getTime() - new Date(b.date).getTime());
    if (Number.isFinite(diff) && diff <= SIX_MONTHS_MS) score += 1;
  }
  return score;
}

const relatedCache = new Map();

/**
 * Get related content for a source item across the whole portfolio.
 * @param {string} typeKey - key into CONTENT_TYPES for the source item's own collection
 * @param {string} id - the source item's id
 * @param {object} [options]
 * @param {string[]} [options.types] - restrict candidates to these CONTENT_TYPES keys
 * @param {number} [options.limit] - max results (default 6)
 * @param {number} [options.minScore] - minimum score to be considered "related" (default 1)
 */
export function getRelatedContent(typeKey, id, options = {}) {
  const { types, limit = 6, minScore = 1 } = options;
  const cacheKey = `${typeKey}:${id}:${(types || []).join(',')}:${limit}:${minScore}`;
  if (relatedCache.has(cacheKey)) return relatedCache.get(cacheKey);

  const profiles = getAllProfiles();
  const source = profiles.find((p) => p.type === typeKey && String(p.id) === String(id));
  if (!source) {
    relatedCache.set(cacheKey, []);
    return [];
  }

  const candidates = types ? profiles.filter((p) => types.includes(p.type)) : profiles;

  const scored = candidates
    .filter((p) => !(p.type === source.type && p.id === source.id))
    .map((p) => ({ profile: p, score: scoreProfiles(source, p) }))
    .filter((s) => s.score >= minScore)
    .sort((a, b) => b.score - a.score || (new Date(b.profile.date || 0) - new Date(a.profile.date || 0)));

  const result = scored.slice(0, limit).map((s) => ({
    type: s.profile.type,
    typeLabel: s.profile.typeLabel,
    id: s.profile.id,
    title: s.profile.title,
    subtitle: s.profile.subtitle,
    path: s.profile.path,
    date: s.profile.date,
    score: s.score,
  }));

  relatedCache.set(cacheKey, result);
  return result;
}

/** Related content grouped by type — convenient for "Related Content" sections split into subsections. */
export function getRelatedContentGrouped(typeKey, id, options = {}) {
  const flat = getRelatedContent(typeKey, id, { ...options, limit: options.limit || 20 });
  const grouped = {};
  for (const item of flat) (grouped[item.type] ||= []).push(item);
  return grouped;
}

/** Every item across every collection that resolves to the given organization id — powers Organization aggregation pages. */
export function getContentForOrganization(orgId) {
  const profiles = getAllProfiles();
  const grouped = {};
  for (const p of profiles) {
    if (p.type === 'organizations') continue;
    if (p.organizationIds.has(orgId)) {
      (grouped[p.type] ||= []).push({
        type: p.type,
        typeLabel: p.typeLabel,
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        path: p.path,
        date: p.date,
        raw: p.raw,
      });
    }
  }
  return grouped;
}

export default { getRelatedContent, getRelatedContentGrouped, getContentForOrganization };
