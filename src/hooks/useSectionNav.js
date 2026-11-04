import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToTarget } from "./useLenis";

// Scrolls to a section on the home page, navigating there first if needed.
export const useSectionNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id) => {
      const scroll = () => {
        if (id === "home") return scrollToTarget(0);
        const el = document.getElementById(id);
        if (el) scrollToTarget(el);
      };

      if (location.pathname !== "/") {
        navigate("/");
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
    },
    [location.pathname, navigate]
  );
};
