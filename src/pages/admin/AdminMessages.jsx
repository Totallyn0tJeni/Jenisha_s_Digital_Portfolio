import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Trash2, MailOpen, Archive, Reply } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EmptyState from '@/components/EmptyState';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.ContactMessage.list('-created_date', 100);
      setMessages(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const markRead = async (msg) => {
    await base44.entities.ContactMessage.update(msg.id, { is_read: true, status: 'read' });
    loadData();
  };

  const handleDelete = async (msg) => {
    if (!confirm(`Delete message from ${msg.name}?`)) return;
    await base44.entities.ContactMessage.delete(msg.id);
    setSelected(null);
    loadData();
  };

  const archive = async (msg) => {
    await base44.entities.ContactMessage.update(msg.id, { status: 'archived' });
    setSelected(null);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Contact form submissions from your site.</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-xl shimmer" />)}</div>
      ) : messages.length === 0 ? (
        <EmptyState title="No messages yet" description="Messages from your contact form will appear here." />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2 max-h-[70vh] overflow-y-auto scrollbar-thin">
            {messages.map((msg) => (
              <button key={msg.id} onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg); }} className={`w-full text-left p-4 rounded-xl border transition-premium ${selected?.id === msg.id ? 'bg-primary/10 border-primary/30' : 'glass-card'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground text-sm">{msg.name}</p>
                  {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">{msg.subject || msg.message}</p>
              </button>
            ))}
          </div>

          <div className="md:col-span-2">
            {selected ? (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{selected.name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-sm text-primary">{selected.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`} className="p-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Reply"><Reply className="w-4 h-4" /></a>
                    <button onClick={() => archive(selected)} className="p-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Archive"><Archive className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(selected)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-premium" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                {selected.subject && <p className="text-sm font-medium text-foreground mb-3">{selected.subject}</p>}
                <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{selected.message}</p>
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Mail className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground/50">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}