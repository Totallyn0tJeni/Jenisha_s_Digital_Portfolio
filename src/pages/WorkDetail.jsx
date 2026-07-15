import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Monitor, FileText, Calendar, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import EmptyState from '@/components/EmptyState';
import { getWorkById } from '@/data/work';
import { getTimelineEventIdForWork, getTimelineEventById } from '@/data/timelineEvents';
import { getAssetsByCampaign, getSubcampaigns, getCampaignHeroImage } from '@/data/marketingIndex';
import { getAssetGroups } from '@/data/assetGroups';
import AssetGroupCard from '@/components/cards/AssetGroupCard';

const linkIcons = { github: Github, demo: ExternalLink, slides: Monitor, documentation: FileText, external: ExternalLink };

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const work = getWorkById(id);
  const isCampaign = work?.work_type === 'marketing_campaign';
  const campaignAssets = isCampaign ? getAssetsByCampaign(work.id) : [];
  const subcampaigns = isCampaign ? getSubcampaigns(work.id) : [];
  const heroImage = work?.hero_image || (isCampaign ? getCampaignHeroImage(work.id) : '');
  const timelineEventId = work ? getTimelineEventIdForWork(work.slug || work.id) : null;
  const hasTimelineEntry = timelineEventId && !!getTimelineEventById(timelineEventId);

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
          {hasTimelineEntry && (
            <Link to={`/timeline?highlight=${timelineEventId}`} className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-premium mb-8 ml-4">
              <Calendar className="w-4 h-4" /> View in Timeline
            </Link>
          )}

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-primary/15 text-primary">
              {(work.work_type || 'work').replace(/_/g, ' ')}
            </span>
            {work.campaign_type && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-500/15 text-fuchsia-400">{work.campaign_type}</span>
            )}
            {work.status && work.status !== 'completed' && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-amber-500/15 text-amber-500">{work.status}</span>
            )}
            {work.date && <time className="text-sm text-muted-foreground">{new Date(work.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</time>}
          </div>

          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-4">{work.title}</h1>
          {(work.role || work.organization) && (
            <p className="text-sm text-primary font-medium mb-2">{[work.role, work.organization].filter(Boolean).join(' · ')}</p>
          )}
          {work.tagline && <p className="text-xl text-muted-foreground leading-relaxed mb-6">{work.tagline}</p>}

          {/* Links, embeds & downloads */}
          {(() => {
            const linkEntries = Object.entries(work.links || {}).filter(([, v]) => v);
            const embedEntries = Object.entries(work.embeds || {}).filter(([, v]) => v);
            const downloadEntries = (work.downloads || []).filter((d) => d.url).map((d) => [d.label || 'Download', d.url]);
            const all = [...linkEntries, ...embedEntries, ...downloadEntries];
            if (all.length === 0) return null;
            return (
              <div className="flex flex-wrap gap-3 mb-10">
                {all.map(([key, url], i) => {
                  const Icon = linkIcons[key] || ExternalLink;
                  return (
                    <a key={`${key}-${i}`} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium">
                      <Icon className="w-4 h-4" /> <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                    </a>
                  );
                })}
              </div>
            );
          })()}

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden glass-card mb-12">
            {heroImage ? (
              <img src={heroImage} alt={work.title} className="w-full object-cover" />
            ) : (
              <ImagePlaceholder label="Portfolio Media Coming Soon" aspect="wide" />
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

              {/* Case study sections — only rendered when supported by real content */}
              {work.challenge && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Challenge</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.challenge}</p>
                </div>
              )}
              {work.goals?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Goals</h2>
                  <ul className="space-y-2">{work.goals.map((g, i) => <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">•</span> {g}</li>)}</ul>
                </div>
              )}
              {work.research && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Research</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.research}</p>
                </div>
              )}
              {work.strategy && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Strategy</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.strategy}</p>
                </div>
              )}
              {(work.design_process || work.execution) && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">{work.design_process ? 'Design Process' : 'Execution'}</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.design_process || work.execution}</p>
                </div>
              )}
              {work.results && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Results</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.results}</p>
                </div>
              )}
              {work.reflection && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Reflection</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.reflection}</p>
                </div>
              )}
              {work.lessons_learned && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Lessons Learned</h2>
                  <p className="text-muted-foreground leading-relaxed">{work.lessons_learned}</p>
                </div>
              )}

              {work.objectives?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Objectives</h2>
                  <ul className="space-y-2">{work.objectives.map((o, i) => <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">•</span> {o}</li>)}</ul>
                </div>
              )}
              {work.deliverables?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Deliverables</h2>
                  <ul className="space-y-2">{work.deliverables.map((d, i) => <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">✓</span> {d}</li>)}</ul>
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
              {work.outcomes && work.outcomes.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Outcomes</h2>
                  <ul className="space-y-2">
                    {work.outcomes.map((o, i) => (
                      <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">—</span> {o}</li>
                    ))}
                  </ul>
                </div>
              )}
              {work.testimonials && work.testimonials.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-1">Testimonials</h2>
                  {work.testimonials.map((t, i) => (
                    <blockquote key={i} className="glass-card p-5 border-l-2 border-primary">
                      <p className="text-muted-foreground italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                      {t.author && <p className="text-sm text-foreground font-medium mt-2">— {t.author}</p>}
                    </blockquote>
                  ))}
                </div>
              )}
              {(work.videos?.length > 0 || work.youtube_urls?.length > 0) && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Video</h2>
                  <div className="space-y-4">
                    {work.youtube_urls?.map((url, i) => (
                      <div key={`yt-${i}`} className="aspect-video rounded-xl overflow-hidden glass-card">
                        <iframe src={url.replace('watch?v=', 'embed/')} title={`Video ${i + 1}`} className="w-full h-full" allowFullScreen loading="lazy" />
                      </div>
                    ))}
                    {work.videos?.map((v, i) => (
                      <a key={`v-${i}`} href={v.url} target="_blank" rel="noopener noreferrer" className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-premium">
                        <Monitor className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm text-foreground">{v.title || 'Watch video'}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {(work.pdfs?.length > 0 || work.documents?.length > 0) && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Documents</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[...(work.pdfs || []), ...(work.documents || [])].map((d, i) => (
                      <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-premium">
                        <FileText className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm text-foreground truncate">{d.title || 'View document'}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {work.related_experience_id && (
                <Link to={`/experience/${work.related_experience_id}`} className="glass-card p-5 flex items-center justify-between gap-3 hover:border-primary/30 transition-premium group">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Related Experience</h3>
                    <p className="text-xs text-muted-foreground mt-1">{work.role} · {work.organization}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-premium shrink-0" />
                </Link>
              )}
              {work.tech_stack && work.tech_stack.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tech_stack.map((tech, i) => <span key={i} className="skill-tag">{tech}</span>)}
                  </div>
                </div>
              )}
              {work.skills && work.skills.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Skills Applied</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
                  </div>
                </div>
              )}
              {work.collaborators && work.collaborators.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Collaborators</h3>
                  <ul className="space-y-1.5">
                    {work.collaborators.map((c, i) => <li key={i} className="text-sm text-muted-foreground">{typeof c === 'string' ? c : c.name}</li>)}
                  </ul>
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

          {/* Gallery — sourced from the Assets collection, grouped by sub-campaign */}
          {isCampaign && campaignAssets.length > 0 ? (
            <div className="mt-12 space-y-10">
              {subcampaigns.map((sub) => {
                const subAssets = campaignAssets.filter((a) => a.collection === sub);
                if (subAssets.length === 0) return null;
                return <SubcampaignGallery key={sub} title={sub} assets={subAssets} />;
              })}
            </div>
          ) : (
            work.gallery && work.gallery.length > 0 && (
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
            )
          )}
        </div>
      </article>
    </motion.div>
  );
}

const PAGE_SIZE = 12;

function SubcampaignGallery({ title, assets }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const groups = getAssetGroups((a) => assets.some((x) => x.id === a.id));
  const shown = groups.slice(0, visible);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-semibold text-xl text-foreground">{title}</h2>
        <span className="text-xs font-mono text-muted-foreground">{groups.length} post{groups.length > 1 ? 's' : ''} · {assets.length} image{assets.length > 1 ? 's' : ''}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {shown.map((group, i) => <AssetGroupCard key={group.id} group={group} index={i} />)}
      </div>
      {visible < groups.length && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="mt-5 px-5 py-2 rounded-full text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium"
        >
          Show {Math.min(PAGE_SIZE, groups.length - visible)} more ({groups.length - visible} remaining)
        </button>
      )}
    </div>
  );
}