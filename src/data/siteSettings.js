// Global site copy & settings.
// Edit these values directly — this replaces the old Base44 "SiteSettings" entity.

export const siteSettings = {
  site_name: 'Jenisha Patel',
  tagline: 'Computer Science Co-op Student · Class of 2030',
  description:
    "I'm a first-year Computer Science Co-op student at McMaster University with a habit of saying yes to too many things — and making them work anyway. Across robotics, marketing, and STEM outreach, I've learned that good leadership and good code follow the same rule: understand the real problem before you touch the solution.",

  logo_url: '',
  favicon_url: '',
  hero_image_url: '"C:\\Users\\Patel\\Downloads\\Jenisha_s_Digital_Portfolio\\0955be6b-295b-4266-b653-5ec6efeafc61.png"',
  resume_pdf_url: '"C:\\Users\\Patel\\Downloads\\Jenisha_s_Digital_Portfolio\\Jenisha\'s Resume 2026 - Condensed V1.pdf"',
  theme_default: 'system',

  hero_title: 'Driven by curiosity. Focused on impact.',
  hero_subtitle:
    'I build software, lead teams, capture stories, and turn STEM communities into places people want to show up for — from robotics pits to hackathon stages to code editors.',
  hero_cta_primary: { label: 'Explore Work', link: '/work' },
  hero_cta_secondary: { label: 'Get in Touch', link: '/contact' },

  about_hero_title: 'The story behind the résumé',
  about_hero_subtitle:
    "A closer look at how a robotics pit, a marketing deck, and a code editor all somehow became the same job.",
  about_bio: `I'm Jenisha — a first-year Computer Science Co-op student at McMaster University, working toward an Honours Bachelor of Applied Science with a minor in Innovation. Before university, I spent four years at Chinguacousy Secondary School stacking up leadership roles the way other people collect course credits: one led to the next, and eventually there were more executive titles than could fit on a single résumé page.

  My throughline is communication — figuring out how to make something complicated (a robot's scouting data, a hackathon's brand system, a home automation dashboard) legible to the people who actually have to use it. That's shown up as marketing direction for a FIRST Robotics team, board-level governance for a youth business nonprofit, and, increasingly, as code.

  Outside of the résumé: I'm usually the one holding the camera at team events, not just posing for them.`,

  quick_facts: [
    { label: 'Studying', value: 'Computer Science 1 (Co-op), McMaster University' },
    { label: 'Based in', value: 'Brampton, Ontario, Canada' },
    { label: 'Currently', value: 'Marketing & Communications Specialist, Zebra Robotics' },
    { label: 'Focus areas', value: 'Full-stack development, marketing strategy, STEM outreach' },
  ],

  principles: [
    {
      icon: 'Search',
      title: 'Understand before you build',
      description:
        "Every project here started with a real, specific problem — a scouting spreadsheet nobody could read, a hackathon nobody had heard of. Design comes second.",
    },
    {
      icon: 'Users',
      title: 'Leadership is logistics',
      description:
        "The unglamorous parts — the delegation doc, the onboarding checklist, the content calendar — are usually what actually makes a team work.",
    },
    {
      icon: 'Camera',
      title: 'Show your work',
      description:
        "Documentation isn't an afterthought. If I build it, I photograph it, write it up, and make sure the next person can pick it up.",
    },
    {
      icon: 'TrendingUp',
      title: 'Say yes, then figure it out',
      description:
        "Most of what's on this site started as something I hadn't done before — a new codebase, a new event format, a new leadership title.",
    },
  ],

  stats: [
    { icon: 'Briefcase', value: '10+', label: 'Organizations' },
    { icon: 'Users', value: '20+', label: 'Executive Titles' },
    { icon: 'Heart', value: '1000+', label: 'Volunteer Hours' },
    { icon: 'Trophy', value: '15+', label: 'Awards' },
  ],
  secondary_stats: [
    { value: '3+', label: 'Years Coding' },
    { value: '5+', label: 'Hackathons' },
    { value: '15+', label: 'Languages & Tools' },
    { value: '50+', label: 'Events Participated' },
  ],

  footer_cta_title: "Let's build something meaningful together.",
  footer_cta_subtitle: "I'm always open to new opportunities, collaborations, and conversations.",
  footer_text: 'Built with intention.',

  currently: {
    studying:
        "Computer Science Co-op @ McMaster University",

    building:
        "Personal Productivity Platform",

    working:
        "Marketing & Communications Specialist @ Zebra Robotics",

    learning:
        "Next.js, AI Agents, System Design"
  },

  social_links: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jenisha-patel18' },
    { platform: 'GitHub', url: 'https://github.com/Totallyn0tJeni' },
    { platform: 'Instagram', url: 'https://www.instagram.com/jenisha_ptl08/' },
    { platform: 'TikTok', url: 'https://www.tiktok.com/@tottallyn0t_jeni' },
    { platform: 'VSCO', url: 'https://vsco.co/tottalyn0tjeni/gallery' },
    { platform: 'YouTube', url: 'https://www.youtube.com/@tottallyn0tjeni' },
  ],

  // Contact email used by the Contact page (mailto fallback — no backend to store messages anymore).
  contact_email: 'jeni.1245690@gmail.com',
  mcmaster_email: 'patej191@mcmaster.ca',
  contact_phone: '(437) 424-4413',
  contact_location: 'Brampton, ON, Canada',
};

export default siteSettings;
