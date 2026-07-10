import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Monitor, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import EmptyState from '@/components/EmptyState';
import { getWorkById } from '@/data/work';

const linkIcons = { github: Github, demo: ExternalLink, slides: Monitor, documentation: FileText, external: ExternalLink };

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const work = getWorkById(id);

  if (!work) {
    return (
      <div className="px-4 pt-20">
        <EmptyState title="Work not found" description="This piece may have been removed or unpublished." action={{ label: 'Back to Work', onClick: () => navigate('/work') }} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <article className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-premium mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-primary/15 text-primary">
              {(work.work_type || 'work').replace(/_/g, ' ')}
            </span>
            {work.date && <time className="text-sm text-muted-foreground">{new Date(work.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</time>}
          </div>

          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-4">{work.title}</h1>
          {work.tagline && <p className="text-xl text-muted-foreground leading-relaxed mb-6">{work.tagline}</p>}

          {/* Links */}
          {work.links && Object.entries(work.links).filter(([, v]) => v).length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {Object.entries(work.links).filter(([, v]) => v).map(([key, url]) => {
                const Icon = linkIcons[key] || ExternalLink;
                return (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium">
                    <Icon className="w-4 h-4" /> <span className="capitalize">{key}</span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden glass-card mb-12">
            {work.hero_image ? (
              <img src={work.hero_image} alt={work.title} className="w-full object-cover" />
            ) : (
              <ImagePlaceholder label="Upload hero image" aspect="wide" />
            )}
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {work.description && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.description}</p>
                </div>
              )}
              {work.problem && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">The Problem</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.problem}</p>
                </div>
              )}
              {work.solution && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">The Solution</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.solution}</p>
                </div>
              )}
              {work.case_study && (
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown className="space-y-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_li]:text-muted-foreground [&_strong]:text-foreground">
                    {work.case_study}
                  </ReactMarkdown>
                </div>
              )}
              {work.content && !work.case_study && (
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown className="space-y-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_li]:text-muted-foreground [&_strong]:text-foreground">
                    {work.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {work.tech_stack && work.tech_stack.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tech_stack.map((tech, i) => <span key={i} className="skill-tag">{tech}</span>)}
                  </div>
                </div>
              )}
              {work.metrics && work.metrics.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Key Results</h3>
                  <div className="space-y-3">
                    {work.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="text-2xl font-display font-bold text-primary">{m.value}</div>
                        <div className="text-xs text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {work.tags && work.tags.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, i) => <span key={i} className="text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">{tag}</span>)}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Gallery */}
          {work.gallery && work.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display font-semibold text-xl text-foreground mb-5">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {work.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden glass-card">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </motion.div>
  );
}