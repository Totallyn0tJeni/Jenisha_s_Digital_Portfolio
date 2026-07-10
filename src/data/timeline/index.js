import { loadItems, sortByDateDesc } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/**
 * Hand-authored, one-off timeline milestones only — things with no natural
 * home in another collection (education/experience/leadership/awards/
 * certifications/work). Most timeline content is auto-derived instead; see
 * src/data/timelineEvents.js, which is what the Timeline page actually uses.
 */
export const timeline = sortByDateDesc(loadItems(modules), 'date');

export default timeline;
