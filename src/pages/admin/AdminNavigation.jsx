import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pencil, X, Save, GripVertical, Eye, EyeOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EmptyState from '@/components/EmptyState';

export default function AdminNavigation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ label: '', path: '/', icon: '', group: 'main', is_visible: true, is_external: false, order: 0 });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.NavigationItem.list('order', 100);
      setItems(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async () => {
    try {
      if (editing) { await base44.entities.NavigationItem.update(editing.id, formData); }
      else { await base44.entities.NavigationItem.create(formData); }
      setShowForm(false); loadData();
    } catch (e) { alert('Error: ' + (e.message || '')); }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.label}"?`)) return;
    await base44.entities.NavigationItem.delete(item.id);
    loadData();
  };

  const toggleVisible = async (item) => {
    await base44.entities.NavigationItem.update(item.id, { is_visible: !item.is_visible });
    loadData();
  };

  const groups = { main: 'Main Nav', explore: 'Explore', footer: 'Footer', social: 'Social' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">Navigation</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage navbar and footer links.</p>
        </div>
        <button onClick={() => { setFormData({ label: '', path: '/', icon: '', group: 'main', is_visible: true, is_external: false, order: items.length }); setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
          <Plus className="w-4 h-4" /> Add Link
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-14 rounded-xl shimmer" />)}</div>
      ) : items.length === 0 ? (
        <EmptyState title="Add your first navigation link" description="Links will appear in the navbar and footer." />
      ) : (
        Object.entries(groups).map(([groupKey, groupLabel]) => {
          const groupItems = items.filter((i) => i.group === groupKey);
          if (groupItems.length === 0) return null;
          return (
            <div key={groupKey}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">{groupLabel}</h3>
              <div className="space-y-2">
                {groupItems.map((item) => (
                  <div key={item.id} className="glass-card p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground/40" />
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.path} {item.is_external && '· External'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleVisible(item)} className="p-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title={item.is_visible ? 'Hide' : 'Show'}>
                        {item.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => { setFormData(item); setEditing(item); setShowForm(true); }} className="p-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-premium" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-surface-elevated rounded-2xl w-full max-w-md border border-border shadow-soft" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-foreground">{editing ? 'Edit' : 'New'} Link</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Label</label>
                  <input value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="Home" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Path</label>
                  <input value={formData.path} onChange={(e) => setFormData({ ...formData, path: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="/ or https://..." />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Icon (lucide name)</label>
                  <input value={formData.icon || ''} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="Home" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Group</label>
                  <select value={formData.group} onChange={(e) => setFormData({ ...formData, group: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50">
                    <option value="main">Main Nav</option>
                    <option value="explore">Explore</option>
                    <option value="footer">Footer</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setFormData({ ...formData, is_visible: !formData.is_visible })} className={`relative w-11 h-6 rounded-full transition ${formData.is_visible ? 'bg-primary' : 'bg-muted'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${formData.is_visible ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                    <label className="text-sm text-foreground">Visible</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setFormData({ ...formData, is_external: !formData.is_external })} className={`relative w-11 h-6 rounded-full transition ${formData.is_external ? 'bg-primary' : 'bg-muted'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${formData.is_external ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                    <label className="text-sm text-foreground">External</label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-full text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium">Cancel</button>
                <button onClick={handleSave} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium"><Save className="w-4 h-4" /> Save</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}