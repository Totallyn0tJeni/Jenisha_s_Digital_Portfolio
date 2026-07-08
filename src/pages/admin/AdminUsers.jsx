import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import EmptyState from '@/components/EmptyState';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('user');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.User.list('-created_date', 50);
        setUsers(data);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setInviting(true);
    try {
      await base44.users.inviteUser(inviteEmail, inviteRole);
      setInviteEmail('');
      alert('Invitation sent to ' + inviteEmail);
    } catch (e) { alert('Error: ' + (e.message || '')); }
    setInviting(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-foreground">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage who has access to your admin dashboard.</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Invite User</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="email@example.com" className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
          <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground focus:outline-none focus:border-primary/50">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleInvite} disabled={inviting} className="px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium disabled:opacity-50">Send Invite</button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-muted/50 rounded animate-pulse" />)}</div>
        ) : users.length === 0 ? (
          <div className="py-8"><EmptyState title="No users found" /></div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border">
                  <td className="px-4 py-3 text-sm text-foreground">{user.full_name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{user.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${user.role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>{user.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}