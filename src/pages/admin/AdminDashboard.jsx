import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Image, Mail, Users, TrendingUp, Plus, Settings } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ work: 0, blog: 0, photos: 0, messages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [work, blog, photos, messages] = await Promise.all([
          base44.entities.Work.list('-updated_date', 1).catch(() => []),
          base44.entities.BlogPost.list('-updated_date', 1).catch(() => []),
          base44.entities.Photo.list('-updated_date', 1).catch(() => []),
          base44.entities.ContactMessage.list('-created_date', 5).catch(() => []),
        ]);
        setStats({
          work: await base44.entities.Work.list('-updated_date', 200).then((r) => r.length).catch(() => 0),
          blog: await base44.entities.BlogPost.list('-updated_date', 200).then((r) => r.length).catch(() => 0),
          photos: await base44.entities.Photo.list('-updated_date', 200).then((r) => r.length).catch(() => 0),
          messages: messages.length,
        });
        setRecentMessages(messages);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: 'Work', value: stats.work, icon: Briefcase, path: '/admin/work', color: 'text-violet-400' },
    { label: 'Blog Posts', value: stats.blog, icon: FileText, path: '/admin/blog', color: 'text-blue-400' },
    { label: 'Photos', value: stats.photos, icon: Image, path: '/admin/photography', color: 'text-emerald-400' },
    { label: 'Messages', value: stats.messages, icon: Mail, path: '/admin/messages', color: 'text-amber-400' },
  ];

  const quickActions = [
    { label: 'Add Work', path: '/admin/work' },
    { label: 'Write Blog', path: '/admin/blog' },
    { label: 'Upload Photos', path: '/admin/photography' },
    { label: 'Edit Navigation', path: '/admin/navigation' },
    { label: 'Site Settings', path: '/admin/settings' },
    { label: 'Pages', path: '/admin/pages' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome to your personal brand platform.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <Link key={i} to={card.path} className="glass-card p-5 group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground/40" />
            </div>
            <div className="text-3xl font-display font-bold text-foreground">{loading ? '—' : card.value}</div>
            <p className="text-sm text-muted-foreground mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent activity + Quick actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">Recent Messages</h3>
          {recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <Link key={msg.id} to="/admin/messages" className="block p-3 rounded-xl bg-surface border border-border hover:border-primary/30 transition-premium">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground text-sm">{msg.name}</p>
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{msg.subject || msg.message}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground/50 italic py-6 text-center">No messages yet.</p>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.path} className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-border hover:border-primary/30 transition-premium text-sm font-medium text-foreground group">
                <Plus className="w-4 h-4 text-primary" /> {action.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Link to="/admin/settings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-premium">
              <Settings className="w-4 h-4" /> Configure your site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}