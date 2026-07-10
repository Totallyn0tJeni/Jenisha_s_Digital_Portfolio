import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/**
 * Smaller marketing artifacts — individual posts, graphics, posters, one-off
 * content — NOT full campaigns. Full campaigns (e.g. WolfHacks) live in
 * src/data/work/ and are simply filtered onto the Marketing page; they are
 * never duplicated here. See src/data/README.md.
 */
export const marketingContent = sortByOrder(loadItems(modules));

export default marketingContent;
