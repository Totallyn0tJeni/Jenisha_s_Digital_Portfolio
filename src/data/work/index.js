import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** All projects/case studies, sorted by `order`. Add new ones by creating a file in items/. */
export const work = sortByOrder(loadItems(modules));

export const featuredWork = work.filter((w) => w.featured);
export const getWorkById = (id) => work.find((w) => w.id === id || w.slug === id);

export default work;
