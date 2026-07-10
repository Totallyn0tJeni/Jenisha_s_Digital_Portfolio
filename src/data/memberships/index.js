import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** Lighter-weight club/committee/team memberships (see leadership/ for executive roles). */
export const memberships = sortByOrder(loadItems(modules));

export default memberships;
