import { Github, Linkedin, Instagram, Youtube, Twitter, Mail, Globe } from 'lucide-react';

/** Custom TikTok icon (lucide-react doesn't include one) */
function TikTokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.04z" />
    </svg>
  );
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: TikTokIcon,
  youtube: Youtube,
  twitter: Twitter,
  x: Twitter,
  email: Mail,
  mail: Mail,
};

function resolveIcon(link) {
  const key = (link.platform || link.icon || '').toLowerCase().replace(/[^a-z]/g, '');
  return iconMap[key] || Globe;
}

/**
 * Renders social icon links from SiteSettings.social_links.
 * Hides entries without a URL. Pulls dynamically from settings.
 */
export default function SocialIcons({ settings, size = 'md', className = '' }) {
  const links = (settings?.social_links || []).filter((s) => s.url && s.url.trim());
  if (links.length === 0) return null;

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {links.map((link, i) => {
        const Icon = resolveIcon(link);
        const isExternal = link.url.startsWith('http');
        return (
          <a
            key={i}
            href={link.url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={`${sizes[size]} rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-premium`}
            aria-label={link.platform || 'Social link'}
          >
            <Icon className={iconSizes[size]} />
          </a>
        );
      })}
    </div>
  );
}