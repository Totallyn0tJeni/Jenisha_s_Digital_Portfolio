import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Command } from 'lucide-react';
import LogoPlaceholder from './LogoPlaceholder';
import ThemeToggle from './ThemeToggle';
import SocialIcons from './SocialIcons';
import { useSiteSettings, useNavigation } from '@/hooks/useSiteSettings';

export default function Navbar({ onCommandOpen }) {
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { main } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navItems = main.length > 0 ? main : [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'UGC', path: '/ugc' },
    { label: 'Photography', path: '/photography' },
    { label: 'Experience', path: '/experience' },
    { label: 'Leadership', path: '/leadership' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 px-4"
      >
        <nav className={`max-w-5xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-soft' : 'glass'
        }`}>
          <LogoPlaceholder logoUrl={settings?.logo_url} siteName={settings?.site_name} size="sm" />

          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((link) => {
              const active = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full ${
                    active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onCommandOpen}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-premium"
              aria-label="Search"
            >
              <Command className="w-3.5 h-3.5" />
              <kbd className="text-[10px] font-mono">⌘K</kbd>
            </button>
            <div className="hidden xl:flex items-center mr-1">
              <SocialIcons settings={settings} size="sm" />
            </div>
            <ThemeToggle variant="icon" />
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium"
            >
              Connect
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-surface-elevated shadow-soft flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <LogoPlaceholder logoUrl={settings?.logo_url} siteName={settings?.site_name} size="sm" />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-4 py-4 overflow-y-auto scrollbar-hide">
                {navItems.map((link, i) => {
                  const active = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <Link
                        to={link.path}
                        className={`block py-3 px-4 text-xl font-display font-semibold rounded-xl transition-premium ${
                          active ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-primary/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-auto p-4 border-t border-border space-y-4">
                <SocialIcons settings={settings} size="md" className="justify-center" />
                <button
                  onClick={() => { onCommandOpen(); setMobileOpen(false); }}
                  className="w-full flex items-center gap-2 py-2.5 px-4 rounded-xl text-sm text-muted-foreground hover:bg-primary/5"
                >
                  <Command className="w-4 h-4" /> Search
                </button>
                <Link
                  to="/contact"
                  className="block text-center py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base"
                >
                  Let's Connect
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}