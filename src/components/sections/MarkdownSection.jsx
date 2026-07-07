import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function MarkdownSection({ config = {}, section }) {
  const content = config.content || '';

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {section?.title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-4xl text-foreground mb-8"
          >
            {section.title}
          </motion.h2>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-none space-y-4 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:text-foreground [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-muted-foreground [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_blockquote]:italic [&_code]:text-primary [&_code]:bg-primary/10 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_pre]:bg-surface [&_pre]:border [&_pre]:border-border [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_strong]:text-foreground [&_strong]:font-semibold"
        >
          {content ? <ReactMarkdown>{content}</ReactMarkdown> : <p className="text-muted-foreground/50 italic">Markdown content will appear here once added in the CMS.</p>}
        </motion.div>
      </div>
    </section>
  );
}