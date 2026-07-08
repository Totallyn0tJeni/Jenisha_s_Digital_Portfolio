import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Pencil, X, Save, Star, Copy, FileArchive, FileText } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EmptyState from './EmptyState';

/**
 * Generic entity CRUD manager for the admin dashboard.
 * Supports: create, edit, delete, duplicate, publish/draft toggle, search, filter, status management.
 */
export default function AdminEntityManager({ entityName, title, fields, columns, defaultValues = {}, searchKeys = [], filterField }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultValues);
  const [filterValue, setFilterValue] = useState('');
  const [bulkSelect, setBulkSelect] = useState(false);
  const [selected, setSelected] = useState(new Set());

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await base44.entities[entityName].list('-updated_date', 200);
      setRecords(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleNew = () => { setFormData({ ...defaultValues }); setEditing(null); setShowForm(true); };

  const handleEdit = (record) => {
    const cleaned = {};
    fields.forEach((f) => { cleaned[f.name] = record[f.name] ?? defaultValues[f.name]; });
    setFormData(cleaned); setEditing(record); setShowForm(true);
  };

  const handleDuplicate = async (record) => {
    const copy = { ...record };
    delete copy.id; delete copy.created_date; delete copy.updated_date; delete copy.created_by_id;
    copy.title = (copy.title || copy.name || 'Item') + ' (Copy)';
    if ('status' in copy) copy.status = 'draft';
    try { await base44.entities[entityName].create(copy); loadData(); } catch (e) { alert('Duplicate failed: ' + (e.message || '')); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) { await base44.entities[entityName].update(editing.id, formData); }
      else { await base44.entities[entityName].create(formData); }
      setShowForm(false); loadData();
    } catch (e) { alert('Error saving: ' + (e.message || 'Unknown error')); }
    setSaving(false);
  };

  const handleDelete = async (record) => {
    if (!confirm(`Delete "${record[columns[0]?.key] || 'this record'}"? This cannot be undone.`)) return;
    try { await base44.entities[entityName].delete(record.id); loadData(); } catch (e) { alert('Error deleting: ' + (e.message || '')); }
  };

  const toggleField = async (record, fieldName) => {
    try { await base44.entities[entityName].update(record.id, { [fieldName]: !record[fieldName] }); loadData(); } catch (e) {}
  };

  const setStatus = async (record, status) => {
    try { await base44.entities[entityName].update(record.id, { status }); loadData(); } catch (e) {}
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selected.size} selected items? This cannot be undone.`)) return;
    for (const id of selected) { await base44.entities[entityName].delete(id); }
    setSelected(new Set()); setBulkSelect(false); loadData();
  };

  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const filtered = records.filter((r) => {
    const matchesSearch = !search || searchKeys.some((key) => String(r[key] || '').toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = !filterValue || String(r[filterField] || '') === filterValue;
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status) => {
    const styles = { published: 'bg-emerald-500/15 text-emerald-500', draft: 'bg-muted text-muted-foreground', archived: 'bg-rose-500/15 text-rose-400', scheduled: 'bg-amber-500/15 text-amber-500', active: 'bg-emerald-500/15 text-emerald-500' };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-muted text-muted-foreground'}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">{title}</h1>
          <p className="text-muted-foreground text-sm mt-1">{loading ? 'Loading...' : `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`}</p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button onClick={handleBulkDelete} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm bg-destructive/10 text-destructive hover:bg-destructive/20 transition-premium">
              <Trash2 className="w-4 h-4" /> Delete ({selected.size})
            </button>
          )}
          <button onClick={handleNew} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium" />
        </div>
        {filterField && (
          <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 transition-premium">
            <option value="">All</option>
            {fields.find((f) => f.name === filterField)?.options?.map((opt) => <option key={opt} value={opt} className="bg-surface">{opt}</option>)}
          </select>
        )}
        <button onClick={() => { setBulkSelect(!bulkSelect); setSelected(new Set()); }} className="px-4 py-2.5 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition-premium">
          {bulkSelect ? 'Cancel' : 'Select'}
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-muted/50 rounded animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="py-8">
            <EmptyState title={`Your first ${title.toLowerCase().replace(/s$/, '')} will appear here`} description="Click 'Add New' to create your first item." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {bulkSelect && <th className="px-4 py-3 w-10" />}
                  {columns.map((col) => <th key={col.key} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col.label}</th>)}
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-primary/3 transition">
                    {bulkSelect && (
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selected.has(record.id)} onChange={() => toggleSelect(record.id)} className="w-4 h-4 rounded accent-primary" />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-sm text-foreground">
                        {col.render ? col.render(record) : col.type === 'image' ? (
                          record[col.key] ? <img src={record[col.key]} alt="" className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">—</div>
                        ) : col.type === 'boolean' ? (
                          <span className={`px-2 py-0.5 rounded-full text-xs ${record[col.key] ? 'bg-emerald-500/15 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>{record[col.key] ? 'Yes' : 'No'}</span>
                        ) : (
                          <span className="truncate block max-w-xs">{String(record[col.key] ?? '—')}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">{statusBadge(record.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {columns.find((c) => c.toggleField) && (
                          <button onClick={() => toggleField(record, columns.find((c) => c.toggleField).toggleField)} className="p-1.5 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Toggle featured">
                            <Star className={`w-4 h-4 ${record[columns.find((c) => c.toggleField).toggleField] ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                        )}
                        {record.status !== undefined && (
                          record.status === 'published' || record.status === 'active' ? (
                            <button onClick={() => setStatus(record, 'draft')} className="p-1.5 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-muted-foreground transition-premium" title="Unpublish"><FileArchive className="w-4 h-4" /></button>
                          ) : (
                            <button onClick={() => setStatus(record, 'published')} className="p-1.5 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-emerald-500 transition-premium" title="Publish"><FileText className="w-4 h-4" /></button>
                          )
                        )}
                        <button onClick={() => handleDuplicate(record)} className="p-1.5 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Duplicate"><Copy className="w-4 h-4" /></button>
                        <button onClick={() => handleEdit(record)} className="p-1.5 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Edit"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(record)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-premium" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="bg-surface-elevated rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-hide border border-border shadow-soft" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-surface-elevated p-6 border-b border-border flex items-center justify-between z-10">
                <h2 className="font-display font-bold text-xl text-foreground">{editing ? 'Edit' : 'New'} {title.slice(0, -1).replace(/s$/, '')}</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                {fields.map((field) => <FormField key={field.name} field={field} value={formData[field.name]} onChange={(val) => setFormData({ ...formData, [field.name]: val })} />)}
              </div>
              <div className="sticky bottom-0 bg-surface-elevated p-6 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-full text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium disabled:opacity-50">
                  {saving ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormField({ field, value, onChange }) {
  if (field.type === 'text' || field.type === 'url' || field.type === 'date' || field.type === 'number') {
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}{field.required && ' *'}</label>
        <input type={field.type === 'url' ? 'text' : field.type} value={value ?? ''} onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)} placeholder={field.placeholder} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium" />
      </div>
    );
  }
  if (field.type === 'textarea') {
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}{field.required && ' *'}</label>
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} rows={field.rows || 4} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium resize-none" />
      </div>
    );
  }
  if (field.type === 'richtext') {
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}</label>
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Markdown or rich text..." rows={8} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium resize-y font-mono" />
      </div>
    );
  }
  if (field.type === 'select') {
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}{field.required && ' *'}</label>
        <select value={value || ''} onChange={(e) => onChange(e.target.value)} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-premium">
          <option value="" className="bg-surface">Select...</option>
          {field.options.map((opt) => <option key={opt} value={opt} className="bg-surface">{opt}</option>)}
        </select>
      </div>
    );
  }
  if (field.type === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(!value)} className={`relative w-11 h-6 rounded-full transition-premium ${value ? 'bg-primary' : 'bg-muted'}`}>
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
        <label className="text-sm text-foreground">{field.label}</label>
      </div>
    );
  }
  if (field.type === 'tags' || field.type === 'gallery') {
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(value || []).map((item, i) => (
            <span key={i} className="skill-tag flex items-center gap-1">{item}<button onClick={() => onChange((value || []).filter((_, idx) => idx !== i))} className="text-primary hover:text-destructive">×</button></span>
          ))}
        </div>
        <input type="text" placeholder={field.placeholder || 'Type and press Enter...'} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const val = e.target.value.trim(); if (val) { onChange([...(value || []), val]); e.target.value = ''; } } }} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium" />
      </div>
    );
  }
  if (field.type === 'image-gallery') {
    const items = value || [];
    const updateItem = (i, key, val) => { const next = [...items]; next[i] = { ...next[i], [key]: val }; onChange(next); };
    const addItem = () => onChange([...items, { url: '', caption: '', alt_text: '' }]);
    const removeItem = (i) => onChange(items.filter((_, idx) => idx !== i));
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}</label>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="p-3 rounded-xl border border-border bg-surface space-y-2">
              <div className="flex gap-2">
                <input type="text" value={item.url || ''} onChange={(e) => updateItem(i, 'url', e.target.value)} placeholder="Image URL" className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                <button type="button" onClick={() => removeItem(i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
              </div>
              {item.url && <img src={item.url} alt={item.alt_text || ''} className="w-full h-32 object-cover rounded-lg border border-border" />}
              <input type="text" value={item.caption || ''} onChange={(e) => updateItem(i, 'caption', e.target.value)} placeholder="Caption (optional)" className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
              <input type="text" value={item.alt_text || ''} onChange={(e) => updateItem(i, 'alt_text', e.target.value)} placeholder="Alt text (accessibility)" className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
            </div>
          ))}
          <button type="button" onClick={addItem} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-4 h-4" /> Add Image</button>
        </div>
      </div>
    );
  }
  if (field.type === 'image') {
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}</label>
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Image URL (https://...)" className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium mb-2" />
        {value ? <img src={value} alt="" className="w-24 h-24 rounded-xl object-cover border border-border" /> : <div className="w-24 h-24 rounded-xl border-2 border-dashed border-primary/25 flex items-center justify-center text-muted-foreground text-xs">No image</div>}
      </div>
    );
  }
  if (field.type === 'links') {
    const links = value || {};
    const linkFields = [
      { key: 'github', label: 'GitHub URL' },
      { key: 'demo', label: 'Demo URL' },
      { key: 'slides', label: 'Slides URL' },
      { key: 'documentation', label: 'Documentation URL' },
      { key: 'external', label: 'External URL' },
    ];
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}</label>
        <div className="space-y-2">
          {linkFields.map((lf) => (
            <div key={lf.key}>
              <input type="text" value={links[lf.key] || ''} onChange={(e) => onChange({ ...links, [lf.key]: e.target.value })} placeholder={lf.label} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (field.type === 'metrics-list') {
    const items = value || [];
    const updateItem = (i, key, val) => { const next = [...items]; next[i] = { ...next[i], [key]: val }; onChange(next); };
    const addItem = () => onChange([...items, { label: '', value: '' }]);
    const removeItem = (i) => onChange(items.filter((_, idx) => idx !== i));
    return (
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">{field.label}</label>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={item.value || ''} onChange={(e) => updateItem(i, 'value', e.target.value)} placeholder="Value (e.g. 50K+)" className="w-28 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
              <input type="text" value={item.label || ''} onChange={(e) => updateItem(i, 'label', e.target.value)} placeholder="Label (e.g. Impressions)" className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
              <button type="button" onClick={() => removeItem(i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-4 h-4" /> Add Metric</button>
        </div>
      </div>
    );
  }
  return null;
}