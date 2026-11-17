import { useCallback, useEffect, useState } from "react";
import { PAGE_KEYS } from "../navigation";

const FALLBACK = PAGE_KEYS[0];

const readHash = () => {
  const key = window.location.hash.replace(/^#\/?/, "").trim();
  return PAGE_KEYS.includes(key) ? key : FALLBACK;
};

/**
 * Tiny hash-based router: every section gets a shareable URL, the browser back
 * button works, and the page scrolls to the top on navigation.
 */
export function useHashPage() {
  const [page, setPage] = useState(readHash);

  useEffect(() => {
    const sync = () => setPage(readHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigate = useCallback((key) => {
    const target = PAGE_KEYS.includes(key) ? key : FALLBACK;
    if (readHash() === target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = `/${target}`;
  }, []);

  return [page, navigate];
}
