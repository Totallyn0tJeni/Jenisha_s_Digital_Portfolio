// The Timeline is a CURATED subset, derived from (not duplicated from) the
// dated fields already stored in education/, experience/, leadership/, and
// work/ — so a featured entry can never drift out of sync with its source
// record. Only records explicitly flagged `timeline_featured: true` appear
// here; everything else stays fully visible on its own page (Leadership,
// Certifications, Awards, etc.) without cluttering the growth story.
//
// Optional per-record overrides, used when the default auto-generated
// title/description would be too generic or too precise for a milestone:
//   timeline_title            — replaces the generated title
//   timeline_description      — replaces the generated description
//   timeline_end_description  — description used specifically for an
//                                education record's "graduated" event
//   timeline_date_display     — replaces the formatted date shown on the
//                                card (e.g. "2022 – 2026" instead of a
//                                single precise date)
//
// Awards and certifications are intentionally excluded from the timeline
// entirely — they remain fully browsable on /awards and /certifications,
// and standout ones are folded into the description of a related milestone
// instead of getting their own card.
//
// The only hand-authored entries live in src/data/timeline/items/ — reserved
// for genuine one-off milestones with no natural home in another collection
// (e.g. the foundational years, or a combined multi-org beat).

import { education } from './education';
import { experience } from './experience';
import { leadership } from './leadership';
import { awards } from './awards';
import { certifications } from './certifications';
import { work } from './work';
import { timeline as handAuthoredEvents } from './timeline';

function fromEducation() {
  return education.filter((e) => e.timeline_featured).flatMap((e) => {
    const events = [];
    if (e.start_date) {
      events.push({
        id: `edu-${e.id}-start`, category: 'education', date: e.start_date, date_display: e.timeline_date_display,
        title: e.timeline_title || `Started at ${e.institution}`, description: e.timeline_description || e.degree || e.field_of_study || '',
        is_milestone: true, related_entity_type: 'Education', related_entity_id: e.id, related_path: '/education',
      });
    }
    if (e.end_date && !e.is_current) {
      events.push({
        id: `edu-${e.id}-end`, category: 'education', date: e.end_date,
        title: `Graduated ${e.institution}`, description: e.timeline_end_description || e.degree || '',
        is_milestone: true, related_entity_type: 'Education', related_entity_id: e.id, related_path: '/education',
      });
    }
    return events;
  });
}

function fromRoles(collection, source) {
  return collection.filter((r) => r.timeline_featured).flatMap((r) => {
    const events = [];
    const title = source === 'experience' ? r.role_title : r.position;
    const path = `/experience/${r.id}`;
    if (r.start_date) {
      events.push({
        id: `${source}-${r.id}-start`, category: source === 'experience' ? 'career' : 'leadership', date: r.start_date, date_display: r.timeline_date_display,
        title: r.timeline_title || `Became ${title}, ${r.organization}`, description: r.timeline_description || r.summary || r.description || '',
        is_milestone: true, related_entity_type: source === 'experience' ? 'Experience' : 'Leadership', related_entity_id: r.id, related_path: path,
      });
    }
    return events;
  });
}

function fromAwards() {
  // Excluded from the timeline by design — see file header. Kept for the
  // id-helper below, which other pages use to check for (and gracefully
  // skip) a timeline entry that generally won't exist for any given award.
  return awards.filter((a) => a.timeline_featured && a.date).map((a) => ({
    id: `award-${a.id}`, category: 'award', date: a.date,
    title: a.title, description: a.organization || '',
    is_milestone: false, related_entity_type: 'Award', related_entity_id: a.id, related_path: '/awards',
  }));
}

function fromCertifications() {
  // Excluded from the timeline by design — see file header.
  return certifications.filter((c) => c.timeline_featured && c.issue_date && !c.parent_certification).map((c) => ({
    id: `cert-${c.id}`, category: 'certification', date: c.issue_date,
    title: c.title, description: c.issuer || '',
    is_milestone: false, related_entity_type: 'Certification', related_entity_id: c.id, related_path: '/certifications',
  }));
}

function fromWork() {
  return work.filter((w) => w.timeline_featured && w.date).map((w) => ({
    id: `work-${w.id}`, category: 'project', date: w.date, date_display: w.timeline_date_display,
    title: w.timeline_title || w.title, description: w.timeline_description || w.tagline || '',
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

/** Curated timeline: flagged derived events + the hand-authored one-off milestones. */
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
