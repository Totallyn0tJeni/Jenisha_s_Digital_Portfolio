// Skills, grouped into a deeper taxonomy (see README for the category list).
// `icon` is a lucide-react icon name, used where the Skills UI wants one.

export const skills = [
  // ---- Programming Languages ----
  { id: 'skill-python', name: 'Python', category: 'Programming Languages', icon: 'Code2', months_experience: 18, order: 0 },
  { id: 'skill-html-css', name: 'HTML & CSS', category: 'Programming Languages', icon: 'Code2', months_experience: 16, order: 1 },
  { id: 'skill-javascript', name: 'JavaScript', category: 'Programming Languages', icon: 'Code2', months_experience: 14, order: 2 },
  { id: 'skill-typescript', name: 'TypeScript', category: 'Programming Languages', icon: 'Code2', months_experience: 14, order: 3 },
  { id: 'skill-cpp', name: 'C++', category: 'Programming Languages', icon: 'Code2', months_experience: 5, order: 4 },
  { id: 'skill-swift', name: 'Swift (iOS)', category: 'Programming Languages', icon: 'Code2', months_experience: 3, order: 5 },
  { id: 'skill-perl', name: 'Perl', category: 'Programming Languages', icon: 'Code2', months_experience: 3, order: 6 },

  // ---- Frameworks ----
  { id: 'skill-react', name: 'React', category: 'Frameworks', icon: 'Atom', months_experience: 14, order: 0 },
  { id: 'skill-nodejs', name: 'Node.js', category: 'Frameworks', icon: 'Server', months_experience: 14, order: 1 },

  // ---- Development Tools ----
  { id: 'skill-git-github', name: 'Git & GitHub', category: 'Development Tools', icon: 'GitBranch', order: 0 },
  { id: 'skill-databases', name: 'Databases (SQL, Amazon RDS)', category: 'Development Tools', icon: 'Database', order: 1 },
  { id: 'skill-rest-apis', name: 'REST APIs', category: 'Development Tools', icon: 'Plug', order: 2 },
  { id: 'skill-hardware-integration', name: 'Hardware / Software Integration', category: 'Development Tools', icon: 'Cpu', order: 3 },
  { id: 'skill-webflow', name: 'Webflow', category: 'Development Tools', icon: 'Layout', order: 4 },

  // ---- AI ----
  { id: 'skill-ai-tools', name: 'AI Tools & Prompt Engineering', category: 'AI', icon: 'Sparkles', order: 0 },
  { id: 'skill-ai-use-cases', name: 'AI Use Case Exploration (AWS)', category: 'AI', icon: 'Sparkles', order: 1 },
  { id: 'skill-ai-workflows', name: 'AI-Assisted Workflows', category: 'AI', icon: 'Sparkles', order: 2 },

  // ---- Design ----
  { id: 'skill-figma', name: 'Figma', category: 'Design', icon: 'Figma', order: 0 },
  { id: 'skill-canva', name: 'Canva', category: 'Design', icon: 'Palette', order: 1 },
  { id: 'skill-photoshop', name: 'Adobe Photoshop', category: 'Design', icon: 'Palette', order: 2 },
  { id: 'skill-ui-ux-design', name: 'UI/UX Design', category: 'Design', icon: 'LayoutTemplate', order: 2 },
  { id: 'skill-graphic-design', name: 'Graphic Design', category: 'Design', icon: 'Palette', order: 3 },
  { id: 'skill-branding', name: 'Branding & Visual Identity', category: 'Design', icon: 'Palette', order: 4 },
  { id: 'skill-visual-communication', name: 'Visual Communication', category: 'Design', icon: 'Eye', order: 5 },

  // ---- Marketing ----
  { id: 'skill-social-media-management', name: 'Social Media Management', category: 'Marketing', icon: 'Share2', order: 0 },
  { id: 'skill-campaign-strategy', name: 'Campaign Strategy', category: 'Marketing', icon: 'Target', order: 1 },
  { id: 'skill-content-creation', name: 'Content Creation', category: 'Marketing', icon: 'PenTool', order: 2 },
  { id: 'skill-analytics', name: 'Engagement Analytics', category: 'Marketing', icon: 'BarChart2', order: 3 },
  { id: 'skill-copywriting', name: 'Copywriting', category: 'Marketing', icon: 'PenTool', order: 4 },
  { id: 'skill-brand-management', name: 'Brand Management', category: 'Marketing', icon: 'Target', order: 5 },
  { id: 'skill-email-marketing', name: 'Email Marketing & Outreach', category: 'Marketing', icon: 'Mail', order: 6 },
  { id: 'skill-sponsorship-outreach', name: 'Sponsorship & Partnership Outreach', category: 'Marketing', icon: 'Handshake', order: 7 },

  // ---- Photography ----
  { id: 'skill-photography', name: 'Photography', category: 'Photography', icon: 'Camera', order: 0 },
  { id: 'skill-videography', name: 'Videography', category: 'Photography', icon: 'Video', order: 1 },
  { id: 'skill-video-editing', name: 'Video Editing', category: 'Photography', icon: 'Film', order: 2 },
  { id: 'skill-storytelling', name: 'Visual Storytelling', category: 'Photography', icon: 'BookOpen', order: 3 },

  // ---- Business ----
  { id: 'skill-financial-literacy', name: 'Financial Literacy', category: 'Business', icon: 'TrendingUp', order: 0 },
  { id: 'skill-business-strategy', name: 'Business Strategy', category: 'Business', icon: 'Briefcase', order: 1 },
  { id: 'skill-entrepreneurship', name: 'Entrepreneurship Programs', category: 'Business', icon: 'Rocket', order: 2 },

  // ---- Leadership ----
  { id: 'skill-team-management', name: 'Team Management', category: 'Leadership', icon: 'Users', order: 0 },
  { id: 'skill-event-planning', name: 'Event Planning', category: 'Leadership', icon: 'Calendar', order: 1 },
  { id: 'skill-public-speaking', name: 'Public Speaking', category: 'Leadership', icon: 'Mic', order: 2 },
  { id: 'skill-project-management', name: 'Project Management', category: 'Leadership', icon: 'ClipboardList', order: 3 },
  { id: 'skill-community-building', name: 'Community Building', category: 'Leadership', icon: 'Users', order: 4 },
  { id: 'skill-board-governance', name: 'Board Governance', category: 'Leadership', icon: 'Landmark', order: 5 },
  { id: 'skill-mentorship', name: 'Mentorship', category: 'Leadership', icon: 'GraduationCap', order: 6 },

  // ---- Soft Skills ----
  { id: 'skill-problem-solving', name: 'Problem Solving', category: 'Soft Skills', icon: 'Puzzle', order: 0 },
  { id: 'skill-time-management', name: 'Time Management', category: 'Soft Skills', icon: 'Clock', order: 1 },
  { id: 'skill-interpersonal', name: 'Interpersonal Communication', category: 'Soft Skills', icon: 'MessageCircle', order: 2 },
  { id: 'skill-research', name: 'Research Skills', category: 'Soft Skills', icon: 'Search', order: 3 },

  // ---- Productivity Software ----
  { id: 'skill-microsoft-office', name: 'Microsoft Office (Word, Excel, PowerPoint)', category: 'Productivity Software', icon: 'FileText', order: 0 },
  { id: 'skill-google-workspace', name: 'Google Workspace', category: 'Productivity Software', icon: 'FileText', order: 1 },
  { id: 'skill-notion', name: 'Notion', category: 'Productivity Software', icon: 'FileText', order: 2 },
  { id: 'skill-calendar-coordination', name: 'Calendar & Meeting Coordination', category: 'Productivity Software', icon: 'Calendar', order: 3 },
];

export default skills;
