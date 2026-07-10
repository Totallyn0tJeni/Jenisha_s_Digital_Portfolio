import { loadItems, sortByDateDesc } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** All blog posts, newest first. Add new ones by creating a file in items/. */
export const blogPosts = sortByDateDesc(loadItems(modules), 'published_date');

export const getPostById = (id) => blogPosts.find((p) => p.id === id || p.slug === id);
export const getPostsByCategory = (category) => blogPosts.filter((p) => p.category === category);

export default blogPosts;
