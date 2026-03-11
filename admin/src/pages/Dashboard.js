import React from 'react';
import { FiUsers, FiTool, FiShoppingBag, FiDollarSign } from 'react-icons/fi';

const number = (v) => (typeof v === 'number' ? v : 0);

const Dashboard = ({ overview, loading, apiBase }) => {
  const totalCustomers = number(overview?.totalCustomers);
  const totalPlumbers = number(overview?.totalPlumbers);
  const totalSellers = number(overview?.totalSellers);
  const totalProducts = number(overview?.totalProducts);
  const totalJobs = number(overview?.totalPlumberJobs);
  const completedJobs = number(overview?.totalCompletedJobs);
  const totalSales = number(overview?.totalSellerSales);

  const customersPerPlumber = totalPlumbers ? (totalCustomers / totalPlumbers).toFixed(1) : '0.0';
  const jobsPerPlumber = totalPlumbers ? (totalJobs / totalPlumbers).toFixed(1) : '0.0';
  const productsPerSeller = totalSellers ? (totalProducts / totalSellers).toFixed(1) : '0.0';
  const salesPerSeller = totalSellers ? (totalSales / totalSellers).toFixed(1) : '0.0';
  const completionRate =
    totalJobs > 0 ? `${((completedJobs / totalJobs) * 100).toFixed(1)}%` : '0%';

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Overview</h1>
        <p className="text-sm text-slate-400">
          Live snapshot of customers, plumbers, sellers and products from the SmartPlumber database.
        </p>
      </header>

      {/* Primary counters */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 text-xl">
            <FiUsers />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Customers</div>
            <div className="text-xl font-semibold text-white">
              {loading ? '...' : totalCustomers}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 text-xl">
            <FiTool />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Plumbers</div>
            <div className="text-xl font-semibold text-white">
              {loading ? '...' : totalPlumbers}
            </div>
            <div className="text-xs text-slate-500">
              {loading ? '' : `${totalJobs} total jobs, ${completedJobs} completed`}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 text-xl">
            <FiShoppingBag />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Sellers</div>
            <div className="text-xl font-semibold text-white">
              {loading ? '...' : totalSellers}
            </div>
            <div className="text-xs text-slate-500">
              {loading ? '' : `${totalSales} total sales (reported)`}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-400/10 flex items-center justify-center text-violet-400 text-xl">
            <FiDollarSign />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Products</div>
            <div className="text-xl font-semibold text-white">
              {loading ? '...' : totalProducts}
            </div>
          </div>
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Customers per plumber
          </div>
          <div className="text-2xl font-semibold text-white">{customersPerPlumber}</div>
          <div className="text-xs text-slate-500 mt-1">
            Indicates how many customers each plumber could theoretically serve.
          </div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Jobs per plumber
          </div>
          <div className="text-2xl font-semibold text-white">{jobsPerPlumber}</div>
          <div className="text-xs text-slate-500 mt-1">
            Average number of jobs assigned to each plumber in the system.
          </div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Job completion</div>
          <div className="text-2xl font-semibold text-white">{completionRate}</div>
          <div className="text-xs text-slate-500 mt-1">
            Percentage of plumber jobs that have reached the completed state.
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Products per seller
          </div>
          <div className="text-2xl font-semibold text-white">{productsPerSeller}</div>
          <div className="text-xs text-slate-500 mt-1">
            Shows how large an average seller&apos;s catalog is across the marketplace.
          </div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Sales per seller
          </div>
          <div className="text-2xl font-semibold text-white">{salesPerSeller}</div>
          <div className="text-xs text-slate-500 mt-1">
            Average total sales amount per seller based on reported seller totals.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

