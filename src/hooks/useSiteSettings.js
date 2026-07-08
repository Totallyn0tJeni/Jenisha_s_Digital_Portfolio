import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Fetches global site settings (single record).
 * Caches in module-level state to avoid redundant calls across components.
 */
let cachedSettings = null;

export function useSiteSettings() {
  const [settings, setSettings] = useState(cachedSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) return;
    (async () => {
      try {
        const items = await base44.entities.SiteSettings.list('-updated_date', 1);
        if (items[0]) {
          cachedSettings = items[0];
          setSettings(items[0]);
        }
      } catch (e) {
        console.error('Failed to load site settings:', e);
      }
      setLoading(false);
    })();
  }, []);

  return { settings, loading };
}

/**
 * Fetches visible navigation items grouped by category.
 */
export function useNavigation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await base44.entities.NavigationItem.list('order', 100);
        const visible = all.filter((i) => i.is_visible);
        setItems(visible);
      } catch (e) {
        console.error('Failed to load navigation:', e);
      }
      setLoading(false);
    })();
  }, []);

  return {
    items,
    main: items.filter((i) => i.group === 'main'),
    explore: items.filter((i) => i.group === 'explore'),
    footer: items.filter((i) => i.group === 'footer'),
    social: items.filter((i) => i.group === 'social'),
    loading,
  };
}