import { useCallback, useEffect, useState } from "react";

/** Parsed workbooks are shared across mounts so tabs don't re-download them. */
const cache = new Map();

async function loadSheet(path) {
  if (!cache.has(path)) {
    cache.set(
      path,
      (async () => {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Ntibyakunze gupakurwa (${response.status})`);
        }
        // Loaded on demand so the Excel parser stays out of the initial bundle.
        const XLSX = await import("xlsx");
        const workbook = XLSX.read(await response.arrayBuffer(), {
          type: "array",
        });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return XLSX.utils
          .sheet_to_json(sheet, { header: 1, blankrows: false, defval: "" })
          .map((row) => row.map((cell) => String(cell ?? "").trim()))
          .filter((row) => row.some(Boolean));
      })().catch((error) => {
        cache.delete(path);
        throw error;
      })
    );
  }
  return cache.get(path);
}

/**
 * Loads one or more Excel sheets from /public.
 *
 * @param {string[]} paths sheet URLs, in a module-level constant
 * @returns {{ data: Record<string, string[][]>, status: "loading"|"ready"|"error", error: string|null, reload: () => void }}
 */
export function useSheets(paths) {
  const [state, setState] = useState({
    data: {},
    status: "loading",
    error: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ data: {}, status: "loading", error: null });

    Promise.all(paths.map((path) => loadSheet(path)))
      .then((sheets) => {
        if (!active) return;
        const data = {};
        paths.forEach((path, index) => {
          data[path] = sheets[index];
        });
        setState({ data, status: "ready", error: null });
      })
      .catch((error) => {
        if (!active) return;
        setState({ data: {}, status: "error", error: error.message });
      });

    return () => {
      active = false;
    };
  }, [paths, attempt]);

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  return { ...state, reload };
}
