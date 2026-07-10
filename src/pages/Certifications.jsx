import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { certifications as certificationsData } from '@/data/certifications';

export default function Certifications() {
  const certs = [...certificationsData].sort((a, b) => a.order - b.order);

  // Nest child certs (module/course certs) under their parent professional certificate.
  const topLevel = certs.filter((c) => !c.parent_certification);
  const childrenByParent = certs.reduce((acc, c) => {
    if (c.parent_certification) (acc[c.parent_certification] ||= []).push(c);
    return acc;
  }, {});

  const grouped = topLevel.reduce((acc, cert) => {
    const key = cert.issuer || 'Other';
    (acc[key] ||= []).push(cert);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Credentials" title="Certifications" subtitle={`${certs.length}+ certificates, grouped by issuer.`} />
          {certs.length > 0 ? (
            <div className="space-y-10 mt-4">
              {Object.entries(grouped).map(([issuer, items], gi) => (
                <div key={issuer}>
                  <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-primary mb-4">{issuer}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {items.map((cert, i) => {
                      const children = childrenByParent[cert.title] || [];
                      return (
                        <motion.div
                          key={cert.id}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (gi * 0.03) + i * 0.03 }}
                          className="glass-card p-6"
                        >
                          <div className="flex items-start gap-4">
                            {cert.badge_image ? (
                              <img src={cert.badge_image} alt={cert.title} className="w-12 h-12 rounded-xl object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xl">📜</div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h3 className="font-display font-semibold text-foreground leading-snug">{cert.title}</h3>
                              <p className="text-sm text-primary">{cert.issuer}</p>
                              {cert.issue_date && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Issued {new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                </p>
                              )}
                              {cert.description && <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{cert.description}</p>}
                              {cert.credential_url && (
                                <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-primary hover:text-primary/80 transition-premium">
                                  Verify credential →
                                </a>
                              )}
                              {children.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-border/60">
                                  <p className="text-xs text-muted-foreground mb-1.5">Includes {children.length} module certificate{children.length > 1 ? 's' : ''}:</p>
                                  <ul className="space-y-1">
                                    {children.map((c) => (
                                      <li key={c.id} className="text-xs text-muted-foreground flex gap-1.5"><span className="text-primary/60">–</span> {c.title}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first certification" description="Add entries to src/data/certifications/items/." />
          )}
        </div>
      </section>
    </motion.div>
  );
}
