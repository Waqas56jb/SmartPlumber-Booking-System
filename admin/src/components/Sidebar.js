import React from 'react';
const Sidebar = ({
  items,
  active,
  onChange,
  onLogout,
  logoutIcon
}) => {
  return <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3">
        <img src="/logo.png" alt="SmartPlumber Admin" className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 object-contain" />
        <div>
          <div className="text-sm uppercase tracking-widest text-slate-400">Admin</div>
          <div className="font-semibold text-slate-100">SmartPlumber</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(item => <button key={item.id} onClick={() => onChange(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active === item.id ? 'bg-amber-400 text-slate-900 shadow' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>)}
      </nav>
      <div className="px-3 py-4 border-t border-slate-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:text-white hover:bg-red-600/60 transition">
          <span className="text-lg">{logoutIcon}</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>;
};
export default Sidebar;
