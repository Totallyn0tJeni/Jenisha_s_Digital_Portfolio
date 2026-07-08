import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, FileText, Briefcase, Image, Award, Mail, Users,
  LogOut, Menu, X, ExternalLink, Calendar, Building2, Heart, GraduationCap,
  Trophy, Star, FolderOpen, Settings, Search, FileDown, BookOpen, Type, Globe, Sparkle
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import LogoPlaceholder from './LogoPlaceholder';
import ThemeToggle from './ThemeToggle';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const sidebarLinks = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { section: 'Content' },
  { label: 'Pages', path: '/admin/pages', icon: FileText },
  { label: 'Navigation', path: '/admin/navigation', icon: Type },
  { label: 'Work', path: '/admin/work', icon: Briefcase },
  { label: 'UGC Content', path: '/admin/ugc', icon: Sparkle },
  { label: 'Blog', path: '/admin/blog', icon: BookOpen },
  { label: 'Photography', path: '/admin/photography', icon: Image },
  { section: 'Career' },
  { label: 'Experience', path: '/admin/experience', icon: Briefcase },
  { label: 'Leadership', path: '/admin/leadership', icon: Users },
  { label: 'Organizations', path: '/admin/organizations', icon: Building2 },
  { label: 'Volunteer', path: '/admin/volunteer', icon: Heart },
  { label: 'General Membership', path: '/admin/general-membership', icon: Users },
  { label: 'Timeline', path: '/admin/timeline', icon: Calendar },
  { section: 'Achievements' },
  { label: 'Awards', path: '/admin/awards', icon: Trophy },
  { label: 'Certifications', path: '/admin/certifications', icon: Award },
  { label: 'Education', path: '/admin/education', icon: GraduationCap },
  { label: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { label: 'Resources', path: '/admin/resources', icon: BookOpen },
  { section: 'System' },
  { label: 'Resume', path: '/admin/resume', icon: FileDown },
  { label: 'Media Library', path: '/admin/media', icon: FolderOpen },
  { label: 'Messages', path: '/admin/messages', icon: Mail },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
  { label: 'Users', path: '/admin/users', icon: Users },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await base44.auth.logout('/');
  };

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-border">
        <LogoPlaceholder logoUrl={settings?.logo_url} siteName={settings?.site_name} size="sm" />
        <p className="text-xs text-muted-foreground mt-2">Admin Dashboard</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {sidebarLinks.map((link, i) => {
          if (link.section) {
            return <p key={i} className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">{link.section}</p>;
          }
          const active = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-premium ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'}`}>
              <link.icon className="w-4 h-4" /> {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border space-y-0.5">
        <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-premium">
          <ExternalLink className="w-4 h-4" /> View Site
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-premium">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-surface/30 fixed h-screen z-30">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="w-64 h-full bg-surface-elevated border-r border-border flex flex-col" onClick={(e) => e.stopPropagation()}>
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-64">
        <header className="flex items-center justify-between p-4 border-b border-border bg-surface/30 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground"><Menu className="w-5 h-5" /></button>
          <Link to="/" className="lg:hidden font-display font-bold text-lg text-foreground">{settings?.site_name?.split(' ')[0] || 'Admin'}</Link>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/search')} className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-premium">
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle variant="icon" />
          </div>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}