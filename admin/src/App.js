import React, { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiTool, FiShoppingBag } from 'react-icons/fi';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Plumbers from './pages/Plumbers';
import Sanitary from './pages/Sanitary';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Sellers from './pages/Sellers';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [overview, setOverview] = useState(null);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  const API_BASE_URL = process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoadingOverview(true);
        const res = await fetch(`${API_BASE_URL}/api/admin/overview`);
        const data = await res.json();
        if (data.success) {
          setOverview(data.data);
        }
      } catch (e) {
        console.error('Failed to load admin overview', e);
      } finally {
        setLoadingOverview(false);
      }
    };
    fetchOverview();
  }, [API_BASE_URL]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('admin_logged_in');
    } catch {
      // ignore
    }
    setLoggedIn(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard overview={overview} loading={loadingOverview} apiBase={API_BASE_URL} />;
      case 'plumbers':
        return <Plumbers apiBase={API_BASE_URL} />;
      case 'sanitary':
        return <Sanitary apiBase={API_BASE_URL} />;
      case 'customers':
        return <Customers apiBase={API_BASE_URL} />;
      case 'sellers':
        return <Sellers apiBase={API_BASE_URL} />;
      case 'analytics':
        return <Analytics apiBase={API_BASE_URL} />;
      default:
        return <Dashboard overview={overview} loading={loadingOverview} apiBase={API_BASE_URL} />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: <FiHome /> },
    { id: 'plumbers', label: 'Plumbers', icon: <FiTool /> },
    { id: 'sanitary', label: 'Sanitary', icon: <FiShoppingBag /> },
    { id: 'customers', label: 'Customers', icon: <FiUsers /> },
    { id: 'sellers', label: 'Sellers', icon: <FiShoppingBag /> },
    { id: 'analytics', label: 'Analytics', icon: <FiSettings /> }
  ];

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <AdminLogin
          onSuccess={() => {
            try {
              localStorage.setItem('admin_logged_in', 'true');
            } catch {
              // ignore
            }
            setLoggedIn(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <Sidebar
        items={menuItems}
        active={activePage}
        onChange={setActivePage}
        onLogout={handleLogout}
        logoutIcon={<FiLogOut />}
      />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;

