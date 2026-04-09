import React, { useEffect, useState } from 'react';
import { FiTool, FiMapPin, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
const Plumbers = ({
  apiBase
}) => {
  const [plumbers, setPlumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchPlumbers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/api/admin/plumbers`);
        const data = await res.json();
        if (data.success) {
          setPlumbers(data.data.plumbers || []);
        }
      } catch (e) {
        console.error('Failed to load plumbers', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlumbers();
  }, [apiBase]);
  const handleSave = async () => {
    if (!editing) return;
    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/api/admin/plumbers/${editing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: editing.full_name,
          city: editing.city,
          country: editing.country,
          plumber_rating: editing.plumber_rating,
          is_verified: editing.is_verified,
          is_available: editing.is_available
        })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.data.plumber;
        setPlumbers(prev => prev.map(p => p.id === updated.id ? updated : p));
        setEditing(null);
      }
    } catch (e) {
      console.error('Failed to save plumber', e);
    } finally {
      setSaving(false);
    }
  };
  return <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiTool className="text-amber-400" />
            Plumber analysis
          </h1>
          <p className="text-sm text-slate-400">
            Live list of plumbers with location, rating and job statistics.
          </p>
        </div>
      </header>

      {loading ? <div className="text-slate-300 text-sm">Loading plumbers from database...</div> : plumbers.length === 0 ? <div className="text-slate-400 text-sm">
          No plumbers found yet. Once plumbers sign up, they will appear here automatically.
        </div> : <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Jobs</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {plumbers.map(p => <tr key={p.id} className="border-b border-slate-800/60 hover:bg-slate-900/60 cursor-pointer" onClick={() => setEditing(p)}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-100">
                      {p.full_name || p.plumber_username || 'Unnamed plumber'}
                    </div>
                    <div className="text-xs text-slate-500">ID: {p.id}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{p.plumber_email}</td>
                  <td className="px-4 py-3 text-slate-200">
                    <span className="inline-flex items-center gap-1">
                      <FiMapPin className="text-amber-400" />
                      {p.city || '—'}, {p.country || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-100">
                      {(parseFloat(p.plumber_rating) || 0).toFixed(1)}
                    </div>
                    <div className="text-xs text-slate-500">
                      {p.total_reviews ? `${p.total_reviews} reviews` : 'No reviews yet'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-100">
                      {p.plumber_completed_jobs || 0} completed
                    </div>
                    <div className="text-xs text-slate-500">
                      {p.plumber_total_jobs || 0} total, {p.plumber_cancelled_jobs || 0} cancelled
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {p.is_available ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-300">
                          <FiCheckCircle /> Available
                        </span> : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-200">
                          <FiAlertTriangle /> Busy/Offline
                        </span>}
                      {p.is_verified && <span className="ml-1 text-[10px] uppercase tracking-wide text-amber-300">
                          Verified
                        </span>}
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}

      {editing && <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Edit plumber</h2>
              <button className="text-slate-400 hover:text-white text-xs" onClick={() => !saving && setEditing(null)}>
                Close
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Full name</label>
                <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.full_name || ''} onChange={e => setEditing({
              ...editing,
              full_name: e.target.value
            })} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-slate-400 text-xs mb-1">City</label>
                  <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.city || ''} onChange={e => setEditing({
                ...editing,
                city: e.target.value
              })} />
                </div>
                <div className="flex-1">
                  <label className="block text-slate-400 text-xs mb-1">Country</label>
                  <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.country || ''} onChange={e => setEditing({
                ...editing,
                country: e.target.value
              })} />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Rating</label>
                <input type="number" step="0.1" min="0" max="5" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.plumber_rating || 0} onChange={e => setEditing({
              ...editing,
              plumber_rating: parseFloat(e.target.value) || 0
            })} />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-200">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={!!editing.is_verified} onChange={e => setEditing({
                ...editing,
                is_verified: e.target.checked
              })} />
                  Verified
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={!!editing.is_available} onChange={e => setEditing({
                ...editing,
                is_available: e.target.checked
              })} />
                  Available
                </label>
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
            if (!editing || !window.confirm('Delete this plumber? This cannot be undone.')) {
              return;
            }
            try {
              setSaving(true);
              const res = await fetch(`${apiBase}/api/admin/plumbers/${editing.id}`, {
                method: 'DELETE'
              });
              const data = await res.json();
              if (data.success) {
                setPlumbers(prev => prev.filter(p => p.id !== editing.id));
                setEditing(null);
              }
            } catch (e) {
              console.error('Failed to delete plumber', e);
            } finally {
              setSaving(false);
            }
          }}>
                Delete plumber
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Plumbers;
