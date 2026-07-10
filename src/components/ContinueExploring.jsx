import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Clock, Users, Trophy, Award, Camera, FileDown, Calendar } from 'lucide-react';

const exploreLinks = [
  { icon: Briefcase, title: 'Work', description: 'Projects, software, and creative work', path: '/work' },
  { icon: Clock, title: 'Experience', description: 'Professional, leadership, and volunteer history', path: '/experience' },
  { icon: Trophy, title: 'Awards', description: 'Recognition and achievements', path: '/awards' },
  { icon: Award, title: 'Certifications', description: 'Professional certificates and courses', path: '/certifications' },
  { icon: Calendar, title: 'Timeline', description: 'My journey from start to now', path: '/timeline' },
  { icon: Camera, title: 'Photography', description: 'Captured moments and visual stories', path: '/photography' },
  { icon: Users, title: 'Organizations', description: 'Where I show up and stay involved', path: '/organizations' },
  { icon: FileDown, title: 'Resume', description: 'Download the full PDF version', path: '/resume' },
];

export default function ContinueExploring() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> Continue Exploring
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-4">Where to next?</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exploreLinks.map(({ icon: Icon, title, description, path }, i) => (
            <motion.div key={path} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}>
              <Link to={path} className="glass-card p-5 block group h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-premium">{title}</h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}