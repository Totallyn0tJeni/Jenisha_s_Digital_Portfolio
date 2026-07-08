import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, ImageUp, FileDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const loadData = async () => {
    try {
      const items = await base44.entities.SiteSettings.list('-updated_date', 1);
      if (items[0]) {
        setSettings(items[0]);
      } else {
        const created = await base44.entities.SiteSettings.create({ site_name: 'Jenisha Patel' });
        setSettings(created);
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.entities.SiteSettings.update(settings.id, settings);
    } catch (e) { alert('Error: ' + (e.message || '')); }
    setSaving(false);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setSettings({ ...settings, logo_url: file_url });
      await base44.entities.SiteSettings.update(settings.id, { logo_url: file_url });
    } catch (e) { alert('Upload failed: ' + (e.message || '')); }
    setUploadingLogo(false);
  };

  const updateSocialLink = (index, field, value) => {
    const links = [...(settings.social_links || [])];
    links[index] = { ...links[index], [field]: value };
    setSettings({ ...settings, social_links: links });
  };

  const addSocialLink = () => {
    const links = [...(settings.social_links || []), { platform: '', url: '', icon: 'Globe' }];
    setSettings({ ...settings, social_links: links });
  };

  const removeSocialLink = (index) => {
    const links = (settings.social_links || []).filter((_, i) => i !== index);
    setSettings({ ...settings, social_links: links });
  };

  const updateStat = (field, index, key, value) => {
    const stats = [...(settings[field] || [])];
    stats[index] = { ...stats[index], [key]: value };
    setSettings({ ...settings, [field]: stats });
  };

  const addStat = (field) => {
    const stats = [...(settings[field] || []), { label: '', value: '' }];
    setSettings({ ...settings, [field]: stats });
  };

  const removeStat = (field, index) => {
    const stats = (settings[field] || []).filter((_, i) => i !== index);
    setSettings({ ...settings, [field]: stats });
  };

  const updateQuickFact = (index, field, value) => {
    const facts = [...(settings.quick_facts || [])];
    facts[index] = { ...facts[index], [field]: value };
    setSettings({ ...settings, quick_facts: facts });
  };

  const addQuickFact = () => {
    const facts = [...(settings.quick_facts || []), { label: '', value: '' }];
    setSettings({ ...settings, quick_facts: facts });
  };

  const removeQuickFact = (index) => {
    const facts = (settings.quick_facts || []).filter((_, i) => i !== index);
    setSettings({ ...settings, quick_facts: facts });
  };

  const updatePrinciple = (index, field, value) => {
    const principles = [...(settings.principles || [])];
    principles[index] = { ...principles[index], [field]: value };
    setSettings({ ...settings, principles });
  };

  const addPrinciple = () => {
    const principles = [...(settings.principles || []), { icon: 'Search', title: '', description: '' }];
    setSettings({ ...settings, principles });
  };

  const removePrinciple = (index) => {
    const principles = (settings.principles || []).filter((_, i) => i !== index);
    setSettings({ ...settings, principles });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setSettings({ ...settings, resume_pdf_url: file_url });
      await base44.entities.SiteSettings.update(settings.id, { resume_pdf_url: file_url });
    } catch (e) { alert('Upload failed: ' + (e.message || '')); }
  };

  if (!settings) {
    return <div className="min-h-[40vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-foreground">Site Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure your brand, hero, and global content.</p>
      </div>

      {/* Branding */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Branding</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Logo</label>
              {settings.logo_url ? (
                <div className="flex items-center gap-3">
                  <img src={settings.logo_url} alt="Logo" className="h-12 w-auto" />
                  <button onClick={() => setSettings({ ...settings, logo_url: null })} className="text-sm text-destructive hover:text-destructive/80">Remove</button>
                </div>
              ) : (
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium cursor-pointer">
                  <ImageUp className="w-4 h-4" /> {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                </label>
              )}
              <p className="text-xs text-muted-foreground mt-1">Leave empty to show your name elegantly.</p>
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Site Name</label>
            <input value={settings.site_name || ''} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Tagline</label>
            <input value={settings.tagline || ''} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">SEO Description</label>
            <textarea value={settings.description || ''} onChange={(e) => setSettings({ ...settings, description: e.target.value })} rows={2} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Hero Title</label>
            <input value={settings.hero_title || ''} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Hero Subtitle</label>
            <textarea value={settings.hero_subtitle || ''} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} rows={2} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Hero Image URL</label>
            <input value={settings.hero_image_url || ''} onChange={(e) => setSettings({ ...settings, hero_image_url: e.target.value })} placeholder="https://..." className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Social Links</h3>
          <button onClick={addSocialLink} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="space-y-3">
          {(settings.social_links || []).map((link, i) => (
            <div key={i} className="flex gap-2">
              <input value={link.platform || ''} onChange={(e) => updateSocialLink(i, 'platform', e.target.value)} placeholder="Platform" className="flex-1 bg-surface border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
              <input value={link.url || ''} onChange={(e) => updateSocialLink(i, 'url', e.target.value)} placeholder="https://..." className="flex-1 bg-surface border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
              <input value={link.icon || ''} onChange={(e) => updateSocialLink(i, 'icon', e.target.value)} placeholder="Icon" className="w-28 bg-surface border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
              <button onClick={() => removeSocialLink(i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-premium"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          {(!settings.social_links || settings.social_links.length === 0) && <p className="text-sm text-muted-foreground/50 italic">No social links added yet.</p>}
        </div>
      </div>

      {/* Footer */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Footer</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Footer CTA Title</label>
            <input value={settings.footer_cta_title || ''} onChange={(e) => setSettings({ ...settings, footer_cta_title: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Footer CTA Subtitle</label>
            <textarea value={settings.footer_cta_subtitle || ''} onChange={(e) => setSettings({ ...settings, footer_cta_subtitle: e.target.value })} rows={2} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Footer Copyright Text</label>
            <input value={settings.footer_text || ''} onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
        </div>
      </div>

      {/* About Page */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">About Page</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">About Hero Title</label>
            <input value={settings.about_hero_title || ''} onChange={(e) => setSettings({ ...settings, about_hero_title: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">About Hero Subtitle</label>
            <textarea value={settings.about_hero_subtitle || ''} onChange={(e) => setSettings({ ...settings, about_hero_subtitle: e.target.value })} rows={2} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Biography (separate paragraphs with blank lines)</label>
            <textarea value={settings.about_bio || ''} onChange={(e) => setSettings({ ...settings, about_bio: e.target.value })} rows={6} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 resize-y" />
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Quick Facts</h4>
            <button onClick={addQuickFact} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-4 h-4" /> Add</button>
          </div>
          <div className="space-y-2">
            {(settings.quick_facts || []).map((fact, i) => (
              <div key={i} className="flex gap-2">
                <input value={fact.label || ''} onChange={(e) => updateQuickFact(i, 'label', e.target.value)} placeholder="Label (e.g. Studying)" className="w-32 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                <input value={fact.value || ''} onChange={(e) => updateQuickFact(i, 'value', e.target.value)} placeholder="Value" className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                <button onClick={() => removeQuickFact(i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">How I Work — Principles</h4>
            <button onClick={addPrinciple} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-4 h-4" /> Add</button>
          </div>
          <div className="space-y-3">
            {(settings.principles || []).map((p, i) => (
              <div key={i} className="p-3 rounded-xl border border-border bg-surface space-y-2">
                <div className="flex gap-2">
                  <input value={p.icon || ''} onChange={(e) => updatePrinciple(i, 'icon', e.target.value)} placeholder="Icon (Search, Users, Camera, TrendingUp)" className="w-44 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <input value={p.title || ''} onChange={(e) => updatePrinciple(i, 'title', e.target.value)} placeholder="Title" className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <button onClick={() => removePrinciple(i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
                <textarea value={p.description || ''} onChange={(e) => updatePrinciple(i, 'description', e.target.value)} placeholder="Description" rows={2} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homepage Stats */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Homepage Stats</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">Primary Stats (hero section)</h4>
              <button onClick={() => addStat('stats')} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-4 h-4" /> Add</button>
            </div>
            <div className="space-y-2">
              {(settings.stats || []).map((stat, i) => (
                <div key={i} className="flex gap-2">
                  <input value={stat.value || ''} onChange={(e) => updateStat('stats', i, 'value', e.target.value)} placeholder="Value (e.g. 5+)" className="w-24 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <input value={stat.label || ''} onChange={(e) => updateStat('stats', i, 'label', e.target.value)} placeholder="Label" className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <button onClick={() => removeStat('stats', i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">Secondary Stats (about preview)</h4>
              <button onClick={() => addStat('secondary_stats')} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-4 h-4" /> Add</button>
            </div>
            <div className="space-y-2">
              {(settings.secondary_stats || []).map((stat, i) => (
                <div key={i} className="flex gap-2">
                  <input value={stat.value || ''} onChange={(e) => updateStat('secondary_stats', i, 'value', e.target.value)} placeholder="Value" className="w-24 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <input value={stat.label || ''} onChange={(e) => updateStat('secondary_stats', i, 'label', e.target.value)} placeholder="Label" className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <button onClick={() => removeStat('secondary_stats', i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resume */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Resume</h3>
        <div className="space-y-3">
          {settings.resume_pdf_url ? (
            <div className="flex items-center gap-3">
              <a href={settings.resume_pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium">
                <FileDown className="w-4 h-4" /> View Current Resume
              </a>
              <button onClick={() => setSettings({ ...settings, resume_pdf_url: null })} className="text-sm text-destructive hover:text-destructive/80">Remove</button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass text-foreground hover:border-primary/30 transition-premium cursor-pointer">
              <FileDown className="w-4 h-4" /> Upload Resume PDF
              <input type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
            </label>
          )}
          <input value={settings.resume_pdf_url || ''} onChange={(e) => setSettings({ ...settings, resume_pdf_url: e.target.value })} placeholder="Or paste PDF URL" className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      {/* Theme */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Theme</h3>
        <div>
          <label className="text-sm text-muted-foreground block mb-1.5">Default Theme</label>
          <select value={settings.theme_default || 'light'} onChange={(e) => setSettings({ ...settings, theme_default: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium disabled:opacity-50">
          {saving ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>
    </div>
  );
}