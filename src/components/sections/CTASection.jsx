import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-3 ${alignment}`}>
      
      {eyebrow &&
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</span>
      }
      <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight max-w-3xl">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed py-2">{subtitle}</p>}
    </motion.div>);

}