import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** All certifications, grouped by `category` on the Certifications page. */
export const certifications = sortByOrder(loadItems(modules));

export const getCertificationsByCategory = () =>
  certifications.reduce((acc, c) => {
    const key = c.category || 'Other';
    (acc[key] ||= []).push(c);
    return acc;
  }, {});

export default certifications;
