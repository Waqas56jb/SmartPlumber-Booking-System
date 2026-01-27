import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useRouter } from './utils/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PlumberHome from './pages/PlumberHome';
import PlumberEditProfile from './pages/PlumberEditProfile';
import SellerHome from './pages/SellerHome';
import SellerProducts from './pages/SellerProducts';
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
  const { currentPath, navigate } = useRouter();
  const { isAuthenticated, user } = useAuth();

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/', '/landing',
    '/login', '/signup', '/forgot-password', '/reset-password',
    '/plumber-login', '/plumber-signup', '/plumber-forgot-password', '/plumber-reset-password',
    '/seller-login', '/seller-signup', '/seller-forgot-password', '/seller-reset-password',
    '/service'
  ];
  const isPublicRoute = publicRoutes.includes(currentPath);

  // Initialize hash on first load and handle authentication redirects
  useEffect(() => {
    const hash = window.location.hash.slice(1) || '/';
    
    // If no hash is set, start with landing page
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '/';
      return;
    }

    // If authenticated and on landing/login/signup pages, redirect to home
    if (isAuthenticated && (
      hash === '/' || hash === '/landing' || 
      hash === '/login' || hash === '/signup' ||
      hash === '/plumber-login' || hash === '/plumber-signup' ||
      hash === '/seller-login' || hash === '/seller-signup'
    )) {
      navigate('/home');
    }
    // Protect routes: redirect to landing if not authenticated and trying to access protected route
    else if (!isAuthenticated && !isPublicRoute) {
      navigate('/');
    }
  }, [isAuthenticated, currentPath, navigate, isPublicRoute]);

  // Determine which home page to show based on user type
  const getUserHomePage = () => {
    if (!isAuthenticated || !user) return <Landing />;
    
    const userType = user.userType || user.user_type;
    
    if (userType === 'plumber') {
      return <PlumberHome />;
    } else if (userType === 'seller') {
      return <SellerHome />;
    } else {
      return <Home />; // Customer default
    }
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/landing':
        return isAuthenticated ? getUserHomePage() : <Landing />;
      case '/home':
        return isAuthenticated ? getUserHomePage() : <Landing />;
      // Customer routes
      case '/login':
        return <Login />;
      case '/signup':
        return <Signup />;
      case '/forgot-password':
        return <ForgotPassword />;
      case '/reset-password':
        return <ResetPassword />;
      // Plumber routes
      case '/plumber-login':
        return <PlumberLogin />;
      case '/plumber-signup':
        return <PlumberSignup />;
      case '/plumber-forgot-password':
        return <PlumberForgotPassword />;
      case '/plumber-reset-password':
        return <PlumberResetPassword />;
      case '/plumber-edit-profile':
        return isAuthenticated && (user?.userType === 'plumber' || user?.user_type === 'plumber')
          ? <PlumberEditProfile />
          : <Landing />;
      // Seller routes
      case '/seller-login':
        return <SellerLogin />;
      case '/seller-signup':
        return <SellerSignup />;
      case '/seller-forgot-password':
        return <SellerForgotPassword />;
      case '/seller-reset-password':
        return <SellerResetPassword />;
      // Service Detail Page (Public)
      case (currentPath.startsWith('/service/') ? currentPath : null):
        return <ServiceDetail />;
      // Seller Products Management
      case '/seller-products':
        return isAuthenticated && (user?.userType === 'seller' || user?.user_type === 'seller') 
          ? <SellerProducts /> 
          : <Landing />;
      default:
        if (currentPath.startsWith('/service/')) {
          return <ServiceDetail />;
        }
        return isAuthenticated ? getUserHomePage() : <Landing />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
