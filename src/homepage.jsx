import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "./navigation";
import { useHashPage } from "./hooks/useHashPage";
import Ahabanza from "./pages/dashboard";
import Imiganimigufi from "./pages/imigani-migufi";
import Ibisakuzo from "./pages/ibisakuzo";
import Ikeshamvugo from "./pages/ikeshamvugo";
import Imiganimiremire from "./pages/imigani-miremire";
import Insigamigani from "./pages/insigamigani";

const PAGES = {
  ahabanza: Ahabanza,
  "imigani-migufi": Imiganimigufi,
  ibisakuzo: Ibisakuzo,
  ikeshamvugo: Ikeshamvugo,
  "imigani-miremire": Imiganimiremire,
  insigamigani: Insigamigani,
};

function Brand() {
  return (
    <a
      href="#/ahabanza"
      className="flex items-center gap-3 rounded-2xl focus-visible:outline-purple-600"
    >
      <img
        src="/logo.svg"
        alt=""
        className="h-11 w-11 rounded-full border border-purple-100 bg-white object-contain p-1 shadow-sm"
      />
      <span className="leading-tight">
        <span className="block text-xl font-extrabold tracking-tight text-purple-800 md:text-2xl">
          Umuco<span className="text-emerald-600">Wacu</span>
        </span>
        <span className="hidden text-xs font-medium tracking-wide text-slate-500 sm:block">
          Umurage n'ubuvanganzo nyarwanda
        </span>
      </span>
    </a>
  );
}

export default function Homepage() {
  const [page, navigate] = useHashPage();
  const [menuOpen, setMenuOpen] = useState(false);
  const ActivePage = PAGES[page] ?? Ahabanza;

  useEffect(() => {
    setMenuOpen(false);
  }, [page]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-purple-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Simbukira ku byanditswe
      </a>

      <header className="sticky top-0 z-30 border-b border-purple-100/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Brand />

          <nav aria-label="Ibyiciro by'urubuga" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.key}>
                    <a
                      href={`#/${item.key}`}
                      aria-current={page === item.key ? "page" : undefined}
                      className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                        page === item.key
                          ? "bg-purple-700 text-white shadow-sm"
                          : "text-slate-600 hover:bg-purple-50 hover:text-purple-800"
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {item.short}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex items-center gap-2 rounded-xl border border-purple-100 px-3 py-2 text-sm font-semibold text-purple-800 transition hover:bg-purple-50 lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="hidden sm:inline">Ibice</span>
            <span className="sr-only">
              {menuOpen ? "Funga urutonde" : "Fungura urutonde"}
            </span>
          </button>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Ibyiciro by'urubuga kuri telefoni"
            className="border-t border-purple-100 bg-white px-4 pt-2 pb-4 lg:hidden"
          >
            <ul className="grid gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.key}>
                    <a
                      href={`#/${item.key}`}
                      aria-current={page === item.key ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        page === item.key
                          ? "bg-purple-700 text-white"
                          : "text-slate-700 hover:bg-purple-50"
                      }`}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </header>

      <main
        id="main"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8"
      >
        <ActivePage onNavigate={navigate} />
      </main>

      <footer className="mt-auto border-t border-purple-100 bg-white/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:justify-between md:px-6">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Urubuga rwo kubungabunga umuco nyarwanda: imigani, ibisakuzo,
              ikeshamvugo n'insigamigani mu buryo bworoshye gukoresha.
            </p>
          </div>

          <nav aria-label="Ihuza ry'urubuga" className="text-sm">
            <h2 className="mb-2 font-semibold text-slate-800">Ibyiciro</h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {NAV_ITEMS.map(({ key, name }) => (
                <li key={key}>
                  <a
                    href={`#/${key}`}
                    className="text-slate-500 transition hover:text-purple-700"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm text-slate-500">
            <h2 className="mb-2 font-semibold text-slate-800">Inkomoko</h2>
            <a
              href="/document/insigamigani/INSIGAMIGANI.pdf"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-purple-300 underline-offset-4 transition hover:text-purple-700"
            >
              Insigamigani — PDF y'umwimerere
            </a>
            <p className="mt-4 text-xs text-slate-400">
              © {new Date().getFullYear()} Umuco Wacu. Amakuru yose
              y'umuco nyarwanda.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
