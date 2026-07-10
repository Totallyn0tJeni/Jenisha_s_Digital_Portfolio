import { motion } from 'framer-motion';
import { FileDown, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { resumeFiles } from '@/data/resume';

const allResumes = [
  { id: 'active', version_label: resumeFiles.active.label, file_url: resumeFiles.active.url, is_active: true },
  { id: 'full', version_label: resumeFiles.full.label, file_url: resumeFiles.full.url, is_active: false },
  { id: 'highSchool', version_label: resumeFiles.highSchool.label, file_url: resumeFiles.highSchool.url, is_active: false },
].filter((r) => r.file_url);

export default function Resume() {
  const resume = allResumes.find((r) => r.is_active) || allResumes[0];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Career" title="Resume" subtitle="Download my resume or view all versions." />
          {resume ? (
            <div className="space-y-6">
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <FileDown className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground">{resume.version_label}</h3>
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
                        <p className="font-medium text-foreground">{r.version_label}</p>
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
            <EmptyState title="Add your resume" description="Set resumeFiles in src/data/resume.js to make a PDF available for download here." />
          )}
        </div>
      </section>
    </motion.div>
  );
}
