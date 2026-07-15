import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from '@/lib/ThemeContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Marketing from './pages/Marketing';
import AssetGroupDetail from './pages/AssetGroupDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Photography from './pages/Photography';
import Experience from './pages/Experience';
import ExperienceDetail from './pages/ExperienceDetail';
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

// Layout for public site
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<WorkDetail />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/marketing/:id" element={<AssetGroupDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/experience/:id" element={<ExperienceDetail />} />
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
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  )
}

export default App
