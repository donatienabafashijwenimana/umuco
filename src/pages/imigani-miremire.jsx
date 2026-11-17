import {
  ArrowRight,
  BookOpen,
  Clock,
  Quote,
  ScrollText,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";

/**
 * Inkuru ndende ziteganyijwe. Nta nyandiko yuzuye iraboneka muri ububiko, ni
 * yo mpamvu zigaragarishwa nk'iziteganyijwe aho kuzihimba.
 */
const UPCOMING = [
  "Umugani wa Ngunda",
  "Bakame n'Impyisi",
  "Maguru ya Sarwaya",
  "Petero Nzukira",
];

const AVAILABLE = [
  {
    href: "#/insigamigani",
    icon: BookOpen,
    title: "Insigamigani",
    text: "Imigani 100 yuzuye, ishobora gusomwa no gushakishwa ubu.",
    count: "100",
  },
  {
    href: "#/imigani-migufi",
    icon: Quote,
    title: "Imigani migufi",
    text: "Imigani migufi n'imigenurano y'Abanyarwanda.",
    count: "1,134",
  },
];

export default function ImiganiMiremire() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        icon={ScrollText}
        title="Inkuru n'imigani miremire"
        description="Imigani miremire isaba umwanya muremure wo kuyisoma: ibyo ni inkuru zirambuye, zikubiyemo abantu, imvugo n'inyigisho bitandukanye n'imigani migufi."
        count={UPCOMING.length}
        countLabel="inkuru ziteganyijwe"
      />

      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-6 text-amber-900">
        <Clock size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
        <p>
          Inkuru ziri ku rutonde ariko inyandiko yazo yuzuye ntirasomwa ku
          rubuga. Kugeza igihe zizaba ziteguye, ushobora gusoma{" "}
          <a
            href="#/insigamigani"
            className="font-semibold underline underline-offset-2"
          >
            insigamigani 100
          </a>{" "}
          zuzuye.
        </p>
      </div>

      <section aria-labelledby="ibyahari" className="mb-8">
        <h2
          id="ibyahari"
          className="mb-3 text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase"
        >
          Ibyahari ubu
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {AVAILABLE.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="group card-surface flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-700">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="flex items-baseline gap-2">
                      <span className="font-semibold text-slate-800 group-hover:text-purple-800">
                        {item.title}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {item.count}
                      </span>
                    </span>
                    <span className="text-sm leading-6 text-slate-500">
                      {item.text}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
                      Soma
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="ziteganyijwe">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="ziteganyijwe"
            className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase"
          >
            Inkuru ziteganyijwe
          </h2>
          <p className="text-xs text-slate-400">
            {UPCOMING.length} ziteganyijwe · 0 zarangiye
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {UPCOMING.map((title, index) => (
            <li
              key={title}
              className="card-surface flex flex-col gap-3 border-dashed p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 font-serif text-base font-bold text-rose-600">
                  {index + 1}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                  Bireze
                </span>
              </div>
              <h3 className="font-serif text-lg leading-snug font-semibold text-slate-700">
                {title}
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                Iyi nkuru izasomwa hano igihe inyandiko yayo yuzuye.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
