import { Link } from 'react-router-dom';
import { ArrowUp, FileDown } from 'lucide-react';
import { useSiteSettings, useNavigation } from '@/hooks/useSiteSettings';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const { settings } = useSiteSettings();
  const { main, explore } = useNavigation();

  const navGroups = [
    { title: 'Navigate', items: main.length > 0 ? main : [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Work', path: '/work' },
      { label: 'Contact', path: '/contact' },
    ]},
    { title: 'Explore', items: explore.length > 0 ? explore : [
      { label: 'UGC', path: '/ugc' },
      { label: 'Blog', path: '/blog' },
      { label: 'Photography', path: '/photography' },
      { label: 'Experience', path: '/experience' },
      { label: 'Awards', path: '/awards' },
      { label: 'Timeline', path: '/timeline' },
    ]},
  ];

  return (
    <footer className="relative z-10 border-t border-border mt-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-2xl text-foreground mb-4">
              {settings?.site_name || 'Jenisha Patel'}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {settings?.tagline || 'Building at the intersection of technology, leadership & creative impact.'}
            </p>
            <div className="mt-6 space-y-4">
              <div className="space-y-1">
                {settings?.contact_email && (
                  <a href={`mailto:${settings.contact_email}`} className="block text-sm text-muted-foreground hover:text-primary transition-premium">{settings.contact_email}</a>
                )}
                {settings?.contact_phone && (
                  <a href={`tel:${settings.contact_phone.replace(/[^\d+]/g, '')}`} className="block text-sm text-muted-foreground hover:text-primary transition-premium">{settings.contact_phone}</a>
                )}
              </div>
              <SocialIcons settings={settings} size="md" />
              {settings?.resume_pdf_url && (
                <a href={settings.resume_pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm glass text-foreground hover:border-primary/30 transition-premium">
                  <FileDown className="w-4 h-4" /> Download Résumé
                </a>
              )}
            </div>
          </div>

          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.items.map((link) => (
                  <li key={link.path}>
                    {link.is_external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-premium">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-premium">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings?.site_name || 'Jenisha Patel'}. {settings?.footer_text || 'All rights reserved.'}
          </p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-premium"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}