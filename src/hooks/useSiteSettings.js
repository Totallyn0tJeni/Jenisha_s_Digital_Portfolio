import { siteSettings } from '@/data/siteSettings';
import { navigationItems } from '@/data/navigation';

/**
 * Returns global site settings (bio, hero copy, social links, etc).
 * Data lives in src/data/siteSettings.js — edit that file to update site-wide copy.
 */
export function useSiteSettings() {
  return { settings: siteSettings, loading: false };
}

/**
 * Returns navigation items grouped by category.
 * Data lives in src/data/navigation.js.
 */
export function useNavigation() {
  const items = navigationItems;
  return {
    items,
    main: items.filter((i) => i.group === 'main').sort((a, b) => a.order - b.order),
    explore: items.filter((i) => i.group === 'explore').sort((a, b) => a.order - b.order),
    footer: items.filter((i) => i.group === 'footer').sort((a, b) => a.order - b.order),
    social: items.filter((i) => i.group === 'social').sort((a, b) => a.order - b.order),
    loading: false,
  };
}
