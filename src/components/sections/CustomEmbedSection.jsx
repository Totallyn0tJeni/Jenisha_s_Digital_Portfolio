import SectionHeading from '../SectionHeading';

export default function CustomEmbedSection({ config = {}, section }) {
  const html = config.html || config.url;

  if (!html) {
    return (
      <section className="py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {section?.title && <SectionHeading title={section.title} />}
          <div className="rounded-2xl bg-surface border-2 border-dashed border-primary/25 p-12 text-center text-muted-foreground/50">
            Embed content will appear here once HTML is added.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {section?.title && <SectionHeading title={section.title} />}
        <div className="rounded-2xl overflow-hidden glass-card" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}