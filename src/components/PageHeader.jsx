import { Search, X } from "lucide-react";

const ACCENTS = {
  purple: "focus:border-purple-400 focus:ring-purple-200",
  green: "focus:border-emerald-400 focus:ring-emerald-200",
  blue: "focus:border-sky-400 focus:ring-sky-200",
};

export function SearchField({
  value,
  onChange,
  placeholder = "Shakira hano...",
  label = "Shakira mu byanditswe",
  accent = "purple",
}) {
  return (
    <div className="relative w-full md:w-80">
      <label className="sr-only" htmlFor="search-field">
        {label}
      </label>
      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
      />
      <input
        id="search-field"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-11 w-full rounded-xl border border-slate-200 bg-white pr-10 pl-10 text-[0.95rem] text-slate-700 shadow-sm outline-none transition focus:ring-4 [&::-webkit-search-cancel-button]:hidden ${
          ACCENTS[accent] ?? ACCENTS.purple
        }`}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Siba ibyo washakishije"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}

/**
 * Consistent heading block for every content section.
 */
export function PageHeader({
  icon: Icon,
  title,
  description,
  count,
  countLabel = "byabonetse",
  query,
  onQueryChange,
  searchPlaceholder,
  accent = "purple",
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-purple-800 md:text-3xl">
          {Icon ? <Icon size={26} aria-hidden="true" className="shrink-0" /> : null}
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
        {typeof count === "number" ? (
          <p className="mt-1 text-xs font-medium tracking-wide text-slate-400 uppercase">
            {count.toLocaleString("rw-RW")} {countLabel}
          </p>
        ) : null}
      </div>

      {onQueryChange ? (
        <SearchField
          value={query}
          onChange={onQueryChange}
          placeholder={searchPlaceholder}
          accent={accent}
        />
      ) : null}
    </header>
  );
}

export default PageHeader;
