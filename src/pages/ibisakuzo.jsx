import { useEffect, useMemo, useState } from "react";
import { Puzzle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { EmptyState, ErrorState, LoadingRows } from "../components/States";
import Highlight from "../components/Highlight";
import { useSheets } from "../hooks/useSheets";

const SHEETS = ["/document/ibisakuzo.xlsx"];
const PAGE_SIZE = 30;

export default function Ibisakuzo() {
  const { data, status, error, reload } = useSheets(SHEETS);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const items = useMemo(() => {
    const rows = data[SHEETS[0]] ?? [];
    return rows
      .map(([question = "", answer = ""]) => ({ question, answer }))
      .filter((item) => item.question || item.answer)
      .map((item, index) => ({ ...item, id: index + 1 }));
  }, [data]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term)
    );
  }, [items, query]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query]);

  return (
    <div className="animate-fade-up">
      <PageHeader
        icon={Puzzle}
        title="Ibisakuzo"
        description="Ibisakuzo by'ubwenge by'Abanyarwanda: soma ikibazo, ugerageze kwishyura mbere yo kureba igisubizo."
        count={status === "ready" ? filtered.length : undefined}
        countLabel={query ? "byabonetse" : "ibisakuzo"}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Shakira ikibazo cyangwa igisubizo..."
        accent="green"
      />

      {status === "loading" ? <LoadingRows rows={6} /> : null}
      {status === "error" ? <ErrorState message={error} onRetry={reload} /> : null}

      {status === "ready" ? (
        filtered.length === 0 ? (
          <EmptyState
            title="Nta gisakuzo kibonetse"
            hint="Gerageza ijambo rindi cyangwa usibe ibyo washakishije."
          />
        ) : (
          <>
            <ol className="grid gap-3 md:grid-cols-2">
              {filtered.slice(0, visible).map((item) => (
                <li
                  key={item.id}
                  className="card-surface p-4 transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700">
                      {item.id}
                    </span>
                    <div className="space-y-1.5">
                      <p className="leading-6 font-medium text-slate-800">
                        <Highlight text={item.question} query={query} />
                      </p>
                      <p className="text-sm leading-6 text-slate-600">
                        <span className="mr-1.5 rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">
                          Igisubizo
                        </span>
                        <Highlight text={item.answer} query={query} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {visible < filtered.length ? (
              <div className="mt-6 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisible((value) => value + PAGE_SIZE)}
                  className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  Reba ibindi bisakuzo
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
