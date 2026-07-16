/**
 * Single source of truth for every date-related computation in the app:
 * formatting, "Present" / current-role handling, durations, relative time,
 * sorting, and timeline year-grouping.
 *
 * Nothing else should call `new Date(...).toLocaleDateString(...)` directly —
 * import from here instead so formatting stays consistent and only needs to
 * change in one place.
 */

/** "2024-06" | "2024-06-01" -> Date (safe for both YYYY-MM and full ISO strings). */
function toDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr.length === 7 ? `${dateStr}-01` : dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "Jun 2024" */
export function formatMonthYear(dateStr) {
  const d = toDate(dateStr);
  return d ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
}

/** "June 12, 2024" */
export function formatFullDate(dateStr) {
  const d = toDate(dateStr);
  return d ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
}

/** "Jun 12, 2024" — compact full date, used by Timeline cards. */
export function formatShortDate(dateStr) {
  const d = toDate(dateStr);
  return d ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
}

/** "2024" */
export function formatYear(dateStr) {
  const d = toDate(dateStr);
  return d ? String(d.getFullYear()) : '';
}

/**
 * Standard "role/experience" date range, honoring `is_current`:
 * "Jun 2023 – Present" | "Jun 2023 – Aug 2024" | "Jun 2023"
 */
export function formatDateRange(startDate, endDate, isCurrent) {
  const start = formatMonthYear(startDate);
  if (!start) return '';
  if (isCurrent) return `${start} – Present`;
  const end = formatMonthYear(endDate);
  return end ? `${start} – ${end}` : start;
}

/** Duration in whole months between two dates (or start -> now if current). */
export function durationInMonths(startDate, endDate, isCurrent) {
  const start = toDate(startDate);
  if (!start) return 0;
  const end = isCurrent ? new Date() : (toDate(endDate) || new Date());
  return Math.max(
    0,
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  );
}

/** 14 -> "1 yr 2 mos"; 5 -> "5 mos"; 24 -> "2 yrs" */
export function formatDuration(startDate, endDate, isCurrent) {
  const months = durationInMonths(startDate, endDate, isCurrent);
  if (months <= 0) return '';
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (remMonths > 0) parts.push(`${remMonths} ${remMonths === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ') || '< 1 mo';
}

/** "3 days ago" | "2 months ago" | "1 year ago" | "Today" */
export function formatRelative(dateStr) {
  const d = toDate(dateStr);
  if (!d) return '';
  const diffMs = Date.now() - d.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  const diffYears = Math.round(diffMonths / 12);
  return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
}

/** Numeric sort key: current items sort as "now" so they lead a descending sort. */
export function sortKey(item) {
  if (item.is_current) return Number.MAX_SAFE_INTEGER;
  const d = toDate(item.end_date || item.date || item.issue_date || item.start_date);
  return d ? d.getTime() : 0;
}

/** Sort a list of dated items newest-first, current items always leading. */
export function sortByRecency(items) {
  return [...items].sort((a, b) => sortKey(b) - sortKey(a));
}

/** Group dated items by year: { 2024: [...], 2023: [...] }, keys descending. */
export function groupByYear(items, dateField = 'date') {
  const groups = {};
  for (const item of items) {
    const d = toDate(item[dateField] || item.start_date);
    const year = d ? d.getFullYear() : 'Undated';
    (groups[year] ||= []).push(item);
  }
  return Object.fromEntries(
    Object.entries(groups).sort(([a], [b]) => (b === 'Undated' ? -1 : a === 'Undated' ? 1 : b - a))
  );
}

/** All distinct years present across one or more dated collections, descending. */
export function getAllYears(...collections) {
  const years = new Set();
  for (const collection of collections) {
    for (const item of collection) {
      const d = toDate(item.date || item.start_date || item.issue_date);
      if (d) years.add(d.getFullYear());
    }
  }
  return [...years].sort((a, b) => b - a);
}

export default {
  formatMonthYear,
  formatFullDate,
  formatShortDate,
  formatYear,
  formatDateRange,
  durationInMonths,
  formatDuration,
  formatRelative,
  sortKey,
  sortByRecency,
  groupByYear,
  getAllYears,
};
