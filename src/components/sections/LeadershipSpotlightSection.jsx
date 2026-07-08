import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionHeading from '../SectionHeading';

export default function LeadershipSpotlightSection({ config = {}, section }) {
  const [roles, setRoles] = useState([]);
  const count = config.count || 1;

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.LeadershipRole.filter({ status: 'published' }, '-order', count);
        setRoles(data);
      } catch (e) { setRoles([]); }
    })();
  }, [count]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {section?.title && <SectionHeading title={section.title} />}
        {roles.length > 0 ? roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-10"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Users className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground">{role.role_title}</h3>
                <p className="text-primary font-medium mt-1">{role.organization}</p>
                {role.is_current && <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500">Current</span>}
              </div>
            </div>
            {role.description && <p className="text-muted-foreground mt-4 leading-relaxed">{role.description}</p>}
            {role.achievements && role.achievements.length > 0 && (
              <ul className="mt-4 space-y-2">
                {role.achievements.map((a, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">•</span> {a}
                  </li>
                ))}
              </ul>
            )}
            <Link to="/leadership" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-premium">
              View all leadership <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )) : (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground/50 italic">Add your first leadership role to spotlight it here.</p>
          </div>
        )}
      </div>
    </section>
  );
}