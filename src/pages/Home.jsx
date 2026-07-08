import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import HomeHero from '@/components/home/HomeHero';
import StatsRow from '@/components/home/StatsRow';
import AboutPreview from '@/components/home/AboutPreview';
import WhatIDo from '@/components/home/WhatIDo';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import LeadershipHighlight from '@/components/home/LeadershipHighlight';
import RecentBlog from '@/components/home/RecentBlog';
import OrgStrip from '@/components/home/OrgStrip';

export default function Home() {
  const [data, setData] = useState({ work: [], blog: [], leadership: [], orgs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [work, blog, leadership, orgs] = await Promise.all([
          base44.entities.Work.filter({ status: 'published', featured: true }, '-order', 3).catch(() => []),
          base44.entities.BlogPost.filter({ status: 'published' }, '-published_date', 3).catch(() => []),
          base44.entities.LeadershipRole.filter({ status: 'published' }, '-order', 3).catch(() => []),
          base44.entities.Organization.filter({ status: 'published' }, 'order', 20).catch(() => []),
        ]);
        setData({ work, blog, leadership, orgs });
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <HomeHero />
      <StatsRow />
      <AboutPreview />
      <WhatIDo />
      <FeaturedProjects work={data.work} loading={loading} />
      <LeadershipHighlight roles={data.leadership} loading={loading} />
      <RecentBlog posts={data.blog} loading={loading} />
      <OrgStrip orgs={data.orgs} />
    </motion.div>
  );
}