import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RoleCard from '@/components/cards/RoleCard';

// Pulls directly from the Experience data source (src/data/experienceRoles.js,
// which merges src/data/experience/ and src/data/leadership/). No separate
// homepage collection — toggle `featured: true` on a role's own data file to
// have it appear here. Card UI is shared with the Experience page via RoleCard.
export default function FeaturedRoles({ roles, loading }) {
  if (!loading && roles.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured Roles</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mt-3">
                Leading with purpose.<br /><span className="text-gradient">Creating meaningful change.</span>
              </h2>
            </div>
            <Link to="/experience" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium group">
              Explore Experience <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-48 rounded-2xl shimmer" />)}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role, i) => <RoleCard key={role.id} role={role} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
