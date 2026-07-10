import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import { work as workData } from '@/data/work';

export default function Speaking() {
  const events = workData.filter((w) => w.work_type === 'speaking_engagement');

  const upcoming = events.filter((e) => !e.date || new Date(e.date) >= new Date());
  const past = events.filter((e) => e.date && new Date(e.date) < new Date());

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="On Stage" title="Speaking & Events" subtitle="Talks, workshops, panels, and appearances." />

          {events.length > 0 ? (
            <>
              {upcoming.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-5">Upcoming</h3>
                  <div className="space-y-4">
                    {upcoming.map((event, i) => <EventCard key={event.id} event={event} />)}
                  </div>
                </div>
              )}
              {past.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-5">Past Events</h3>
                  <div className="space-y-4">
                    {past.map((event, i) => <EventCard key={event.id} event={event} past />)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState title="Add your first speaking event" description="Your talks and appearances will appear here once added." />
          )}
        </div>
      </section>
    </motion.div>
  );
}

function EventCard({ event, past = false }) {
  const date = event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">{event.title}</h3>
          {event.tagline && <p className="text-sm text-primary mt-0.5">{event.tagline}</p>}
          {date && <p className="text-xs text-muted-foreground mt-1">{date}{past ? ' · Past' : ''}</p>}
        </div>
        {event.location && <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>}
      </div>
      {event.description && <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{event.description}</p>}
      {event.links && (
        <div className="flex flex-wrap gap-3 mt-4">
          {event.links.recording_url && <a href={event.links.recording_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80">Watch recording →</a>}
          {event.links.slides_url && <a href={event.links.slides_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80">View slides →</a>}
        </div>
      )}
    </motion.div>
  );
}