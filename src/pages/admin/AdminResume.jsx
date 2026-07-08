import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileDown, Star, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EmptyState from '@/components/EmptyState';

export default function AdminResume() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [versionLabel, setVersionLabel] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Resume.list('-uploaded_date', 20);
      setResumes(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const label = versionLabel || file.name.replace('.pdf', '');
      await base44.entities.Resume.create({
        version_label: label,
        file_url,
        uploaded_date: new Date().toISOString().split('T')[0],
        is_active: false,
        status: 'active',
      });
      setVersionLabel('');
      loadData();
    } catch (e) { alert('Upload failed: ' + (e.message || '')); }
    setUploading(false);
  };

  const setActive = async (resume) => {
    // Unset all others first
    for (const r of resumes) {
      if (r.is_active) await base44.entities.Resume.update(r.id, { is_active: false });
    }
    await base44.entities.Resume.update(resume.id, { is_active: true });
    // Update SiteSettings resume_pdf_url
    try {
      const settings = await base44.entities.SiteSettings.list('-updated_date', 1);
      if (settings[0]) {
        await base44.entities.SiteSettings.update(settings[0].id, { resume_pdf_url: resume.file_url });
      } else {
        await base44.entities.SiteSettings.create({ site_name: 'Jenisha Patel', resume_pdf_url: resume.file_url });
      }
    } catch (e) { console.error(e); }
    loadData();
  };

  const handleDelete = async (resume) => {
    if (!confirm(`Delete "${resume.version_label}"?`)) return;
    await base44.entities.Resume.delete(resume.id);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-foreground">Resume Manager</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload and manage your resume versions.</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Upload New Version</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={versionLabel} onChange={(e) => setVersionLabel(e.target.value)} placeholder="Version label (e.g., 'July 2026')" className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium cursor-pointer">
            <FileUp className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload PDF'}
            <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(2)].map((_, i) => <div key={i} className="h-20 rounded-xl shimmer" />)}</div>
      ) : resumes.length > 0 ? (
        <div className="space-y-3">
          {resumes.map((resume, i) => (
            <motion.div key={resume.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><FileDown className="w-6 h-6" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{resume.version_label}</h3>
                    {resume.is_active && <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500">Active</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{resume.uploaded_date ? new Date(resume.uploaded_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!resume.is_active && (
                  <button onClick={() => setActive(resume)} className="p-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Set active"><Star className="w-4 h-4" /></button>
                )}
                <a href={resume.file_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-premium" title="Download"><FileDown className="w-4 h-4" /></a>
                <button onClick={() => handleDelete(resume)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-premium" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState title="Upload your resume" description="Upload a PDF to make it available for download on your site." />
      )}
    </div>
  );
}