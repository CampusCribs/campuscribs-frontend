// src/components/ScrollRestorationBlocker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollRestorationBlocker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly resets scroll position *before* rendering the new route
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
