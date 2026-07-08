import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import * as Sections from './sections';

const sectionRenderers = {
  hero: HeroSection,
  text: Sections.TextSection,
  markdown: Sections.MarkdownSection,
  cards: Sections.CardsSection,
  gallery: Sections.GallerySection,
  timeline: Sections.TimelineSection,
  statistics: Sections.StatisticsSection,
  testimonials: Sections.TestimonialsSection,
  cta: Sections.CTASection,
  video: Sections.VideoSection,
  faq: Sections.FAQSection,
  quote: Sections.QuoteSection,
  newsletter: Sections.NewsletterSection,
  embed: Sections.CustomEmbedSection,
  'featured-work': Sections.FeaturedWorkSection,
  'blog-list': Sections.BlogListSection,
  'work-list': Sections.WorkListSection,
  'leadership-spotlight': Sections.LeadershipSpotlightSection,
};

/**
 * PageRenderer — fetches a Page entity by slug and renders its CMS-assembled sections.
 * This is the core of the CMS-driven page system.
 */
export default function PageRenderer({ slug }) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const pages = await base44.entities.Page.filter({ slug, status: 'published' }, 'order', 1);
        if (pages[0]) setPage(pages[0]);
      } catch (e) {
        console.error('Failed to load page:', e);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">Page not found</h1>
          <p className="text-muted-foreground">This page hasn't been created in the CMS yet.</p>
        </div>
      </div>
    );
  }

  const sections = (page.sections || []).filter((s) => s.is_visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Render hero section if defined, otherwise fall back to HeroSection component */}
      {page.hero_section && <HeroSection config={page.hero_section} page={page} />}

      {sections.map((section) => {
        const Renderer = sectionRenderers[section.type];
        if (!Renderer) return null;
        return <Renderer key={section.id} section={section} config={section.config || {}} page={page} />;
      })}
    </motion.div>
  );
}