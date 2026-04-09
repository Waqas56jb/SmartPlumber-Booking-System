import React from 'react';
import { FiSettings } from 'react-icons/fi';
const Settings = ({
  apiBase
}) => {
  return <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiSettings className="text-amber-400" />
            Settings
          </h1>
          <p className="text-sm text-slate-400">
            Simple admin settings and environment information for demonstration.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200">Admin profile</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <div>
              <div className="text-slate-400 text-xs uppercase mb-1">Display name</div>
              <div className="bg-slate-950/40 border border-slate-800 rounded-lg px-3 py-2">
                SmartPlumber Admin
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-xs uppercase mb-1">Role</div>
              <div className="bg-slate-950/40 border border-slate-800 rounded-lg px-3 py-2">
                Super admin (read-only analytics)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200">Environment</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <div>
              <div className="text-slate-400 text-xs uppercase mb-1">Backend API</div>
              <div className="bg-slate-950/40 border border-slate-800 rounded-lg px-3 py-2 font-mono text-xs">
                {apiBase}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-xs uppercase mb-1">Database</div>
              <div className="bg-slate-950/40 border border-slate-800 rounded-lg px-3 py-2">
                PostgreSQL (Vercel Postgres / Neon) via <code>@vercel/postgres</code>
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-xs uppercase mb-1">Frontend stack</div>
              <div className="bg-slate-950/40 border border-slate-800 rounded-lg px-3 py-2">
                React + React Icons. This admin UI is fully separate from the main customer/plumber/seller
                frontend and only consumes admin APIs.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Settings;
