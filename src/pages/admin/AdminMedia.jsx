import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ImageUp, Trash2, Search, FolderPlus } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EmptyState from '@/components/EmptyState';

export default function AdminMedia() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.MediaAsset.list('-updated_date', 200);
      setAssets(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : file.type === 'application/pdf' ? 'pdf' : 'document';
        await base44.entities.MediaAsset.create({ file_url, file_name: file.name, file_type: fileType, size_bytes: file.size, folder: 'uploads', status: 'active' });
      } catch (err) { console.error(err); }
    }
    loadData();
    setUploading(false);
  };

  const handleDelete = async (asset) => {
    if (!confirm(`Delete "${asset.file_name || 'this asset'}"?`)) return;
    await base44.entities.MediaAsset.delete(asset.id);
    loadData();
  };

  const filtered = assets.filter((a) => {
    const matchesFilter = filter === 'all' || a.file_type === filter;
    const matchesSearch = !search || (a.file_name || '').toLowerCase().includes(search.toLowerCase()) || (a.alt_text || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = ['all', 'image', 'video', 'pdf', 'document'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">Media Library</h1>
          <p className="text-muted-foreground text-sm mt-1">All your uploaded files in one place.</p>
        </div>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium cursor-pointer">
          <ImageUp className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium" />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-premium ${filter === f ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>{f}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">{[...Array(10)].map((_, i) => <div key={i} className="aspect-square rounded-xl shimmer" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState title="Upload your first file" description="Images, videos, PDFs, and documents — all in your media library." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filtered.map((asset, i) => (
            <motion.div key={asset.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="group relative aspect-square rounded-xl overflow-hidden glass-card">
              {asset.file_type === 'image' ? (
                <img src={asset.file_url} alt={asset.alt_text || asset.file_name || ''} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-3 text-center">
                  <div className="text-3xl mb-2">{asset.file_type === 'pdf' ? '📕' : asset.file_type === 'video' ? '🎬' : '📄'}</div>
                  <p className="text-xs truncate w-full">{asset.file_name}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-premium flex flex-col items-center justify-center gap-2 p-3">
                <p className="text-xs text-foreground truncate w-full text-center">{asset.file_name}</p>
                {asset.alt_text && <p className="text-xs text-muted-foreground truncate w-full text-center">{asset.alt_text}</p>}
                <button onClick={() => handleDelete(asset)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-premium"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}