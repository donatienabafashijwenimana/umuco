import { useEffect, useState } from "react";

const cache = new Map();

const loadJson = (url) => {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ntibyakunze gupakurwa (${response.status})`);
          }
          return response.json();
        })
        .catch((error) => {
          cache.delete(url);
          throw error;
        })
    );
  }
  return cache.get(url);
};

export function useJson(url) {
  const [state, setState] = useState({ data: null, status: "loading", error: null });

  useEffect(() => {
    let active = true;
    setState({ data: null, status: "loading", error: null });

    loadJson(url)
      .then((data) => {
        if (active) setState({ data, status: "ready", error: null });
      })
      .catch((error) => {
        if (active) setState({ data: null, status: "error", error: error.message });
      });

    return () => {
      active = false;
    };
  }, [url]);

  return state;
}
