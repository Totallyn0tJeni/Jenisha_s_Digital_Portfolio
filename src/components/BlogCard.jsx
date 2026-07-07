import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

export default function BlogCard({ post, index = 0 }) {
  const formattedDate = post.published_date
    ? new Date(post.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/blog/${post.id}`} className="group glass-card overflow-hidden block h-full">
        <div className="relative h-44 overflow-hidden">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-600/20 to-cyan-600/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B14] via-transparent to-transparent opacity-50" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-200 border border-violet-500/30 backdrop-blur-md">
            {post.category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {formattedDate}
              </span>
            )}
            {post.reading_time > 0 && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.reading_time} min read
              </span>
            )}
          </div>
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              {post.tags.map((tag, i) => (
                <span key={i} className="text-xs text-violet-400/80">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}