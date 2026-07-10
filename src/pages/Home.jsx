import { motion } from 'framer-motion';
import HomeHero from '@/components/home/HomeHero';
import StatsRow from '@/components/home/StatsRow';
import AboutPreview from '@/components/home/AboutPreview';
import WhatIDo from '@/components/home/WhatIDo';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import FeaturedRoles from '@/components/home/FeaturedRoles';
import RecentBlog from '@/components/home/RecentBlog';
import OrgStrip from '@/components/home/OrgStrip';
import { work } from '@/data/work';
import { blogPosts } from '@/data/blog';
import { getFeaturedRoles } from '@/data/experienceRoles';
import { organizations } from '@/data/organizations';

const featuredWork = work.filter((w) => w.featured).slice(0, 3);
const recentPosts = [...blogPosts]
  .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
  .slice(0, 3);
const featuredRoles = getFeaturedRoles();

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <HomeHero />
      <StatsRow />
      <AboutPreview />
      <WhatIDo />
      <FeaturedProjects work={featuredWork} loading={false} />
      <FeaturedRoles roles={featuredRoles} loading={false} />
      <RecentBlog posts={recentPosts} loading={false} />
      <OrgStrip orgs={organizations} />
    </motion.div>
  );
}
