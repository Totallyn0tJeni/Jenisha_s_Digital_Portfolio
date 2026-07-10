// Skills, grouped into five categories per src/data/README.md conventions.
// `proficiency` (0-100) is a rough signal for sorting/visual bars, derived from
// resume-stated experience length where available — treat as approximate.

import { Trello } from "lucide-react";

export const skills = [
  // ---- Technical ----
  { id: 'skill-python', name: 'Python', category: 'Technical', proficiency: 90, months_experience: 24, order: 0 },
  { id: 'skill-html-css', name: 'HTML & CSS', category: 'Technical', proficiency: 88, months_experience: 24, order: 1 },
  { id: 'skill-javascript', name: 'JavaScript', category: 'Technical', proficiency: 85, months_experience: 24, order: 2 },
  { id: 'skill-typescript', name: 'TypeScript', category: 'Technical', proficiency: 82, months_experience: 18, order: 3 },
  { id: 'skill-react', name: 'React', category: 'Technical', proficiency: 82, months_experience: 18, order: 4 },
  { id: 'skill-nodejs', name: 'Node.js', category: 'Technical', proficiency: 80, months_experience: 18, order: 5 },
  { id: 'skill-cpp', name: 'C++', category: 'Technical', proficiency: 70, months_experience: 12, order: 6 },
  { id: 'skill-swift', name: 'Swift', category: 'Technical', proficiency: 60, months_experience: 8, order: 7 },
  { id: 'skill-git', name: 'Git', category: 'Technical', proficiency: 82, order: 8 },
  { id: 'skill-github', name: 'GitHub', category: 'Technical', proficiency: 84, order: 9 },
  { id: 'skill-rest-api', name: 'REST APIs', category: 'Technical', proficiency: 78, order: 10 },
  { id: 'skill-json', name: 'JSON', category: 'Technical', proficiency: 80, order: 11 },
  { id: 'skill-sql', name: 'SQL', category: 'Technical', proficiency: 70, order: 12 },
  { id: 'skill-rds', name: 'Amazon RDS', category: 'Technical', proficiency: 65, order: 13 },
  { id: 'skill-web-development', name: 'Full Stack Web Development', category: 'Technical', proficiency: 82, order: 14 },
  { id: 'skill-responsive', name: 'Responsive Web Design', category: 'Technical', proficiency: 85, order: 15 },
  { id: 'skill-hardware', name: 'Hardware / Software Integration', category: 'Technical', proficiency: 72, order: 16 },
  { id: 'skill-debugging', name: 'Debugging', category: 'Technical', proficiency: 82, order: 17 },
  { id: 'skill-testing', name: 'Testing & QA', category: 'Technical', proficiency: 72, order: 18 },

  // ---- Design ----
  { id: 'skill-figma', name: 'Figma', category: 'Design', proficiency: 80, order: 0 },
  { id: 'skill-canva', name: 'Canva', category: 'Design', proficiency: 98, order: 1 },
  { id: 'skill-webflow', name: 'Webflow', category: 'Design', proficiency: 82, order: 2 },
  { id: 'skill-uiux', name: 'UI/UX Design', category: 'Design', proficiency: 85, order: 3 },
  { id: 'skill-wireframing', name: 'Wireframing', category: 'Design', proficiency: 82, order: 4 },
  { id: 'skill-prototyping', name: 'Prototyping', category: 'Design', proficiency: 78, order: 5 },
  { id: 'skill-graphic', name: 'Graphic Design', category: 'Design', proficiency: 92, order: 6 },
  { id: 'skill-branding', name: 'Brand Identity', category: 'Design', proficiency: 90, order: 7 },
  { id: 'skill-typography', name: 'Typography', category: 'Design', proficiency: 82, order: 8 },
  { id: 'skill-layout', name: 'Layout Design', category: 'Design', proficiency: 88, order: 9 },
  { id: 'skill-color', name: 'Color Theory', category: 'Design', proficiency: 82, order: 10 },
  { id: 'skill-design-systems', name: 'Design Systems', category: 'Design', proficiency: 75, order: 11 },
  { id: 'skill-accessibility', name: 'Accessibility Design', category: 'Design', proficiency: 72, order: 12 },

  // ---- Marketing ----
  { id: 'skill-social-media', name: 'Social Media Marketing', category: 'Marketing', proficiency: 95, order: 0 },
  { id: 'skill-content', name: 'Content Creation', category: 'Marketing', proficiency: 94, order: 1 },
  { id: 'skill-content-strategy', name: 'Content Strategy', category: 'Marketing', proficiency: 88, order: 2 },
  { id: 'skill-brand-management', name: 'Brand Management', category: 'Marketing', proficiency: 90, order: 3 },
  { id: 'skill-campaigns', name: 'Marketing Campaigns', category: 'Marketing', proficiency: 90, order: 4 },
  { id: 'skill-digital-marketing', name: 'Digital Marketing', category: 'Marketing', proficiency: 90, order: 5 },
  { id: 'skill-copywriting', name: 'Copywriting', category: 'Marketing', proficiency: 82, order: 6 },
  { id: 'skill-email', name: 'Email Marketing', category: 'Marketing', proficiency: 82, order: 7 },
  { id: 'skill-outreach', name: 'Community Outreach', category: 'Marketing', proficiency: 90, order: 8 },
  { id: 'skill-pr', name: 'Public Relations', category: 'Marketing', proficiency: 90, order: 9 },
  { id: 'skill-analytics', name: 'Marketing Analytics', category: 'Marketing', proficiency: 80, order: 10 },
  { id: 'skill-seo', name: 'SEO Basics', category: 'Marketing', proficiency: 65, order: 11 },
  { id: 'skill-sponsorship', name: 'Sponsor Relations', category: 'Marketing', proficiency: 88, order: 12 },
  { id: 'skill-storytelling', name: 'Brand Storytelling', category: 'Marketing', proficiency: 90, order: 13 },

  // ---- Creative ----
  { id: 'skill-photography', name: 'Photography', category: 'Creative', proficiency: 90, order: 0 },
  { id: 'skill-videography', name: 'Videography', category: 'Creative', proficiency: 88, order: 1 },
  { id: 'skill-video-editing', name: 'Video Editing', category: 'Creative', proficiency: 84, order: 2 },
  { id: 'skill-photo-editing', name: 'Photo Editing', category: 'Creative', proficiency: 85, order: 3 },
  { id: 'skill-reels', name: 'Short-form Video Production', category: 'Creative', proficiency: 88, order: 4 },
  { id: 'skill-motion', name: 'Motion Graphics', category: 'Creative', proficiency: 72, order: 5 },
  { id: 'skill-presentation', name: 'Presentation Design', category: 'Creative', proficiency: 90, order: 6 },
  { id: 'skill-creative-direction', name: 'Creative Direction', category: 'Creative', proficiency: 88, order: 7 },
  { id: 'skill-visual-storytelling', name: 'Visual Storytelling', category: 'Creative', proficiency: 90, order: 8 },

  // ---- Leadership ----
  { id: 'skill-team-management', name: 'Team Leadership', category: 'Leadership', proficiency: 92, order: 0 },
  { id: 'skill-project-management', name: 'Project Management', category: 'Leadership', proficiency: 90, order: 1 },
  { id: 'skill-event-planning', name: 'Event Planning', category: 'Leadership', proficiency: 94, order: 2 },
  { id: 'skill-board', name: 'Board Governance', category: 'Leadership', proficiency: 82, order: 3 },
  { id: 'skill-operations', name: 'Operations Management', category: 'Leadership', proficiency: 90, order: 4 },
  { id: 'skill-strategic', name: 'Strategic Planning', category: 'Leadership', proficiency: 90, order: 5 },
  { id: 'skill-crossfunctional', name: 'Cross-functional Collaboration', category: 'Leadership', proficiency: 92, order: 6 },
  { id: 'skill-delegation', name: 'Task Delegation', category: 'Leadership', proficiency: 88, order: 7 },
  { id: 'skill-mentorship', name: 'Mentorship', category: 'Leadership', proficiency: 85, order: 8 },
  { id: 'skill-public-speaking', name: 'Public Speaking', category: 'Leadership', proficiency: 85, order: 9 },
  { id: 'skill-community', name: 'Community Building', category: 'Leadership', proficiency: 90, order: 10 },
  { id: 'skill-stakeholder', name: 'Stakeholder Management', category: 'Leadership', proficiency: 88, order: 11 },
  { id: 'skill-volunteer', name: 'Volunteer Coordination', category: 'Leadership', proficiency: 90, order: 12 },

  // ---- Tools ----
  { id: 'tool-canva', name: 'Canva', category: 'Tools', proficiency: 85, order: 0 },
  { id: 'tool-figma', name: 'Figma', category: 'Tools', proficiency: 88, order: 1 },
  { id: 'tool-webflow', name: 'Webflow', category: 'Tools', proficiency: 80, order: 2 },
  { id: 'tool-github', name: 'GitHub', category: 'Tools', proficiency: 85, order: 3 },
  { id: 'tool-git', name: 'Git', category: 'Tools', proficiency: 80, order: 4 },
  { id: 'tool-vscode', name: 'VS Code', category: 'Tools', proficiency: 90, order: 5 },
  { id: 'tool-react', name: 'React', category: 'Tools', proficiency: 85, order: 6 },
  { id: 'tool-nodejs', name: 'Node.js', category: 'Tools', proficiency: 80, order: 7 },
  { id: 'tool-typescript', name: 'TypeScript', category: 'Tools', proficiency: 85, order: 8 },
  { id: 'tool-python', name: 'Python', category: 'Tools', proficiency: 80, order: 9 },
  { id: 'tool-google-workspace', name: 'Google Workspace', category: 'Tools', proficiency: 85, order: 10 },
  { id: 'tool-microsoft-office', name: 'Microsoft Office', category: 'Tools', proficiency: 80, order: 11 },
  { id: 'tool-google-analytics', name: 'Google Analytics', category: 'Tools', proficiency: 85, order: 12 },
  { id: 'tool-notion', name: 'Notion', category: 'Tools', proficiency: 80, order: 13 },
  { id: 'tool-slack', name: 'Slack', category: 'Tools', proficiency: 85, order: 14 },
  { id: 'tool-discord', name: 'Discord', category: 'Tools', proficiency: 80, order: 15 },
  { id: 'tool-trello', name: 'Trello', category: 'Tools', proficiency: 85, order: 16 },
  { id: 'tool-clickup', name: 'ClickUp', category: 'Tools', proficiency: 80, order: 17 },
  { id: 'tool-adobe-express', name: 'Adobe Express', category: 'Tools', proficiency: 85, order: 18 },
  { id: 'tool-capcut', name: 'CapCut', category: 'Tools', proficiency: 80, order: 19 }
];

export default skills;
