import React, { useEffect, useState } from 'react';
import { FiShoppingBag, FiTag, FiTruck } from 'react-icons/fi';
const Sanitary = ({
  apiBase
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/api/admin/products`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.products || []);
        }
      } catch (e) {
        console.error('Failed to load products', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiBase]);
  const handleSave = async () => {
    if (!editing) return;
    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/api/admin/products/${editing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_name: editing.product_name,
          product_category: editing.product_category,
          price: editing.price,
          stock_quantity: editing.stock_quantity,
          is_active: editing.is_active
        })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.data.product;
        setProducts(prev => prev.map(p => p.id === updated.id ? {
          ...p,
          ...updated
        } : p));
        setEditing(null);
      }
    } catch (e) {
      console.error('Failed to save product', e);
    } finally {
      setSaving(false);
    }
  };
  return <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiShoppingBag className="text-amber-400" />
            Sanitary & product insights
          </h1>
          <p className="text-sm text-slate-400">
            Overview of all products your sellers have listed in the marketplace.
          </p>
        </div>
      </header>

      {loading ? <div className="text-slate-300 text-sm">Loading products from database...</div> : products.length === 0 ? <div className="text-slate-400 text-sm">
          No products found. When sellers add items, they will appear here automatically.
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map(p => <article key={p.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 cursor-pointer" onClick={() => setEditing(p)}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-white line-clamp-2">
                    {p.product_name}
                  </h2>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                    <FiTag className="text-amber-400" />
                    <span>{p.product_category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-amber-300">
                    {p.currency || 'GBP'} {parseFloat(p.price).toFixed(2)}
                  </div>
                  {p.discount_percentage > 0 && <div className="text-xs text-emerald-400">
                      -{parseFloat(p.discount_percentage).toFixed(0)}% discount
                    </div>}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <div>
                  <div className="font-medium text-slate-200">
                    {p.seller_shop_name || 'Unknown seller'}
                  </div>
                  <div>
                    Seller {(parseFloat(p.seller_rating) || 0).toFixed(1)} product {(parseFloat(p.product_rating) || 0).toFixed(1)}
                  </div>
                </div>
                <div className="text-right">
                  <div>
                    Stock:{' '}
                    <span className={p.stock_quantity <= 0 ? 'text-red-400' : 'text-emerald-400'}>
                      {p.stock_quantity || 0}
                    </span>
                  </div>
                  <div>
                    Sold: <span>{p.total_sales || 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2 mt-1">
                <div className="flex items-center gap-1">
                  <FiTruck />
                  {p.shipping_charges === 0 ? 'Free delivery' : `Delivery: ${p.shipping_charges}`}
                </div>
                <div>
                  Status:{' '}
                  <span className={p.is_active ? 'text-emerald-400' : 'text-slate-400'}>
                    {p.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>
            </article>)}
        </div>}

      {editing && <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Edit product</h2>
              <button className="text-slate-400 hover:text-white text-xs" onClick={() => !saving && setEditing(null)}>
                Close
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Name</label>
                <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.product_name || ''} onChange={e => setEditing({
              ...editing,
              product_name: e.target.value
            })} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-slate-400 text-xs mb-1">Category</label>
                  <input className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.product_category || ''} onChange={e => setEditing({
                ...editing,
                product_category: e.target.value
              })} />
                </div>
                <div className="flex-1">
                  <label className="block text-slate-400 text-xs mb-1">Price</label>
                  <input type="number" step="0.01" min="0" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.price || 0} onChange={e => setEditing({
                ...editing,
                price: parseFloat(e.target.value) || 0
              })} />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-slate-400 text-xs mb-1">Stock</label>
                  <input type="number" min="0" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm" value={editing.stock_quantity || 0} onChange={e => setEditing({
                ...editing,
                stock_quantity: parseInt(e.target.value, 10) || 0
              })} />
                </div>
                <div className="flex-1 flex items-end">
                  <label className="flex items-center gap-2 text-xs text-slate-200">
                    <input type="checkbox" checked={!!editing.is_active} onChange={e => setEditing({
                  ...editing,
                  is_active: e.target.checked
                })} />
                    Active
                  </label>
                </div>
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
            if (!editing || !window.confirm('Delete this product? This cannot be undone.')) {
              return;
            }
            try {
              setSaving(true);
              const res = await fetch(`${apiBase}/api/admin/products/${editing.id}`, {
                method: 'DELETE'
              });
              const data = await res.json();
              if (data.success) {
                setProducts(prev => prev.filter(p => p.id !== editing.id));
                setEditing(null);
              }
            } catch (e) {
              console.error('Failed to delete product', e);
            } finally {
              setSaving(false);
            }
          }}>
                Delete product
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Sanitary;
