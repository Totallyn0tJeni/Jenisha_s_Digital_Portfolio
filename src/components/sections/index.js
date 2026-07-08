/**
 * Section Registry — maps section types to their renderer components and admin configs.
 * Adding a new section type = create a renderer + add it here. No core changes needed.
 */
export { default as HeroSection } from './HeroSection';
export { default as TextSection } from './TextSection';
export { default as MarkdownSection } from './MarkdownSection';
export { default as CardsSection } from './CardsSection';
export { default as GallerySection } from './GallerySection';
export { default as TimelineSection } from './TimelineSection';
export { default as StatisticsSection } from './StatisticsSection';
export { default as TestimonialsSection } from './TestimonialsSection';
export { default as CTASection } from './CTASection';
export { default as VideoSection } from './VideoSection';
export { default as FAQSection } from './FAQSection';
export { default as QuoteSection } from './QuoteSection';
export { default as NewsletterSection } from './NewsletterSection';
export { default as CustomEmbedSection } from './CustomEmbedSection';
export { default as FeaturedWorkSection } from './FeaturedWorkSection';
export { default as BlogListSection } from './BlogListSection';
export { default as WorkListSection } from './WorkListSection';
export { default as LeadershipSpotlightSection } from './LeadershipSpotlightSection';

export const SECTION_TYPES = [
  { type: 'hero', label: 'Hero', icon: 'Sparkles', description: 'Large headline with image and CTAs' },
  { type: 'text', label: 'Text', icon: 'Type', description: 'Rich text block' },
  { type: 'markdown', label: 'Markdown', icon: 'FileText', description: 'Markdown content' },
  { type: 'cards', label: 'Cards', icon: 'LayoutGrid', description: 'Grid of cards with icons' },
  { type: 'gallery', label: 'Gallery', icon: 'Images', description: 'Image gallery grid' },
  { type: 'timeline', label: 'Timeline', icon: 'GitCommitVertical', description: 'Chronological events' },
  { type: 'statistics', label: 'Statistics', icon: 'BarChart3', description: 'Animated stat counters' },
  { type: 'testimonials', label: 'Testimonials', icon: 'Quote', description: 'Quote carousel' },
  { type: 'cta', label: 'Call to Action', icon: 'MousePointerClick', description: 'Action banner with button' },
  { type: 'video', label: 'Video', icon: 'Video', description: 'Embedded video player' },
  { type: 'faq', label: 'FAQ', icon: 'HelpCircle', description: 'Accordion Q&A' },
  { type: 'quote', label: 'Quote', icon: 'Quote', description: 'Pull quote' },
  { type: 'newsletter', label: 'Newsletter', icon: 'Mail', description: 'Email signup' },
  { type: 'embed', label: 'Embed', icon: 'Code2', description: 'Custom HTML embed' },
  { type: 'featured-work', label: 'Featured Work', icon: 'Briefcase', description: 'Showcase selected work items' },
  { type: 'blog-list', label: 'Blog List', icon: 'FileText', description: 'Recent blog posts' },
  { type: 'work-list', label: 'Work List', icon: 'Briefcase', description: 'Work items grid' },
  { type: 'leadership-spotlight', label: 'Leadership Spotlight', icon: 'Users', description: 'Featured leadership role' },
];