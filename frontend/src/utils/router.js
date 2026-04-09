import { useState, useEffect } from 'react';
const STATE_KEY = 'router_state';
export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || '/';
  });
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPath(hash || '/');
    };
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '/';
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const navigate = (path, state = {}) => {
    if (Object.keys(state).length > 0) {
      try {
        sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
      } catch (e) {
        console.warn('Failed to store router state:', e);
      }
    }
    window.location.hash = path;
  };
  return {
    currentPath,
    navigate
  };
};
export const useLocation = () => {
  const [state] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STATE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to read router state:', e);
    }
    return {};
  });
  useEffect(() => {
    return () => {
      try {
        sessionStorage.removeItem(STATE_KEY);
      } catch (e) {}
    };
  }, []);
  return {
    state
  };
};
export const Link = ({
  to,
  children,
  className,
  ...props
}) => {
  const handleClick = e => {
    e.preventDefault();
    window.location.hash = to;
  };
  return <a href={`#${to}`} onClick={handleClick} className={className} {...props}>
      {children}
    </a>;
};
