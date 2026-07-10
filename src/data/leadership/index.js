import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** Leadership / executive roles. Add new ones by creating a file in items/. */
export const leadership = sortByOrder(loadItems(modules));

export default leadership;
