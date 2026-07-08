import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Certification.filter({ status: 'published' }, 'order', 100);
        setCerts(data);
      } catch (e) { setCerts([]); }
      setLoading(false);
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Credentials" title="Certifications" subtitle="Professional certifications and credentials." />
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-2xl shimmer" />)}</div>
          ) : certs.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {certs.map((cert, i) => (
                <motion.div key={cert.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    {cert.badge_image ? <img src={cert.badge_image} alt={cert.title} className="w-12 h-12 rounded-xl object-cover" /> : <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xl">📜</div>}
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{cert.title}</h3>
                      <p className="text-sm text-primary">{cert.issuer}</p>
                      {cert.issue_date && <p className="text-xs text-muted-foreground mt-1">Issued {new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>}
                      {cert.credential_url && <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-primary hover:text-primary/80 transition-premium">Verify credential →</a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first certification" description="Your certifications will appear here once added." />
          )}
        </div>
      </section>
    </motion.div>
  );
}