import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Scrolls to a section on the home page, navigating there first if needed.
export const useSectionNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback((id) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for the home page (and its lazy sections) to mount
      let tries = 0;
      const wait = setInterval(() => {
        tries += 1;
        if (document.getElementById(id) || tries > 30) {
          clearInterval(wait);
          scroll();
        }
      }, 100);
    } else {
      scroll();
    }
  }, [location.pathname, navigate]);
};
