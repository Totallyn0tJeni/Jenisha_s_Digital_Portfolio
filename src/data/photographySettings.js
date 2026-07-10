// Structured, editable config for the Photography page's service/pricing sections.
// Actual photos live in src/data/photos/ instead — this file is the page's copy,
// services, equipment, and pricing.

export const photographySettings = {
  hero_title: 'Photography',
  hero_subtitle:
    'Event, portrait, product, and STEM/marketing photography — shot with an eye for the story behind the moment, not just the moment itself.',

  categories: ['Events', 'Portraits', 'Product', 'Creative', 'STEM/Technology', 'Marketing Photography'],

  services: [
    { title: 'Event Coverage', description: 'Full-day or hourly coverage for competitions, hackathons, conferences, and community events.' },
    { title: 'Portraits', description: 'Individual and group portraits — headshots, team photos, and personal branding sessions.' },
    { title: 'Product Photography', description: 'Clean, styled product shots for marketing, e-commerce, and social content.' },
    { title: 'STEM & Marketing Photography', description: 'Documentation of robotics competitions, hackathons, and STEM events for sponsor decks, recap content, and marketing materials.' },
  ],

  equipment: ['Mirrorless camera body + prime & zoom lenses', 'On-camera and off-camera flash', 'Reflectors & portable lighting', 'Gimbal / stabilizer for video-adjacent shoots'],

  editing_process: [
    { step: 'Culling', description: 'Every shoot is culled down to the strongest, most usable frames within 24–48 hours.' },
    { step: 'Colour & Light', description: 'Consistent colour grading and exposure correction across the full set.' },
    { step: 'Retouching', description: 'Light retouching for portraits; product shots get full background/detail cleanup.' },
    { step: 'Delivery', description: 'Final gallery delivered via a shareable online link, full resolution.' },
  ],

  packages: [
    { name: 'Mini Session', price: '', details: '30 minutes · 10 edited photos' },
    { name: 'Standard Session', price: '', details: '90 minutes · full edited gallery' },
    { name: 'Event Coverage', price: '', details: 'Hourly rate · full-day options available' },
    { name: 'Brand / Product Photography', price: '', details: 'Custom package based on scope' },
  ],

  booking_info:
    'Sessions are booked on a first-come, first-served basis — reach out with your date, location, and what you need covered, and I\u2019ll confirm availability within 48 hours.',

  availability: 'Currently booking event coverage and portrait sessions in the Greater Toronto Area, with travel available for larger events.',

  faq: [
    { question: "What's your turnaround time?", answer: 'Standard galleries are delivered within 1–2 weeks. Rush delivery available on request.' },
    { question: 'Do you travel for shoots?', answer: 'Yes — based in Brampton/GTA, travel available for events and sessions further out (fees may apply).' },
    { question: 'Can I get raw, unedited files?', answer: 'Raw files are available as an add-on for brand/product and event packages.' },
  ],
};

export default photographySettings;
