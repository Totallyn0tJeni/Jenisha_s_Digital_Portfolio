import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { testimonials as testimonialsData, testimonialsNote } from '@/data/testimonials';

function TestimonialCard({ t, index, featured = false }) {
  return (
    <motion.div
      key={t.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`glass-card p-6 ${t.placeholder ? 'border-dashed border-2 border-primary/20' : ''} ${featured ? 'sm:col-span-2' : ''}`}
    >
      {!t.placeholder && (
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, idx) => <span key={idx} className={idx < (t.rating || 5) ? 'text-amber-400' : 'text-muted-foreground/30'}>★</span>)}
        </div>
      )}
      <p className={`leading-relaxed mb-5 ${t.placeholder ? 'text-muted-foreground italic' : 'text-foreground/80 italic'}`}>
        {t.placeholder ? t.content : `"${t.content}"`}
      </p>
      <div className="flex items-center gap-3">
        {t.avatar_url ? (
          <img src={t.avatar_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">
            {t.placeholder ? '?' : t.author_name?.[0]}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{t.author_name}</p>
          {(t.author_role || t.author_organization) && (
            <p className="text-xs text-muted-foreground">{[t.author_role, t.author_organization].filter(Boolean).join(' · ')}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const items = testimonialsData;
  const highlighted = items.find((t) => t.highlight);
  const rest = items.filter((t) => !t.highlight);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Kind Words" title="Testimonials" subtitle="What people say about working with me." />

          {testimonialsNote && (
            <p className="text-center text-sm text-muted-foreground mt-4 mb-8">{testimonialsNote}</p>
          )}

          {highlighted && (
            <div className="mb-8">
              <TestimonialCard t={highlighted} index={0} featured />
            </div>
          )}

          {rest.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-5">
              {rest.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} />
              ))}
            </div>
          ) : (
            !highlighted && <EmptyState title="Add your first testimonial" description="Add entries to src/data/testimonials.js." />
          )}
        </div>
      </section>
    </motion.div>
  );
}
