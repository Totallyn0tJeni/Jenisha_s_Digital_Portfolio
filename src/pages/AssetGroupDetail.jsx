import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { getAssetGroupById, getUsedIn, getRelatedGroups, getGroupNavigation } from '@/data/assetGroups';
import { getWorkById } from '@/data/work';

export default function AssetGroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = getAssetGroupById(id);

  if (!group) {
    return (
      <div className="px-4 pt-20">
        <EmptyState title="Post not found" description="This post may have been reorganized or removed." action={{ label: 'Back to Marketing', onClick: () => navigate('/marketing') }} />
      </div>
    );
  }

  const campaign = getWorkById(group.campaign);
  const usedIn = getUsedIn(group);
  const related = getRelatedGroups(group);
  const { prevPost, nextPost, prevCampaign, nextCampaign } = getGroupNavigation(group);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <article className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link to={campaign ? `/work/${campaign.slug || campaign.id}` : '/marketing'} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-premium mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to {campaign ? campaign.title : 'Marketing'}
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {group.collection && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary">{group.collection}</span>}
            {group.count > 1 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-500/15 text-fuchsia-400">
                <Layers className="w-3 h-3" /> {group.count} Images
              </span>
            )}
            {campaign?.date && <time className="text-sm text-muted-foreground">{new Date(campaign.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</time>}
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight mb-2">{group.title}</h1>
          {(group.organization || campaign?.title) && (
            <p className="text-primary font-medium mb-8">{[group.organization, campaign?.title].filter(Boolean).join(' · ')}</p>
          )}

          {/* Gallery / Carousel */}
          {group.count > 1 ? (
            <div className="mb-10">
              <Carousel className="w-full">
                <CarouselContent>
                  {group.assets.map((asset) => (
                    <CarouselItem key={asset.id}>
                      <div className="rounded-2xl overflow-hidden glass-card">
                        <img src={asset.web_path} alt={asset.alt_text} className="w-full object-contain max-h-[70vh] bg-black/10" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <div className="flex flex-wrap gap-2 mt-4">
                {group.assets.map((asset, i) => (
                  <img key={asset.id} src={asset.thumbnail_path} alt="" className="w-14 h-14 rounded-lg object-cover border border-border opacity-70 hover:opacity-100 transition-premium" title={`${i + 1} of ${group.count}`} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden glass-card mb-10">
              <img src={group.coverAsset.web_path} alt={group.coverAsset.alt_text} className="w-full object-cover" />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display font-semibold text-xl text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {group.coverAsset.description || `Part of ${campaign?.title || group.organization}${group.collection ? `, in the ${group.collection} collection` : ''}.`}
                </p>
              </div>

              {campaign?.deliverables?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Deliverables</h2>
                  <ul className="space-y-2">
                    {campaign.deliverables.map((d, i) => <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">✓</span> {d}</li>)}
                  </ul>
                </div>
              )}

              {/* Used In */}
              {usedIn.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Used In</h2>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {usedIn.map((u, i) => (
                      <Link key={i} to={u.path} className="glass-card p-3.5 flex items-center justify-between gap-3 hover:border-primary/30 transition-premium group">
                        <div className="min-w-0">
                          <p className="text-xs text-primary uppercase tracking-wide font-mono">{u.type}</p>
                          <p className="text-sm text-foreground truncate">{u.label}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-premium shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Work */}
              {related.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Related Work</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {related.map((g) => (
                      <Link key={g.id} to={`/marketing/${g.id}`} className="glass-card overflow-hidden group flex items-center gap-3 p-2">
                        <img src={g.coverAsset.thumbnail_path} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-foreground truncate group-hover:text-primary transition-premium">{g.title}</p>
                          <p className="text-xs text-muted-foreground">{g.count} image{g.count > 1 ? 's' : ''}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              {group.software?.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Software Used</h3>
                  <div className="flex flex-wrap gap-2">{group.software.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}</div>
                </div>
              )}
              {group.tags?.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">{group.tags.slice(0, 14).map((t, i) => <span key={i} className="skill-tag">{t}</span>)}</div>
                </div>
              )}
            </aside>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-border/50 grid sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link to={`/marketing/${prevPost.id}`} className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-premium group">
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-premium shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Previous Post</p>
                  <p className="text-sm text-foreground truncate">{prevPost.title}</p>
                </div>
              </Link>
            ) : prevCampaign ? (
              <Link to={`/work/${prevCampaign.slug || prevCampaign.id}`} className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-premium group">
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-premium shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Previous Campaign</p>
                  <p className="text-sm text-foreground truncate">{prevCampaign.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link to={`/marketing/${nextPost.id}`} className="glass-card p-4 flex items-center justify-end gap-3 text-right hover:border-primary/30 transition-premium group">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Next Post</p>
                  <p className="text-sm text-foreground truncate">{nextPost.title}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-premium shrink-0" />
              </Link>
            ) : nextCampaign ? (
              <Link to={`/work/${nextCampaign.slug || nextCampaign.id}`} className="glass-card p-4 flex items-center justify-end gap-3 text-right hover:border-primary/30 transition-premium group">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Next Campaign</p>
                  <p className="text-sm text-foreground truncate">{nextCampaign.title}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-premium shrink-0" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
