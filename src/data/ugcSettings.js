// Structured, editable config for the UGC Creator page (src/pages/UGC.jsx).
// Actual portfolio pieces (finished videos/photos) live in src/data/ugc/ instead —
// this file is just the page's copy, services, and pricing.

export const ugcSettings = {
  hero_title: 'UGC Creator Portfolio',
  hero_subtitle:
    'Authentic, scroll-stopping content for brands in beauty, tech, and everything between — created by someone who already thinks like their audience.',

  about:
    "I create user-generated content that feels native to the platform it's on — not like an ad. Background in marketing strategy, photography, videography, and event promotion means every piece is shot, framed, and captioned with a brand's actual goals in mind, not just aesthetics.",

  niches: [
    { name: 'Beauty', icon: 'Sparkles' },
    { name: 'Skincare', icon: 'Droplet' },
    { name: 'Makeup', icon: 'Palette' },
    { name: 'Fashion & Apparel', icon: 'Shirt' },
    { name: 'Technology', icon: 'Cpu' },
    { name: 'Apps & Productivity', icon: 'Smartphone' },
  ],

  services: [
    { title: 'UGC Video Content', description: 'Short-form video content shot and edited for TikTok, Instagram Reels, and YouTube Shorts.' },
    { title: 'Product Photography', description: 'Clean, on-brand product photography for listings, ads, and social content.' },
    { title: 'Unboxings & First Impressions', description: 'Authentic first-look content that mirrors how a real customer discovers a product.' },
    { title: 'Testimonial-Style Content', description: 'Talking-head, testimonial-format videos that build trust and social proof.' },
    { title: 'Hooks & Variations', description: 'Multiple hook/opening variations of the same content for A/B testing ad creative.' },
  ],

  content_types: ['Talking-head video', 'Unboxing', 'Tutorial / How-to', 'Testimonial', 'Day-in-the-life integration', 'Before & after', 'Product photography', 'Trend / meme-format content'],

  packages: [
    {
      name: 'Starter',
      price: '',
      features: ['1 UGC video', 'Basic editing (cuts, captions, music)', 'Raw clips included'],
    },
    {
      name: 'Growth',
      price: '',
      features: ['Multiple videos', 'Photo set included', 'Hook variations for ad testing', 'Advanced editing & captions'],
    },
    {
      name: 'Premium',
      price: '',
      features: ['Full campaign package', 'Multiple videos + photography', 'Extended usage rights', 'Priority turnaround'],
    },
  ],

  retainers: [
    { name: 'Monthly Retainer', price: '', features: ['Ongoing monthly content batch', 'Priority scheduling', 'Discounted per-piece rate'] },
  ],

  addons: [
    { name: 'Extended usage rights (paid ads)', price: '' },
    { name: 'Rush turnaround (48hr)', price: '' },
    { name: 'Additional hook variation', price: '' },
    { name: 'Raw footage license', price: '' },
  ],

  usage_rights:
    'Standard packages include organic (non-paid) usage rights for 6 months. Extended usage rights for paid advertising are available as an add-on — reach out to discuss scope and duration.',

  turnaround_time: 'Standard turnaround is 5–7 business days from content shoot to final delivery. Rush delivery available as an add-on.',

  faq: [
    { question: 'Do you ship products for review?', answer: "Yes — for beauty, skincare, tech, and apparel niches I'm happy to receive physical products. For app/productivity content, screen-recording and account access work great too." },
    { question: 'Can I use the content in paid ads?', answer: 'Organic usage is included by default. Paid usage rights are available as an add-on — let\u2019s talk about scope.' },
    { question: 'Do you provide raw, unedited clips?', answer: 'Raw clips are included with the Starter package and above. Full raw footage licensing is available as an add-on.' },
    { question: 'How far in advance should I book?', answer: 'Standard turnaround is 5–7 business days; for launches or campaigns, 2–3 weeks lead time is ideal.' },
  ],
};

export default ugcSettings;
