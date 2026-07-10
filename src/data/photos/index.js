import { loadItems, sortByOrder } from '../_collectionUtils';

const modules = import.meta.glob('./items/*.js', { eager: true });

/** Photography portfolio. Add new photos by creating a file in items/. */
export const photos = sortByOrder(loadItems(modules));

export const getPhotosByCategory = (category) =>
  category ? photos.filter((p) => p.category === category) : photos;

export default photos;
