import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** Paid / formal work experience. Leadership & volunteer roles live in leadership/ instead. */
export const experience = sortByOrder(loadItems(modules));

export const getExperienceById = (id) => experience.find((e) => e.id === id);

export default experience;
