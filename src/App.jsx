import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ThemeProvider } from '@/lib/ThemeContext';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Photography from './pages/Photography';
import Experience from './pages/Experience';
import Leadership from './pages/Leadership';
import Organizations from './pages/Organizations';
import Volunteer from './pages/Volunteer';
import Speaking from './pages/Speaking';
import Awards from './pages/Awards';
import Certifications from './pages/Certifications';
import Education from './pages/Education';
import Timeline from './pages/Timeline';
import CV from './pages/CV';
import Resume from './pages/Resume';
import Resources from './pages/Resources';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Search from './pages/Search';
import UGC from './pages/UGC';
import DynamicPage from './pages/DynamicPage';

// Admin pages
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPages from './pages/admin/AdminPages';
import AdminNavigation from './pages/admin/AdminNavigation';
import AdminWork from './pages/admin/AdminWork';
import AdminUGC from './pages/admin/AdminUGC';
import AdminGeneralMembership from './pages/admin/AdminGeneralMembership';
import AdminBlog from './pages/admin/AdminBlog';
import AdminPhotos from './pages/admin/AdminPhotos';
import AdminExperience from './pages/admin/AdminExperience';
import AdminLeadership from './pages/admin/AdminLeadership';
import AdminOrganizations from './pages/admin/AdminOrganizations';
import AdminVolunteer from './pages/admin/AdminVolunteer';
import AdminAwards from './pages/admin/AdminAwards';
import AdminCertifications from './pages/admin/AdminCertifications';
import AdminEducation from './pages/admin/AdminEducation';
import AdminTimeline from './pages/admin/AdminTimeline';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminResources from './pages/admin/AdminResources';
import AdminResume from './pages/admin/AdminResume';
import AdminMedia from './pages/admin/AdminMedia';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';

// Layout for public site
import Layout from './components/Layout';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Public site routes with layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<WorkDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/education" element={<Education />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/ugc" element={<UGC />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/p/:slug" element={<DynamicPage />} />
      </Route>

      {/* Admin routes — protected, admin only */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pages" element={<AdminPages />} />
          <Route path="/admin/navigation" element={<AdminNavigation />} />
          <Route path="/admin/work" element={<AdminWork />} />
          <Route path="/admin/ugc" element={<AdminUGC />} />
          <Route path="/admin/general-membership" element={<AdminGeneralMembership />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/photography" element={<AdminPhotos />} />
          <Route path="/admin/experience" element={<AdminExperience />} />
          <Route path="/admin/leadership" element={<AdminLeadership />} />
          <Route path="/admin/organizations" element={<AdminOrganizations />} />
          <Route path="/admin/volunteer" element={<AdminVolunteer />} />
          <Route path="/admin/awards" element={<AdminAwards />} />
          <Route path="/admin/certifications" element={<AdminCertifications />} />
          <Route path="/admin/education" element={<AdminEducation />} />
          <Route path="/admin/timeline" element={<AdminTimeline />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/resources" element={<AdminResources />} />
          <Route path="/admin/resume" element={<AdminResume />} />
          <Route path="/admin/media" element={<AdminMedia />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App