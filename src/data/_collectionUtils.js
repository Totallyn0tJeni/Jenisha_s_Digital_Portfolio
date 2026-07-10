/**
 * Shared helpers for folder-based content collections (work/, blog/,
 * certifications/, awards/, leadership/, photos/, organizations/, experience/).
 *
 * Each collection folder has:
 *   items/*.js   — one file per entry, `export default { ...fields }`
 *   index.js     — aggregates the folder with import.meta.glob and re-exports
 *                  a sorted array plus small helper selectors.
 *
 * To add a new entry to any collection: create a new file in that
 * collection's items/ folder (any filename) and export a default object.
 * No other file needs to change.
 */

export function loadItems(globModules) {
  return Object.values(globModules)
    .map((mod) => mod.default)
    .filter(Boolean);
}

export function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function sortByDateDesc(items, field = 'date') {
  return [...items].sort((a, b) => new Date(b[field] || 0) - new Date(a[field] || 0));
}
