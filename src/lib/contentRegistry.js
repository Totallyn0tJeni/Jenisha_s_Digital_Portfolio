/**
 * Universal Related Content Engine — registry half.
 *
 * Every collection in the app is described once here: how to get its items,
 * its detail path, its title, and the fields the relationship engine should
 * match on (organization strings, tags, skills, technologies, collaborators,
 * date). Adding a new collection to relationship matching means adding one
 * entry here — nothing else changes, and every detail page that calls
 * `getRelatedContent` picks it up automatically.
 *
 * Field readers are defensive (`item.tags || []`) because not every
 * collection has every field yet (e.g. photos/certifications don't have
 * `collaborators`). Missing fields simply contribute no signal instead of
 * throwing — and once a field like `tags` is added to a collection later,
 * matching on it starts working with no code change here.
 */

import { experience } from '@/data/experience';
import { leadership } from '@/data/leadership';
import { work } from '@/data/work';
import { awards } from '@/data/awards';
import { certifications } from '@/data/certifications';
import { photos } from '@/data/photos';
import { blogPosts } from '@/data/blog';
import { memberships } from '@/data/memberships';
import { organizations } from '@/data/organizations';
import { education } from '@/data/education';
import { getAssetGroups } from '@/data/assetGroups';

const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);

export const CONTENT_TYPES = {
  experience: {
    label: 'Experience',
    getItems: () => experience,
    getId: (i) => i.id,
    getTitle: (i) => i.role_title,
    getSubtitle: (i) => i.organization,
    getPath: (i) => `/experience/${i.id}`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => arr(i.tags),
    getSkills: (i) => arr(i.skills),
    getTechnologies: (i) => arr(i.technologies),
    getCollaborators: (i) => arr(i.collaborators),
    getDate: (i) => i.start_date,
  },
  leadership: {
    label: 'Leadership',
    getItems: () => leadership,
    getId: (i) => i.id,
    getTitle: (i) => i.position,
    getSubtitle: (i) => i.organization,
    getPath: (i) => `/experience/${i.id}`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => arr(i.tags),
    getSkills: (i) => arr(i.skills),
    getTechnologies: (i) => arr(i.technologies),
    getCollaborators: (i) => arr(i.collaborators),
    getDate: (i) => i.start_date,
  },
  work: {
    label: 'Project',
    getItems: () => work,
    getId: (i) => i.id,
    getTitle: (i) => i.title,
    getSubtitle: (i) => i.organization,
    getPath: (i) => `/work/${i.slug || i.id}`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => arr(i.tags),
    getSkills: (i) => arr(i.skills),
    getTechnologies: (i) => arr(i.tech_stack),
    getCollaborators: (i) => arr(i.collaborators),
    getDate: (i) => i.date,
  },
  marketing: {
    label: 'Marketing Campaign',
    getItems: () => getAssetGroups(),
    getId: (i) => i.id,
    getTitle: (i) => i.title,
    getSubtitle: (i) => i.organization,
    getPath: (i) => `/marketing/${i.id}`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => arr(i.tags),
    getSkills: (i) => [],
    getTechnologies: (i) => arr(i.software),
    getCollaborators: (i) => [],
    getDate: (i) => i.coverAsset?.date || null,
  },
  awards: {
    label: 'Award',
    getItems: () => awards,
    getId: (i) => i.id,
    getTitle: (i) => i.title,
    getSubtitle: (i) => i.organization,
    getPath: (i) => `/awards`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => arr(i.tags),
    getSkills: (i) => [],
    getTechnologies: (i) => [],
    getCollaborators: (i) => [],
    getDate: (i) => i.date,
  },
  certifications: {
    label: 'Certification',
    getItems: () => certifications,
    getId: (i) => i.id,
    getTitle: (i) => i.title,
    getSubtitle: (i) => i.issuer,
    getPath: (i) => `/certifications`,
    getOrgStrings: (i) => arr(i.issuer),
    getTags: (i) => arr(i.category),
    getSkills: (i) => [],
    getTechnologies: (i) => [],
    getCollaborators: (i) => [],
    getDate: (i) => i.issue_date,
  },
  photography: {
    label: 'Photography',
    getItems: () => photos,
    getId: (i) => i.id,
    getTitle: (i) => i.title,
    getSubtitle: (i) => i.category,
    getPath: (i) => `/photography`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => [...arr(i.tags), ...arr(i.category)],
    getSkills: (i) => [],
    getTechnologies: (i) => [],
    getCollaborators: (i) => [],
    getDate: (i) => i.date,
  },
  blog: {
    label: 'Blog Post',
    getItems: () => blogPosts,
    getId: (i) => i.id,
    getTitle: (i) => i.title,
    getSubtitle: (i) => i.category,
    getPath: (i) => `/blog/${i.slug || i.id}`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => [...arr(i.tags), ...arr(i.category)],
    getSkills: (i) => [],
    getTechnologies: (i) => [],
    getCollaborators: (i) => [],
    getDate: (i) => i.published_date,
  },
  memberships: {
    label: 'Membership',
    getItems: () => memberships,
    getId: (i) => i.id,
    getTitle: (i) => i.organization,
    getSubtitle: (i) => i.category,
    getPath: (i) => `/organizations`,
    getOrgStrings: (i) => arr(i.organization),
    getTags: (i) => arr(i.category),
    getSkills: (i) => [],
    getTechnologies: (i) => [],
    getCollaborators: (i) => [],
    getDate: (i) => null,
  },
  education: {
    label: 'Education',
    getItems: () => education,
    getId: (i) => i.id,
    getTitle: (i) => i.institution,
    getSubtitle: (i) => i.degree,
    getPath: (i) => `/education`,
    getOrgStrings: (i) => arr(i.institution),
    getTags: (i) => [],
    getSkills: (i) => [],
    getTechnologies: (i) => [],
    getCollaborators: (i) => [],
    getDate: (i) => i.start_date,
  },
  organizations: {
    label: 'Organization',
    getItems: () => organizations,
    getId: (i) => i.id,
    getTitle: (i) => i.name,
    getSubtitle: (i) => i.category,
    getPath: (i) => `/organizations/${i.id}`,
    getOrgStrings: (i) => [i.name],
    getTags: (i) => [],
    getSkills: (i) => [],
    getTechnologies: (i) => [],
    getCollaborators: (i) => [],
    getDate: (i) => null,
  },
};

export const CONTENT_TYPE_KEYS = Object.keys(CONTENT_TYPES);
