import { useEffect, useMemo, useState } from "react";
import { Quote } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { EmptyState, ErrorState, LoadingRows } from "../components/States";
import Highlight from "../components/Highlight";
import { useSheets } from "../hooks/useSheets";

const SHEETS = ["/document/imigani-migufi.xlsx"];
const PAGE_SIZE = 60;

export default function Imiganimigufi() {
  const { data, status, error, reload } = useSheets(SHEETS);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const proverbs = useMemo(() => {
    const seen = new Set();
    return (data[SHEETS[0]] ?? [])
      .map(([text = ""]) => text.trim())
      .filter((text) => {
        const key = text.toLowerCase().replace(/\s+/g, " ");
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((text, index) => ({ text, id: index + 1 }));
  }, [data]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return proverbs;
    return proverbs.filter((item) => item.text.toLowerCase().includes(term));
  }, [proverbs, query]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query]);

  return (
    <div className="animate-fade-up">
      <PageHeader
        icon={Quote}
        title="Imigani migufi n'imigenurano"
        description="Amagambo y'ubwenge y'Abanyarwanda: aha ni ho uzasanga imigani migufi n'imigenurano yagiye yambukwa mu ngano."
        count={status === "ready" ? filtered.length : undefined}
        countLabel={query ? "yabonetse" : "imigani"}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Shakira umugani..."
        accent="purple"
      />

      {status === "loading" ? <LoadingRows rows={6} /> : null}
      {status === "error" ? <ErrorState message={error} onRetry={reload} /> : null}

      {status === "ready" ? (
        filtered.length === 0 ? (
          <EmptyState
            title="Nta mugani wabonetse"
            hint="Gerageza andika ijambo ryoroshye kurusha iryo."
          />
        ) : (
          <>
            <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filtered.slice(0, visible).map((item) => (
                <li
                  key={item.id}
                  className="group card-surface relative overflow-hidden p-4 pl-5 transition hover:border-purple-200 hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-300 to-emerald-300 opacity-0 transition group-hover:opacity-100"
                  />
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="font-serif text-2xl leading-none text-purple-300"
                    >
                      “
                    </span>
                    <p className="font-serif text-[1.02rem] leading-7 text-slate-700">
                      <Highlight text={item.text} query={query} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {visible < filtered.length ? (
              <div className="mt-6 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisible((value) => value + PAGE_SIZE)}
                  className="rounded-full bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800"
                >
                  Reba imigani indi
                </button>
                <p className="text-xs text-slate-400">
                  Wereka {Math.min(visible, filtered.length)} kuri{" "}
                  {filtered.length}
                </p>
              </div>
            ) : null}
          </>
        )
      ) : null}
    </div>
  );
}
