import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
const Customers = ({
  apiBase
}) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/api/admin/customers`);
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data.customers || []);
        }
      } catch (e) {
        console.error('Failed to load customers', e);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [apiBase]);
  const handleSave = async () => {
    if (!editing) return;
    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/api/admin/customers/${editing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: editing.username,
          email: editing.email
        })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.data.customer;
        setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
        setEditing(null);
      }
    } catch (e) {
      console.error('Failed to save customer', e);
    } finally {
      setSaving(false);
    }
  };
  return <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiUsers className="text-amber-400" />
            Customers
          </h1>
          <p className="text-sm text-slate-400">
            Simple list of all registered customer accounts from the <code>users</code> table.
          </p>
        </div>
      </header>

      {loading ? <div className="text-slate-300 text-sm">Loading customers from database...</div> : customers.length === 0 ? <div className="text-slate-400 text-sm">
          No customers found yet. Once users sign up on the client site, they will appear here.
        </div> : <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Username</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => <tr key={c.id} className="border-b border-slate-800/60 hover:bg-slate-900/60 cursor-pointer" onClick={() => setEditing(c)}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-100">
                      {c.username || 'Unknown user'}
                    </div>
                    <div className="text-xs text-slate-500">ID: {c.id}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{c.email}</td>
                  <td className="px-4 py-3 text-slate-300">
                    {c.created_at ? new Date(c.created_at).toLocaleDateString('en-GB') : '—'}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}

      {editing && <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Edit customer</h2>
              <button className="text-slate-400 hover:text-white text-xs" onClick={() => !saving && setEditing(null)}>
                Close
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Username</label>
                <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.username || ''} onChange={e => setEditing({
              ...editing,
              username: e.target.value
            })} />
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Email</label>
                <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.email || ''} onChange={e => setEditing({
              ...editing,
              email: e.target.value
            })} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-2 rounded-lg bg-amber-400 text-slate-900 text-sm font-semibold disabled:opacity-60" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save changes'}
              </button>
              <button className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-200 text-sm" onClick={() => !saving && setEditing(null)}>
                Cancel
              </button>
            </div>
            <div className="pt-1">
              <button className="w-full py-2 rounded-lg border border-red-500 text-red-400 text-xs font-semibold hover:bg-red-500/10" disabled={saving} onClick={async () => {
            if (!editing || !window.confirm('Delete this customer? This cannot be undone.')) {
              return;
            }
            try {
              setSaving(true);
              const res = await fetch(`${apiBase}/api/admin/customers/${editing.id}`, {
                method: 'DELETE'
              });
              const data = await res.json();
              if (data.success) {
                setCustomers(prev => prev.filter(c => c.id !== editing.id));
                setEditing(null);
              }
            } catch (e) {
              console.error('Failed to delete customer', e);
            } finally {
              setSaving(false);
            }
          }}>
                Delete customer
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Customers;
