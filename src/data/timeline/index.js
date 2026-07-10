import { loadItems, sortByDateDesc } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** Chronological life/career timeline. Add new ones by creating a file in items/. */
export const timeline = sortByDateDesc(loadItems(modules), 'date');

export default timeline;
