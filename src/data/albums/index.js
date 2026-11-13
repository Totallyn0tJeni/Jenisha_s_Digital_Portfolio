import { loadItems, sortByOrder } from "../_collectionUtils";

const modules = import.meta.glob("./items/*.js", { eager: true });

export const albumsData = sortByOrder(loadItems(modules));
export default albumsData;
