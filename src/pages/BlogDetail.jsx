import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts, getPostById, getPostsByCategory } from '@/data/blog';

export default function BlogDetail() {
  const { id } = useParams();
  const [lightbox, setLightbox] = useState(null);
  const post = getPostById(id);
  const related = post?.category
    ? getPostsByCategory(post.category).filter((p) => p.id !== id).slice(0, 3)
    : [];

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Post not found.</p>
        <Link to="/blog" className="px-6 py-3 rounded-full glass text-foreground hover:border-primary/30 transition-premium">Back to Blog</Link>
      </div>
    );
  }

  const formattedDate = post.published_date ? new Date(post.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const heroImage = post.hero_image || post.cover_image;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero Banner */}
      {heroImage && (
        <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
          <img src={heroImage} alt={post.cover_alt_text || post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      <article className="px-4 md:px-8 pb-20 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-premium mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {post.category && <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</span>}
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mt-3 mb-5">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              {formattedDate && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formattedDate}</span>}
              {post.reading_time > 0 && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.reading_time} min read</span>}
            </div>

            {/* Fallback cover image if no hero banner */}
            {!post.hero_image && post.cover_image && (
              <div className="rounded-2xl overflow-hidden glass-card aspect-video mb-10">
                <img src={post.cover_image} alt={post.cover_alt_text || post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {post.excerpt && <p className="text-lg text-foreground/80 leading-relaxed mb-8 border-l-2 border-primary/40 pl-4">{post.excerpt}</p>}

            <div className="max-w-none space-y-4 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:text-foreground [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-muted-foreground [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_blockquote]:italic [&_code]:text-primary [&_code]:bg-primary/10 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_pre]:bg-surface [&_pre]:border [&_pre]:border-border [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_strong]:text-foreground [&_strong]:font-semibold [&_figure]:my-6 [&_img]:rounded-xl [&_img]:w-full">
              <ReactMarkdown
                components={{
                  img: ({ src, alt, title }) => (
                    <figure className="my-6">
                      <img src={src} alt={alt} title={title} className="rounded-xl w-full" loading="lazy" />
                      {(title || alt) && <figcaption className="text-sm text-muted-foreground text-center mt-3 italic">{title || alt}</figcaption>}
                    </figure>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Image Gallery */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="font-display font-bold text-xl text-foreground mb-6">Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {post.gallery.map((img, i) => (
                    <figure key={i} className="group">
                      <button onClick={() => setLightbox(img.url)} className="block w-full rounded-xl overflow-hidden glass-card">
                        <img src={img.url} alt={img.alt_text || img.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      </button>
                      {img.caption && <figcaption className="text-sm text-muted-foreground text-center mt-3 italic">{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
                {post.tags.map((tag, i) => <span key={i} className="flex items-center gap-1 text-xs text-muted-foreground"><Tag className="w-3 h-3" /> #{tag}</span>)}
              </div>
            )}
          </motion.div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link key={p.id} to={`/blog/${p.id}`} className="group glass-card overflow-hidden">
                    <div className="h-32 overflow-hidden">
                      {p.cover_image && <img src={p.cover_image} alt={p.cover_alt_text || p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-premium leading-snug">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh] rounded-2xl object-contain" />
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-foreground hover:text-primary transition-premium">✕</button>
        </div>
      )}
    </motion.div>
  );
}