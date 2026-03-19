import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop — automatically scrolls the window to the top
 * whenever the route (location) changes.
 */
export default function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}
