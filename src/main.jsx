import { motion } from 'framer-motion';

export default function QuoteSection({ config = {}, section }) {
  const quote = config.quote || section?.title;
  const author = config.author;
  const role = config.role;

  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {quote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-semibold text-2xl md:text-4xl text-foreground leading-tight"
          >
            "{quote}"
          </motion.blockquote>
        )}
        {author && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <p className="text-primary font-semibold">{author}</p>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
          </motion.div>
        )}
        {!quote && <p className="text-muted-foreground/50 italic">A quote will appear here once added.</p>}
      </div>
    </section>
  );
}