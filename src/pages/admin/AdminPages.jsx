import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pencil, X, Save, Eye, EyeOff, GripVertical } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EmptyState from '@/components/EmptyState';
import { SECTION_TYPES } from '@/components/sections';

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [showPageForm, setShowPageForm] = useState(false);
  const [pageFormData, setPageFormData] = useState({ title: '', slug: '', route_path: '/', status: 'draft' });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Page.list('order', 50);
      setPages(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleSavePage = async () => {
    try {
      if (editingPage) { await base44.entities.Page.update(editingPage.id, pageFormData); }
      else {
        const route = pageFormData.route_path || (pageFormData.slug === 'home' ? '/' : `/p/${pageFormData.slug}`);
        await base44.entities.Page.create({ ...pageFormData, route_path: route, page_type: 'builder', sections: [] });
      }
      setShowPageForm(false); loadData();
    } catch (e) { alert('Error: ' + (e.message || '')); }
  };

  const handleDelete = async (page) => {
    if (!confirm(`Delete "${page.title}"? This removes the page and all its sections.`)) return;
    await base44.entities.Page.delete(page.id);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">Pages</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your site pages and their sections.</p>
        </div>
        <button onClick={() => { setPageFormData({ title: '', slug: '', route_path: '/', status: 'draft' }); setEditingPage(null); setShowPageForm(true); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
          <Plus className="w-4 h-4" /> New Page
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-xl shimmer" />)}</div>
      ) : pages.length === 0 ? (
        <EmptyState title="Create your first page" description="Pages are built from CMS-driven sections." />
      ) : (
        <div className="space-y-3">
          {pages.map((page, i) => (
            <motion.div key={page.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-semibold text-lg text-foreground">{page.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${page.status === 'published' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>{page.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{page.route_path || '/p/' + page.slug} · {(page.sections || []).length} sections</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setPageFormData(page); setEditingPage(page); setShowPageForm(true); }} className="p-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Edit"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(page)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-premium" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showPageForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm" onClick={() => setShowPageForm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-surface-elevated rounded-2xl w-full max-w-md border border-border shadow-soft" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-foreground">{editingPage ? 'Edit' : 'New'} Page</h2>
                <button onClick={() => setShowPageForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Title</label>
                  <input value={pageFormData.title} onChange={(e) => setPageFormData({ ...pageFormData, title: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="About" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Slug</label>
                  <input value={pageFormData.slug} onChange={(e) => setPageFormData({ ...pageFormData, slug: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="about" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Route Path</label>
                  <input value={pageFormData.route_path} onChange={(e) => setPageFormData({ ...pageFormData, route_path: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="/ or /p/my-page" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Status</label>
                  <select value={pageFormData.status} onChange={(e) => setPageFormData({ ...pageFormData, status: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowPageForm(false)} className="px-5 py-2.5 rounded-full text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium">Cancel</button>
                <button onClick={handleSavePage} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium"><Save className="w-4 h-4" /> Save</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}