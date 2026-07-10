import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { organizations as organizationsData } from '@/data/organizations';

export default function Organizations() {
  const orgs = [...organizationsData].sort((a, b) => a.order - b.order);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Communities" title="Organizations" subtitle="Clubs, societies, and groups I'm part of." />
          {orgs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {orgs.map((org, i) => (
                <motion.div key={org.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {org.logo_url ? <img src={org.logo_url} alt={org.name} className="w-12 h-12 rounded-xl object-cover" /> : <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-lg">{org.name?.[0]}</div>}
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{org.name}</h3>
                      {org.role && <p className="text-sm text-primary">{org.role}</p>}
                    </div>
                  </div>
                  {org.is_current && <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500">Current</span>}
                  {org.description && <p className="text-sm text-muted-foreground leading-relaxed">{org.description}</p>}
                  {org.website_url && <a href={org.website_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-primary hover:text-primary/80 transition-premium">Visit website →</a>}
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first organization" description="Your clubs and organizations will appear here once added." />
          )}
        </div>
      </section>
    </motion.div>
  );
}