import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

export default function TextSection({ config = {}, section }) {
  const content = config.content || '';
  const title = section?.title;

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {title && <SectionHeading title={title} align="left" />}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="prose prose-lg max-w-none"
        >
          {content ? (
            <p className="text-foreground/80 text-lg leading-relaxed whitespace-pre-wrap">{content}</p>
          ) : (
            <p className="text-muted-foreground/50 italic">This section will be filled with content from the CMS.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}