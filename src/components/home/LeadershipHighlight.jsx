import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';

export default function LeadershipHighlight({ roles, loading }) {
  if (!loading && roles.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Leadership Highlight</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mt-3">
                Leading with purpose.<br /><span className="text-gradient">Creating meaningful change.</span>
              </h2>
            </div>
            <Link to="/experience" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium group">
              Explore Leadership <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-48 rounded-2xl shimmer" />)}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role, i) => (
                <motion.div key={role.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="glass-card overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-soft flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-primary/40" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-foreground">{role.position}</h4>
                    <p className="text-sm text-primary font-mono mt-1">{role.organization}</p>
                    {role.start_date && <p className="text-xs text-muted-foreground mt-2 font-mono">{role.start_date} – {role.is_current ? 'Present' : role.end_date || ''}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}