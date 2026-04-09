import React, { useEffect, useState } from 'react';
import { FiShoppingBag, FiMapPin } from 'react-icons/fi';
const Sellers = ({
  apiBase
}) => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/api/admin/sellers`);
        const data = await res.json();
        if (data.success) {
          setSellers(data.data.sellers || []);
        }
      } catch (e) {
        console.error('Failed to load sellers', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, [apiBase]);
  const handleSave = async () => {
    if (!editing) return;
    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/api/admin/sellers/${editing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          seller_shop_name: editing.seller_shop_name,
          city: editing.city,
          country: editing.country,
          seller_rating: editing.seller_rating
        })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.data.seller;
        setSellers(prev => prev.map(s => s.id === updated.id ? updated : s));
        setEditing(null);
      }
    } catch (e) {
      console.error('Failed to save seller', e);
    } finally {
      setSaving(false);
    }
  };
  return <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiShoppingBag className="text-amber-400" />
            Sellers
          </h1>
          <p className="text-sm text-slate-400">
            Overview of all sellers registered in the platform, with basic shop stats.
          </p>
        </div>
      </header>

      {loading ? <div className="text-slate-300 text-sm">Loading sellers from database...</div> : sellers.length === 0 ? <div className="text-slate-400 text-sm">
          No sellers found yet. Once sellers sign up and create shops, they will appear here.
        </div> : <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Shop</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Orders / Sales</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map(s => <tr key={s.id} className="border-b border-slate-800/60 hover:bg-slate-900/60 cursor-pointer" onClick={() => setEditing(s)}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-100">
                      {s.seller_shop_name || s.seller_username || 'Shop'}
                    </div>
                    <div className="text-xs text-slate-500">
                      Rating {(parseFloat(s.seller_rating) || 0).toFixed(1)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{s.seller_email}</td>
                  <td className="px-4 py-3 text-slate-200">
                    <span className="inline-flex items-center gap-1">
                      <FiMapPin className="text-amber-400" />
                      {s.city || '—'}, {s.country || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    {s.seller_total_orders || 0} orders / {s.seller_total_sales || 0} sales
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}

      {editing && <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Edit seller</h2>
              <button className="text-slate-400 hover:text-white text-xs" onClick={() => !saving && setEditing(null)}>
                Close
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Shop name</label>
                <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.seller_shop_name || ''} onChange={e => setEditing({
              ...editing,
              seller_shop_name: e.target.value
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
                <input type="number" step="0.1" min="0" max="5" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.seller_rating || 0} onChange={e => setEditing({
              ...editing,
              seller_rating: parseFloat(e.target.value) || 0
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
            if (!editing || !window.confirm('Delete this seller? This cannot be undone.')) {
              return;
            }
            try {
              setSaving(true);
              const res = await fetch(`${apiBase}/api/admin/sellers/${editing.id}`, {
                method: 'DELETE'
              });
              const data = await res.json();
              if (data.success) {
                setSellers(prev => prev.filter(s => s.id !== editing.id));
                setEditing(null);
              }
            } catch (e) {
              console.error('Failed to delete seller', e);
            } finally {
              setSaving(false);
            }
          }}>
                Delete seller
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Sellers;
