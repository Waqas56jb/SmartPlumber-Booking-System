import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useRouter } from './utils/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function AppContent() {
  const { currentPath, navigate } = useRouter();
  const { isAuthenticated } = useAuth();

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.includes(currentPath);

  // Initialize hash on first load and handle authentication redirects
  useEffect(() => {
    const hash = window.location.hash.slice(1) || '/';
    
    // If no hash is set, always start with login page
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '/login';
      return;
    }

    // Protect routes: redirect to login if not authenticated and trying to access protected route
    if (!isAuthenticated && !isPublicRoute) {
      navigate('/login');
    } 
    // If authenticated and on login/signup pages, redirect to home
    else if (isAuthenticated && (hash === '/login' || hash === '/signup')) {
      navigate('/');
    }
  }, [isAuthenticated, currentPath, navigate, isPublicRoute]);

  // Protect routes: if not authenticated and trying to access protected route, show login
  if (!isAuthenticated && !isPublicRoute) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        // Only show home if authenticated
        return isAuthenticated ? <Home /> : <Login />;
      case '/login':
        return <Login />;
      case '/signup':
        return <Signup />;
      case '/forgot-password':
        return <ForgotPassword />;
      case '/reset-password':
        return <ResetPassword />;
      default:
        // Default to login if not authenticated, home if authenticated
        return isAuthenticated ? <Home /> : <Login />;
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
