import { motion } from 'framer-motion';

export default function OrgStrip({ orgs }) {
  if (!orgs || orgs.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-12 md:py-16 border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Organizations & Communities</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {orgs.map((org, i) => (
            <span key={org.id || i} className="font-mono text-sm md:text-base text-muted-foreground hover:text-foreground transition-premium cursor-default">
              {org.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}