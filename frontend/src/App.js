import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useRouter } from './utils/router';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PlumberHome from './pages/PlumberHome';
import PlumberEditProfile from './pages/PlumberEditProfile';
import PlumberServices from './pages/PlumberServices';
import PlumberBookings from './pages/PlumberBookings';
import PlumberAvailability from './pages/PlumberAvailability';
import SellerHome from './pages/SellerHome';
import SellerProducts from './pages/SellerProducts';
import SellerOrders from './pages/SellerOrders';
import SellerEditProfile from './pages/SellerEditProfile';
import ServiceDetail from './pages/ServiceDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PlumberLogin from './pages/PlumberLogin';
import PlumberSignup from './pages/PlumberSignup';
import PlumberForgotPassword from './pages/PlumberForgotPassword';
import PlumberResetPassword from './pages/PlumberResetPassword';
import SellerLogin from './pages/SellerLogin';
import SellerSignup from './pages/SellerSignup';
import SellerForgotPassword from './pages/SellerForgotPassword';
import SellerResetPassword from './pages/SellerResetPassword';
function AppContent() {
  const {
    currentPath,
    navigate
  } = useRouter();
  const {
    isAuthenticated,
    user
  } = useAuth();
  const publicRoutes = ['/', '/landing', '/login', '/signup', '/forgot-password', '/reset-password', '/plumber-login', '/plumber-signup', '/plumber-forgot-password', '/plumber-reset-password', '/seller-login', '/seller-signup', '/seller-forgot-password', '/seller-reset-password'];
  const isPublicRoute = publicRoutes.includes(currentPath) || currentPath.startsWith('/service/');
  const protectedRoutes = ['/home', '/plumber-edit-profile', '/plumber-services', '/plumber-bookings', '/plumber-availability', '/seller-products', '/seller-orders', '/seller-edit-profile'];
  const isProtectedRoute = protectedRoutes.includes(currentPath);
  useEffect(() => {
    const hash = window.location.hash.slice(1) || '/';
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '/';
      return;
    }
    if (isAuthenticated && (hash === '/' || hash === '/landing' || hash === '/login' || hash === '/signup' || hash === '/plumber-login' || hash === '/plumber-signup' || hash === '/seller-login' || hash === '/seller-signup')) {
      navigate('/home');
    } else if (!isAuthenticated && !isPublicRoute && isProtectedRoute) {
      navigate('/');
    }
  }, [isAuthenticated, currentPath, navigate, isPublicRoute, isProtectedRoute]);
  const getUserHomePage = () => {
    if (!isAuthenticated || !user) return <Landing />;
    const userType = user.userType || user.user_type;
    if (userType === 'plumber') {
      return <PlumberHome />;
    } else if (userType === 'seller') {
      return <SellerHome />;
    } else {
      return <Home />;
    }
  };
  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/landing':
        return isAuthenticated ? getUserHomePage() : <Landing />;
      case '/home':
        return isAuthenticated ? getUserHomePage() : <Landing />;
      case '/login':
        return <Login />;
      case '/signup':
        return <Signup />;
      case '/forgot-password':
        return <ForgotPassword />;
      case '/reset-password':
        return <ResetPassword />;
      case '/plumber-login':
        return <PlumberLogin />;
      case '/plumber-signup':
        return <PlumberSignup />;
      case '/plumber-forgot-password':
        return <PlumberForgotPassword />;
      case '/plumber-reset-password':
        return <PlumberResetPassword />;
      case '/plumber-edit-profile':
        return isAuthenticated && (user?.userType === 'plumber' || user?.user_type === 'plumber') ? <PlumberEditProfile /> : <Landing />;
      case '/plumber-services':
        return isAuthenticated && (user?.userType === 'plumber' || user?.user_type === 'plumber') ? <PlumberServices /> : <Landing />;
      case '/plumber-bookings':
        return isAuthenticated && (user?.userType === 'plumber' || user?.user_type === 'plumber') ? <PlumberBookings /> : <Landing />;
      case '/plumber-availability':
        return isAuthenticated && (user?.userType === 'plumber' || user?.user_type === 'plumber') ? <PlumberAvailability /> : <Landing />;
      case '/seller-login':
        return <SellerLogin />;
      case '/seller-signup':
        return <SellerSignup />;
      case '/seller-forgot-password':
        return <SellerForgotPassword />;
      case '/seller-reset-password':
        return <SellerResetPassword />;
      case currentPath.startsWith('/service/') ? currentPath : null:
        return <ServiceDetail />;
      case '/seller-products':
        return isAuthenticated && (user?.userType === 'seller' || user?.user_type === 'seller') ? <SellerProducts /> : <Landing />;
      case '/seller-orders':
        return isAuthenticated && (user?.userType === 'seller' || user?.user_type === 'seller') ? <SellerOrders /> : <Landing />;
      case '/seller-edit-profile':
        return isAuthenticated && (user?.userType === 'seller' || user?.user_type === 'seller') ? <SellerEditProfile /> : <Landing />;
      default:
        if (currentPath.startsWith('/service/')) {
          return <ServiceDetail />;
        }
        return isAuthenticated ? getUserHomePage() : <Landing />;
    }
  };
  return <div className="App">
      {renderPage()}
    </div>;
}
function App() {
  return <AuthProvider>
      <AppContent />
    </AuthProvider>;
}
export default App;
