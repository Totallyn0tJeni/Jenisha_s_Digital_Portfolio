import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { FileDown, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await base44.entities.Resume.list('-uploaded_date', 20);
        setAllResumes(all);
        const active = all.find((r) => r.is_active) || all[0];
        setResume(active);
      } catch (e) { setResume(null); }
      setLoading(false);
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Career" title="Resume" subtitle="Download my resume or view all versions." />
          {loading ? (
            <div className="h-40 rounded-2xl shimmer" />
          ) : resume ? (
            <div className="space-y-6">
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <FileDown className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground">{resume.version_label}</h3>
                {resume.uploaded_date && <p className="text-sm text-muted-foreground mt-1">Uploaded {new Date(resume.uploaded_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
                {resume.notes && <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto leading-relaxed">{resume.notes}</p>}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                  <a href={resume.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
                    <FileDown className="w-4 h-4" /> Download PDF
                  </a>
                  <a href={resume.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass text-foreground hover:border-primary/30 transition-premium">
                    <ExternalLink className="w-4 h-4" /> View Online
                  </a>
                </div>
              </div>

              {allResumes.length > 1 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">All Versions</h3>
                  <div className="space-y-2">
                    {allResumes.map((r) => (
                      <div key={r.id} className="glass-card p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-foreground">{r.version_label}</p>
                          <p className="text-xs text-muted-foreground">{r.uploaded_date ? new Date(r.uploaded_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {r.is_active && <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500">Active</span>}
                          <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm">Download →</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState title="Upload your resume" description="Add your resume PDF from the admin dashboard to make it available for download here." />
          )}
        </div>
      </section>
    </motion.div>
  );
}