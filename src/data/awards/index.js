import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** All awards & recognitions. Add new ones by creating a file in items/. */
export const awards = sortByOrder(loadItems(modules));

export default awards;
