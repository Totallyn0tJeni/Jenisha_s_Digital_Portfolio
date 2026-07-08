import SectionHeading from '../SectionHeading';

export default function VideoSection({ config = {}, section }) {
  const url = config.url;
  const title = config.title || section?.title;

  if (!url) {
    return (
      <section className="py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {title && <SectionHeading title={title} />}
          <div className="aspect-video rounded-2xl bg-surface border-2 border-dashed border-primary/25 flex items-center justify-center text-muted-foreground/50">
            Video will appear here once a URL is added.
          </div>
        </div>
      </section>
    );
  }

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const embedUrl = isYouTube
    ? url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
    : url;

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {title && <SectionHeading title={title} />}
        <div className="aspect-video rounded-2xl overflow-hidden glass-card">
          <iframe src={embedUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={title || 'Video'} />
        </div>
      </div>
    </section>
  );
}