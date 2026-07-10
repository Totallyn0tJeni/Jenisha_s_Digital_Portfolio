// Site navigation. `group` controls where each link shows up:
//   'main'    → primary navbar links
//   'explore' → secondary "Explore" links (footer / command palette)
//   'footer'  → footer-only links
//   'social'  → handled via siteSettings.social_links instead

export const navigationItems = [
  { path: '/', label: 'Home', icon: 'Home', group: 'main', order: 0 },
  { path: '/about', label: 'About', icon: 'User', group: 'main', order: 1 },
  { path: '/work', label: 'Work', icon: 'Briefcase', group: 'main', order: 2 },
  { path: '/blog', label: 'Blog', icon: 'FileText', group: 'main', order: 3 },
  { path: '/photography', label: 'Photography', icon: 'Camera', group: 'main', order: 4 },
  { path: '/experience', label: 'Experience', icon: 'Briefcase', group: 'main', order: 5 },
  { path: '/contact', label: 'Contact', icon: 'Mail', group: 'main', order: 9 },

  { path: '/leadership', label: 'Leadership', icon: 'Users', group: 'explore', order: 5.5 },
  { path: '/timeline', label: 'Timeline', icon: 'Calendar', group: 'explore', order: 6 },
  { path: '/awards', label: 'Awards', icon: 'Trophy', group: 'explore', order: 7 },
  { path: '/organizations', label: 'Organizations', icon: 'Building2', group: 'explore', order: 8 },
];

export const mainNav = navigationItems.filter((i) => i.group === 'main').sort((a, b) => a.order - b.order);
export const exploreNav = navigationItems.filter((i) => i.group === 'explore').sort((a, b) => a.order - b.order);

export default navigationItems;
