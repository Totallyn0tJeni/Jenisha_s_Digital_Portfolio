import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** Short-form org strip shown on the Home page. Add new ones by creating a file in items/. */
export const organizations = sortByOrder(loadItems(modules));

export default organizations;
