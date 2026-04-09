import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FiSettings, FiTrendingUp } from 'react-icons/fi';
const Analytics = ({
  apiBase
}) => {
  const [usersPerWeek, setUsersPerWeek] = useState([]);
  const [bookingsPerDay, setBookingsPerDay] = useState([]);
  const [topPlumbers, setTopPlumbers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const [uRes, bRes, tpRes, tprRes] = await Promise.all([fetch(`${apiBase}/api/admin/analytics/users-per-week`), fetch(`${apiBase}/api/admin/analytics/bookings-per-day`), fetch(`${apiBase}/api/admin/analytics/top-plumbers`), fetch(`${apiBase}/api/admin/analytics/top-products`)]);
        const uData = await uRes.json();
        const bData = await bRes.json();
        if (uData.success) setUsersPerWeek(uData.data.points || []);
        if (bData.success) setBookingsPerDay(bData.data.points || []);
        const tpData = await tpRes.json();
        const tprData = await tprRes.json();
        if (tpData.success) {
          const raw = (tpData.data.points || []).slice(0, 4);
          const mapped = raw.map(p => ({
            ...p,
            label: p.name && p.name.length > 10 ? `${p.name.slice(0, 10)}…` : p.name || 'Plumber'
          }));
          setTopPlumbers(mapped);
        }
        if (tprData.success) {
          const raw = (tprData.data.points || []).slice(0, 4);
          const mapped = raw.map(p => ({
            ...p,
            label: p.name && p.name.length > 14 ? `${p.name.slice(0, 14)}…` : p.name || 'Product'
          }));
          setTopProducts(mapped);
        }
      } catch (e) {
        console.error('Analytics load error', e);
      }
    };
    load();
  }, [apiBase]);
  return <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiSettings className="text-amber-400" />
            Analytics
          </h1>
          <p className="text-sm text-slate-400">
            High-level trends across users and bookings, using real counts from the database.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <h2 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <FiTrendingUp className="text-amber-400" />
            New users per week
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersPerWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{
                backgroundColor: '#020617',
                borderColor: '#1e293b',
                color: '#e5e7eb'
              }} />
                <Bar dataKey="customers" stackId="a" fill="#fbbf24" />
                <Bar dataKey="plumbers" stackId="a" fill="#22c55e" />
                <Bar dataKey="sellers" stackId="a" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <h2 className="text-sm font-semibold text-slate-200 mb-3">Bookings per day</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingsPerDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{
                backgroundColor: '#020617',
                borderColor: '#1e293b',
                color: '#e5e7eb'
              }} />
                <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <h2 className="text-sm font-semibold text-slate-200 mb-3">Top plumbers (by completed jobs)</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPlumbers} layout="vertical" margin={{
              left: 40
            }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="label" type="category" stroke="#9ca3af" width={80} />
                <Tooltip contentStyle={{
                backgroundColor: '#020617',
                borderColor: '#1e293b',
                color: '#e5e7eb'
              }} />
                <Bar dataKey="completed" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <h2 className="text-sm font-semibold text-slate-200 mb-3">Top products (by sales)</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{
              left: 40
            }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="label" type="category" stroke="#9ca3af" width={100} />
                <Tooltip contentStyle={{
                backgroundColor: '#020617',
                borderColor: '#1e293b',
                color: '#e5e7eb'
              }} />
                <Bar dataKey="sales" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>;
};
export default Analytics;
