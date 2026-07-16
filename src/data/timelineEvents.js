// The Timeline is DERIVED, not hand-maintained. It's generated from the dated
// fields already stored in education/, experience/, leadership/, awards/,
// certifications/, and work/ — so it can never drift out of sync with those
// collections. Editing a role's start_date, for example, automatically moves
// its timeline entry; there's nothing to update in two places.
//
// The only hand-authored entries live in src/data/timeline/items/ — reserved
// for genuine one-off milestones with no natural home in another collection
// (e.g. a conference appearance that isn't itself a role, award, or project).

import { education } from './education';
import { experience } from './experience';
import { leadership } from './leadership';
import { awards } from './awards';
import { certifications } from './certifications';
import { work } from './work';
import { timeline as handAuthoredEvents } from './timeline';

function fromEducation() {
  return education.flatMap((e) => {
    const events = [];
    if (e.start_date) {
      events.push({
        id: `edu-${e.id}-start`, category: 'education', date: e.start_date,
        title: `Started at ${e.institution}`, description: e.degree || e.field_of_study || '',
        is_milestone: true, related_entity_type: 'Education', related_entity_id: e.id, related_path: '/education',
      });
    }
    if (e.end_date && !e.is_current) {
      events.push({
        id: `edu-${e.id}-end`, category: 'education', date: e.end_date,
        title: `Graduated ${e.institution}`, description: e.degree || '',
        is_milestone: true, related_entity_type: 'Education', related_entity_id: e.id, related_path: '/education',
      });
    }
    return events;
  });
}

function fromRoles(collection, source) {
  return collection.flatMap((r) => {
    const events = [];
    const title = source === 'experience' ? r.role_title : r.position;
    const path = `/experience/${r.id}`;
    if (r.start_date) {
      events.push({
        id: `${source}-${r.id}-start`, category: source === 'experience' ? 'career' : 'leadership', date: r.start_date,
        title: `Became ${title}, ${r.organization}`, description: r.summary || r.description || '',
        is_milestone: !!r.featured, related_entity_type: source === 'experience' ? 'Experience' : 'Leadership', related_entity_id: r.id, related_path: path,
      });
    }
    if (r.end_date && !r.is_current) {
      events.push({
        id: `${source}-${r.id}-end`, category: source === 'experience' ? 'career' : 'leadership', date: r.end_date,
        title: `Concluded role as ${title}, ${r.organization}`, description: '',
        is_milestone: false, related_entity_type: source === 'experience' ? 'Experience' : 'Leadership', related_entity_id: r.id, related_path: path,
      });
    }
    return events;
  });
}

function fromAwards() {
  return awards.filter((a) => a.date).map((a) => ({
    id: `award-${a.id}`, category: 'award', date: a.date,
    title: a.title, description: a.organization || '',
    is_milestone: false, related_entity_type: 'Award', related_entity_id: a.id, related_path: '/awards',
  }));
}

function fromCertifications() {
  // Only top-level certificates (not nested module certs) to avoid flooding the timeline.
  return certifications.filter((c) => c.issue_date && !c.parent_certification).map((c) => ({
    id: `cert-${c.id}`, category: 'certification', date: c.issue_date,
    title: c.title, description: c.issuer || '',
    is_milestone: false, related_entity_type: 'Certification', related_entity_id: c.id, related_path: '/certifications',
  }));
}

function fromWork() {
  // Only featured/major projects — every small script isn't a timeline-worthy milestone.
  return work.filter((w) => w.featured && w.date).map((w) => ({
    id: `work-${w.id}`, category: 'project', date: w.date,
    title: w.title, description: w.tagline || '',
    is_milestone: true, related_entity_type: 'Work', related_entity_id: w.slug || w.id, related_path: `/work/${w.slug || w.id}`,
  }));
}

const derivedEvents = [
  ...fromEducation(),
  ...fromRoles(experience, 'experience'),
  ...fromRoles(leadership, 'leadership'),
  ...fromAwards(),
  ...fromCertifications(),
  ...fromWork(),
];

/** Full timeline: derived events + the handful of genuine one-off hand-authored milestones. */
export const timelineEvents = [...derivedEvents, ...handAuthoredEvents]
  .filter((e) => e.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getTimelineEventById = (id) => timelineEvents.find((e) => e.id === id);

/** Stable id helpers so detail pages can link to their own timeline entry without hardcoding the format. */
export const getTimelineEventIdForRole = (source, roleId) => `${source}-${roleId}-start`;
export const getTimelineEventIdForWork = (workId) => `work-${workId}`;
export const getTimelineEventIdForAward = (awardId) => `award-${awardId}`;
export const getTimelineEventIdForCertification = (certId) => `cert-${certId}`;

export default timelineEvents;
