import { getContentForOrganization } from './relationshipEngine';
import {
  timelineEvents,
  getTimelineEventById,
  getTimelineEventIdForRole,
  getTimelineEventIdForWork,
  getTimelineEventIdForAward,
  getTimelineEventIdForCertification,
} from '@/data/timelineEvents';

/**
 * Everything an Organization page needs: the full aggregated content
 * (already grouped by type via the relationship engine) plus dynamically
 * calculated stats. Nothing here is hand-entered per organization — add a
 * role/project/award with a matching organization string and this updates
 * automatically.
 */
export function getOrganizationAggregation(orgId) {
  const grouped = getContentForOrganization(orgId);

  const roles = [...(grouped.experience || []), ...(grouped.leadership || [])];
  const rolesRaw = roles.map((r) => r.raw);

  const startDates = rolesRaw.map((r) => r.start_date).filter(Boolean).map((d) => new Date(d));
  const isAnyCurrent = rolesRaw.some((r) => r.is_current);
  const endDates = rolesRaw
    .filter((r) => !r.is_current)
    .map((r) => r.end_date)
    .filter(Boolean)
    .map((d) => new Date(d));

  let yearsInvolved = null;
  if (startDates.length > 0) {
    const earliest = new Date(Math.min(...startDates.map((d) => d.getTime())));
    const latest = isAnyCurrent ? new Date() : (endDates.length > 0 ? new Date(Math.max(...endDates.map((d) => d.getTime()))) : new Date());
    const years = latest.getFullYear() - earliest.getFullYear() + (isAnyCurrent ? 1 : 0);
    yearsInvolved = { from: earliest.getFullYear(), to: isAnyCurrent ? 'Present' : latest.getFullYear(), span: Math.max(1, years) };
  }

  const mediaAssetCount = (grouped.marketing || []).reduce((sum, m) => sum + (m.raw?.count || 1), 0);

  // Derive this org's timeline events from the same underlying role/work/award/certification ids —
  // no separate organization field needed on timeline events themselves.
  const timelineIds = new Set();
  for (const r of grouped.experience || []) timelineIds.add(getTimelineEventIdForRole('experience', r.id));
  for (const r of grouped.leadership || []) timelineIds.add(getTimelineEventIdForRole('leadership', r.id));
  for (const w of grouped.work || []) timelineIds.add(getTimelineEventIdForWork(w.id));
  for (const a of grouped.awards || []) timelineIds.add(getTimelineEventIdForAward(a.id));
  for (const c of grouped.certifications || []) timelineIds.add(getTimelineEventIdForCertification(c.id));
  const orgTimelineEvents = [...timelineIds]
    .map(getTimelineEventById)
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const stats = [
    { label: 'Roles', value: roles.length },
    { label: 'Years Involved', value: yearsInvolved ? (yearsInvolved.to === 'Present' ? `${yearsInvolved.from}–Present` : `${yearsInvolved.span}`) : '—' },
    { label: 'Projects', value: (grouped.work || []).length },
    { label: 'Campaigns', value: (grouped.marketing || []).length },
    { label: 'Awards', value: (grouped.awards || []).length },
    { label: 'Certifications', value: (grouped.certifications || []).length },
    { label: 'Blog Posts', value: (grouped.blog || []).length },
    { label: 'Media Assets', value: mediaAssetCount },
    { label: 'Timeline Events', value: orgTimelineEvents.length },
  ].filter((s) => s.value && s.value !== '0' && s.value !== 0 || s.label === 'Years Involved');

  return { grouped, stats, timelineEvents: orgTimelineEvents, roles };
}

export default getOrganizationAggregation;
