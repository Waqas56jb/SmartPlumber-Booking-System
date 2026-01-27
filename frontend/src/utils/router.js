import { useState, useEffect } from 'react';

const STATE_KEY = 'router_state';

// Simple hash-based router
export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    // Get initial path from hash or default to '/'
    const hash = window.location.hash.slice(1);
    return hash || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPath(hash || '/');
    };

    // Set initial hash if not present - default to landing page
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '/';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path, state = {}) => {
    // Store state in sessionStorage
    if (Object.keys(state).length > 0) {
      try {
        sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
      } catch (e) {
        console.warn('Failed to store router state:', e);
      }
    }
    window.location.hash = path;
  };

  return { currentPath, navigate };
};

// Hook to get location state
export const useLocation = () => {
  const [state] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STATE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Don't clear immediately - let it persist for the component lifecycle
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to read router state:', e);
    }
    return {};
  });

  // Clear state after component mounts
  useEffect(() => {
    return () => {
      try {
        sessionStorage.removeItem(STATE_KEY);
      } catch (e) {
        // Ignore errors
      }
    };
  }, []);

  return { state };
};

// Link component replacement
export const Link = ({ to, children, className, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.hash = to;
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
