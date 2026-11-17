import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Puzzle,
  Quote,
  ScrollText,
  Sparkles,
} from "lucide-react";

const IMAGES = [
  {
    src: "/pic1.png",
    alt: "Ifoto ya kera y'abanyarwanda bagenda mu gasozi",
  },
  {
    src: "/pic2.png",
    alt: "Ifoto ya kera y'abagabo bari mu rugo rw'ibyatsi",
  },
  {
    src: "/pic3.png",
    alt: "Ifoto ya kera y'abanyarwanda bateraniye ku isoko",
  },
  {
    src: "/pic4.png",
    alt: "Ifoto ya kera y'abana n'abagore mu mudugudu",
  },
  {
    src: "/pic5.png",
    alt: "Ifoto ya kera y'umuryango imbere y'inzu y'ibyatsi",
  },
  {
    src: "/pic6.png",
    alt: "Ifoto ya kera y'abasore barangaza",
  },
  {
    src: "/pic7.png",
    alt: "Ifoto ya kera y'umuhigo w'inzovu",
  },
];

const SECTIONS = [
  {
    key: "imigani-migufi",
    icon: Quote,
    title: "Imigani migufi",
    text: "Amagambo y'ubwenge agufi, yagiye azunguruka mu rubyiruko n'abakuru.",
    tone: "from-amber-50 to-orange-50 border-amber-100 text-amber-700",
  },
  {
    key: "ibisakuzo",
    icon: Puzzle,
    title: "Ibisakuzo",
    text: "Biteze ubwenge: umaze kwishyura, usanga igisubizo kiri mu mvano.",
    tone: "from-emerald-50 to-teal-50 border-emerald-100 text-emerald-700",
  },
  {
    key: "ikeshamvugo",
    icon: Bookmark,
    title: "Ikeshamvugo",
    text: "Uko ushobora kuvuga ikintu mu buryo bwiza, ugereranyije n'ubundi buryo.",
    tone: "from-sky-50 to-cyan-50 border-sky-100 text-sky-700",
  },
  {
    key: "insigamigani",
    icon: BookOpen,
    title: "Insigamigani",
    text: "Ibirari by'imigani 100 n'inkomoko ya buri mugani, byasomwe mo PDF.",
    tone: "from-purple-50 to-fuchsia-50 border-purple-100 text-purple-700",
  },
  {
    key: "imigani-miremire",
    icon: ScrollText,
    title: "Inkuru ndende",
    text: "Imigani miremire ibanzweho gusubirwamo mu buryo bwuzuye.",
    tone: "from-rose-50 to-pink-50 border-rose-100 text-rose-700",
  },
];

function useSlidesPerView() {
  const compute = () => {
    if (typeof window === "undefined") return 3;
    if (window.matchMedia("(min-width: 1024px)").matches) return 3;
    if (window.matchMedia("(min-width: 640px)").matches) return 2;
    return 1;
  };
  const [perView, setPerView] = useState(compute);

  useEffect(() => {
    const onChange = () => setPerView(compute());
    window.addEventListener("resize", onChange);
    return () => window.removeEventListener("resize", onChange);
  }, []);

  return perView;
}

function Gallery() {
  const perView = useSlidesPerView();
  const maxIndex = Math.max(0, IMAGES.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const safeIndex = Math.min(index, maxIndex);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused, maxIndex]);

  const move = (direction) => {
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  const dots = useMemo(() => Array.from({ length: maxIndex + 1 }), [maxIndex]);

  return (
    <section
      aria-label="Amafoto y'umuco nyarwanda"
      className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl shadow-purple-900/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${safeIndex * (100 / perView)}%)` }}
      >
        {IMAGES.map((image, position) => (
          <figure
            key={image.src}
            className="relative w-full shrink-0 sm:w-1/2 lg:w-1/3"
            aria-hidden={position < safeIndex || position >= safeIndex + perView}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={position < 3 ? "eager" : "lazy"}
              decoding="async"
              className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-4 py-3 text-xs text-white/90">
              Umurage w'u Rwanda — amafoto ya kera
            </figcaption>
          </figure>
        ))}
      </div>

      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Ifoto ibanza"
        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800 shadow-md transition hover:bg-white"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Ifoto ikurikira"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800 shadow-md transition hover:bg-white"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute inset-x-0 bottom-12 flex justify-center gap-1.5">
        {dots.map((_, dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => setIndex(dot)}
            aria-label={`Jya ku ifoto ya ${dot + 1}`}
            aria-current={safeIndex === dot}
            className={`h-1.5 rounded-full transition-all ${
              safeIndex === dot ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default function Dashboard({ onNavigate }) {
  return (
    <div className="animate-fade-up space-y-8">
      <section className="overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-emerald-50 p-6 md:p-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-purple-700 uppercase shadow-sm">
            <Sparkles size={14} aria-hidden="true" />
            Isomero ry'umuco nyarwanda
          </span>
          <h1 className="mt-4 text-3xl leading-tight font-extrabold text-purple-900 md:text-5xl">
            Murakaza neza kuri{" "}
            <span className="text-emerald-600">Umuco Wacu</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Aha ni ho ubona imigani migufi n'ibisakuzo, ikeshamvugo, n'ibirari
            by'insigamigani. Byose ku buryo bworoshye: shakira, soma, kandi
            ubungabunge umuco wacu.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#/insigamigani"
              className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-700/20 transition hover:bg-purple-800"
            >
              Tangira gusoma insigamigani
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#/ibisakuzo"
              className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-5 py-2.5 text-sm font-semibold text-purple-800 transition hover:border-purple-300 hover:bg-purple-50"
            >
              Gerageza ibisakuzo
            </a>
          </div>
        </div>
      </section>

      <Gallery />

      <section aria-labelledby="ibice-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2
              id="ibice-heading"
              className="text-xl font-bold text-slate-800 md:text-2xl"
            >
              Hitamo icyiciro
            </h2>
            <p className="text-sm text-slate-500">
              Buri gice kigendeye ku byanditswe by'umwimerere.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <a
                key={section.key}
                href={`#/${section.key}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate?.(section.key);
                }}
                className="group card-surface flex flex-col gap-3 p-5 transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-gradient-to-br ${section.tone}`}
                >
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-purple-800">
                  {section.title}
                </h3>
                <p className="text-sm leading-6 text-slate-500">
                  {section.text}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
                  Fungura
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="card-surface p-6 md:p-8">
        <h2 className="text-xl font-bold text-purple-800 md:text-2xl">
          Icyo urubuga rugamije
        </h2>
        <div className="mt-3 space-y-3 text-[0.98rem] leading-7 text-slate-600">
          <p>
            Uru rubuga rugamije gusigasira no kumenyekanisha umuco nyarwanda. Ni
            nk'isomero ry'ikoranabuhanga ry'Ikinyarwanda rigenewe abana,
            urubyiruko n'abakuru bose, kandi rifasha abanyeshuri, abarimu,
            ababyeyi ndetse n'abashakashatsi mu kongera ubumenyi ku rurimi
            n'umuco nyarwanda.
          </p>
          <p>
            Aha uzasanga ibisakuzo, imigani migufi n'imigani miremire,
            ikeshamvugo n'insigamigani. Ibi byose bigamije kurinda no guteza
            imbere indangagaciro z'abanyarwanda zirimo ubupfura, ubumwe,
            ubutwari n'ubwenge. Twese hamwe tugomba gukunda umuco wacu,
            tukawusigasira kandi tukawuteza imbere kuko ari wo soko y'ubumwe,
            amahoro n'iterambere ry'igihugu.
          </p>
        </div>
      </section>
    </div>
  );
}
