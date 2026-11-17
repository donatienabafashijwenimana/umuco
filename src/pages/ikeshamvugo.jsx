import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bookmark } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { EmptyState, ErrorState, LoadingRows } from "../components/States";
import Highlight from "../components/Highlight";
import { useSheets } from "../hooks/useSheets";

const SECTIONS = [
  {
    key: "inka",
    label: "Inka",
    title: "Ikeshamvugo ku nka",
    path: "/document/ikeshamvugo/ikeshamvugo-inka.xlsx",
  },
  {
    key: "ingoma",
    label: "Ingoma",
    title: "Ikeshamvugo ku ngoma",
    path: "/document/ikeshamvugo/ikeshamvugo-ingoma.xlsx",
  },
  {
    key: "amata",
    label: "Amata n'igisabo",
    title: "Ikeshamvugo ku mata n'igisabo",
    path: "/document/ikeshamvugo/ikeshamvugo-amata-igisabo.xlsx",
  },
  {
    key: "isekuru",
    label: "Isekuru n'ibindi",
    title: "Ikeshamvugo ku isekuru, icyansi, umuheto, ingobyi n'igisabo",
    path: "/document/ikeshamvugo/isekuru-icyansi-umuheto-ingobyi-igisabo.xlsx",
  },
];

const SHEETS = SECTIONS.map((section) => section.path);

const parseSheet = (rows = []) => {
  const [firstRow = []] = rows;
  const hasHeader = /ntibavuga|bavuga/i.test(firstRow.join(" "));
  return (hasHeader ? rows.slice(1) : rows)
    .map(([wrong = "", right = ""]) => ({ wrong, right }))
    .filter((item) => item.wrong || item.right);
};

export default function Ikeshamvugo() {
  const { data, status, error, reload } = useSheets(SHEETS);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("inka");

  const entries = useMemo(
    () =>
      SECTIONS.flatMap((section) =>
        parseSheet(data[section.path]).map((item, index) => ({
          ...item,
          key: `${section.key}-${index}`,
          section: section.label,
          sectionKey: section.key,
        }))
      ),
    [data]
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return entries;
    return entries.filter(
      (item) =>
        item.wrong.toLowerCase().includes(term) ||
        item.right.toLowerCase().includes(term) ||
        item.section.toLowerCase().includes(term)
    );
  }, [entries, query]);

  useEffect(() => {
    const current = filtered.filter((item) => item.sectionKey === active);
    if (!current.length && filtered.length) {
      setActive(filtered[0].sectionKey);
    }
  }, [filtered, active]);

  const shown = filtered.filter((item) => item.sectionKey === active);
  const activeSection = SECTIONS.find((section) => section.key === active);

  return (
    <div className="animate-fade-up">
      <PageHeader
        icon={Bookmark}
        title="Ikeshamvugo"
        description="Mu Kinyarwanda hari uko ibintu bivugwa mu buryo bwahariwe umwuga cyangwa ubwoko bw'ikintu, utabivuga nk'uko bisanzwe."
        count={status === "ready" ? filtered.length : undefined}
        countLabel={query ? "byabonetse" : "amagambo"}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Shakira ikeshamvugo..."
        accent="blue"
      />

      {status === "loading" ? <LoadingRows rows={5} /> : null}
      {status === "error" ? <ErrorState message={error} onRetry={reload} /> : null}

      {status === "ready" ? (
        <>
          <div
            role="tablist"
            aria-label="Ibyiciro by'ikeshamvugo"
            className="-mx-1 mb-4 flex gap-1.5 overflow-x-auto px-1 pb-2"
          >
            {SECTIONS.map((section) => {
              const count = filtered.filter(
                (item) => item.sectionKey === section.key
              ).length;
              const selected = section.key === active;
              return (
                <button
                  key={section.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(section.key)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                    selected
                      ? "bg-sky-700 text-white shadow-sm"
                      : "border border-sky-100 bg-white text-slate-600 hover:bg-sky-50 hover:text-sky-800"
                  }`}
                >
                  {section.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      selected ? "text-sky-100" : "text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <section
            role="tabpanel"
            aria-label={activeSection?.title}
            className="card-surface p-4 md:p-6"
          >
            <h2 className="mb-1 text-lg font-semibold text-sky-800">
              {activeSection?.title}
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Ibumoso ni ibyo utavuga; iburyo ni ibyo uvuga mu buryo
              bw'ikeshamvugo.
            </p>

            {shown.length === 0 ? (
              <EmptyState
                title="Nta keshamvugo kabonetse"
                hint="Gerageza irindi jambo cyangwa uhitemo ikindi gice."
              />
            ) : (
              <ol className="divide-y divide-sky-50">
                {shown.map((item, index) => (
                  <li
                    key={item.key}
                    className="grid items-center gap-1.5 py-3 sm:grid-cols-[2rem_1fr_auto_1fr] sm:gap-3"
                  >
                    <span className="text-xs font-semibold text-slate-400">
                      {index + 1}
                    </span>
                    <span className="leading-6 text-slate-700">
                      <span className="mr-2 text-xs font-semibold tracking-wide text-rose-500 uppercase sm:hidden">
                        Ntibavuga
                      </span>
                      <Highlight text={item.wrong} query={query} />
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="hidden text-slate-300 sm:block"
                    />
                    <span className="leading-6 font-medium text-sky-800">
                      <span className="mr-2 text-xs font-semibold tracking-wide text-sky-500 uppercase sm:hidden">
                        Bavuga
                      </span>
                      <Highlight text={item.right} query={query} />
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
