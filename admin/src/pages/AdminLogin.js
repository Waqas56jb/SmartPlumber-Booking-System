import React, { useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';

const ADMIN_EMAIL = 'adminbasit123@gmail.com';
const ADMIN_PASSWORD = 'UK@12345!';

const AdminLogin = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        onSuccess();
      } else {
        setError('Invalid admin email or password.');
      }
      setSubmitting(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center gap-3">
        <img
          src="/logo.png"
          alt="SmartPlumber Admin"
          className="w-16 h-16 rounded-2xl border border-slate-700 bg-slate-900 object-contain"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">SmartPlumber Admin</h1>
          <p className="text-sm text-slate-400">
            Sign in to manage plumbers, sellers, customers and bookings.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
      >
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <FiMail />
            </span>
            <input
              type="email"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <FiLock />
            </span>
            <input
              type="password"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="text-xs text-red-400 bg-red-900/20 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 rounded-lg bg-amber-400 text-slate-900 text-sm font-semibold hover:bg-amber-300 transition disabled:opacity-60"
        >
          {submitting ? 'Signing in...' : 'Sign in as Admin'}
        </button>

        <p className="text-[10px] text-slate-500 text-center mt-1">
          Demo credentials: <span className="font-mono">{ADMIN_EMAIL}</span> /{' '}
          <span className="font-mono">{ADMIN_PASSWORD}</span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;

