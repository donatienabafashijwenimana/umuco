import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  ListTree,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { EmptyState, ErrorState, LoadingRows } from "../components/States";
import Highlight from "../components/Highlight";
import { useJson } from "../hooks/useJson";

const DATA_URL = "/document/insigamigani/insigamigani.json";
const PAGE_SIZE = 24;

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ");

const readingMinutes = (paragraphs) =>
  Math.max(
    1,
    Math.round(paragraphs.join(" ").split(/\s+/).length / 180)
  );

const snippetAround = (text, term) => {
  const index = normalize(text).indexOf(normalize(term));
  if (index < 0) return text.slice(0, 140).trim();
  const start = Math.max(0, index - 60);
  const end = Math.min(text.length, index + term.length + 80);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${
    end < text.length ? "…" : ""
  }`;
};

const searchStory = (story, term) => {
  if (!term) return { matches: true };
  const haystack = normalize(
    `${story.title} ${story.paragraphs.join(" ")}`
  );
  if (!haystack.includes(normalize(term))) return { matches: false };
  if (normalize(story.title).includes(normalize(term))) {
    return { matches: true };
  }
  const paragraph =
    story.paragraphs.find((item) =>
      normalize(item).includes(normalize(term))
    ) ?? story.paragraphs[0];
  return { matches: true, snippet: snippetAround(paragraph, term) };
};

function StoryArticle({ story, stories, onSelect, onBack }) {
  const position = stories.findIndex((item) => item.number === story.number);
  const previous = stories[position - 1];
  const next = stories[position + 1];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [story.number]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onBack]);

  return (
    <article className="mx-auto max-w-3xl animate-fade-up">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-800 transition hover:bg-purple-50"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Insigamigani zose
        </button>
        <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500 uppercase">
          <Clock size={14} aria-hidden="true" />
          {readingMinutes(story.paragraphs)} min yo gusoma
        </p>
      </div>

      <div className="card-surface p-5 md:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-purple-500 uppercase">
          Umugani wa {story.number}
        </p>
        <h1 className="mt-2 font-serif text-2xl leading-snug font-bold text-slate-900 md:text-4xl">
          {story.title}
        </h1>
        <hr className="my-6 border-purple-100" />

        <div className="space-y-5">
          {story.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`font-serif text-[1.06rem] leading-8 text-slate-700 md:text-[1.12rem] md:leading-9 ${
                index === 0
                  ? "first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:text-5xl first-letter:leading-[0.85] first-letter:font-bold first-letter:text-purple-700"
                  : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <nav
        aria-label="Guhindura umugani"
        className="mt-5 grid gap-3 sm:grid-cols-2"
      >
        {previous ? (
          <button
            type="button"
            onClick={() => onSelect(previous.number)}
            className="card-surface flex h-full flex-col items-start gap-1 p-4 text-left transition hover:border-purple-200 hover:shadow-md"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase">
              <ArrowLeft size={13} aria-hidden="true" /> Uwabanje
            </span>
            <span className="font-medium text-slate-800">{previous.title}</span>
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        {next ? (
          <button
            type="button"
            onClick={() => onSelect(next.number)}
            className="card-surface flex h-full flex-col items-end gap-1 p-4 text-right transition hover:border-purple-200 hover:shadow-md sm:col-start-2"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase">
              Ukurikira <ArrowRight size={13} aria-hidden="true" />
            </span>
            <span className="font-medium text-slate-800">{next.title}</span>
          </button>
        ) : null}
      </nav>
    </article>
  );
}

export default function Insigamigani() {
  const { data, status, error } = useJson(DATA_URL);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  const stories = useMemo(() => data?.stories ?? [], [data]);
  const selectedStory = stories.find((story) => story.number === selected);

  const results = useMemo(() => {
    const term = query.trim();
    if (!term) return stories.map((story) => ({ story }));
    return stories
      .map((story) => ({ story, ...searchStory(story, term) }))
      .filter((item) => item.matches);
  }, [stories, query]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query]);

  if (selectedStory) {
    return (
      <StoryArticle
        story={selectedStory}
        stories={stories}
        onSelect={setSelected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        icon={BookOpen}
        title="Insigamigani"
        description="Ibirari by'insigamigani: imigani 100 yanditswe mu gitabo, ubu ishobora gusomwa ku buryo bworoshye kandi ishakishwa mu magambo yayo yose."
        count={status === "ready" ? results.length : undefined}
        countLabel={query ? "zabonetse" : "insigamigani"}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Shakira mu nsigamigani..."
        accent="purple"
      />

      {status === "loading" ? <LoadingRows rows={5} /> : null}
      {status === "error" ? <ErrorState message={error} /> : null}

      {status === "ready" ? (
        <>
          {!query && data?.intro?.length ? (
            <details className="card-surface mb-6 p-5 open:pb-6" open>
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-purple-800">
                <ListTree size={16} aria-hidden="true" />
                Ijambo ribanza: Insigamigani ni iki?
              </summary>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 md:text-[0.95rem]">
                {data.intro.slice(0, 3).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {data.intro.length > 3 ? (
                  <details className="mt-1">
                    <summary className="cursor-pointer text-sm font-semibold text-purple-700">
                      Soma ibisigaye
                    </summary>
                    <div className="mt-3 space-y-3">
                      {data.intro.slice(3).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            </details>
          ) : null}

          {results.length === 0 ? (
            <EmptyState
              title="Nta mugani wabonetse"
              hint="Gerageza irindi jambo, urugero: inka, umwami cyangwa ubwenge."
            />
          ) : (
            <>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.slice(0, visible).map(({ story, snippet }) => (
                  <li key={story.number}>
                    <button
                      type="button"
                      onClick={() => setSelected(story.number)}
                      className="group card-surface flex h-full w-full flex-col gap-2 p-4 text-left transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
                    >
                      <span className="flex items-center justify-between text-xs font-semibold text-purple-500">
                        <span>Umugani wa {story.number}</span>
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Clock size={12} aria-hidden="true" />
                          {readingMinutes(story.paragraphs)} min
                        </span>
                      </span>
                      <span className="font-serif text-lg leading-snug font-semibold text-slate-800 group-hover:text-purple-800">
                        <Highlight text={story.title} query={query} />
                      </span>
                      <span className="line-clamp-3 text-sm leading-6 text-slate-500">
                        <Highlight
                          text={
                            snippet ??
                            `${story.paragraphs[0] ?? ""}`
                          }
                          query={query}
                        />
                      </span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-purple-700">
                        Soma
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition group-hover:translate-x-0.5"
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {visible < results.length ? (
                <div className="mt-6 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVisible((value) => value + PAGE_SIZE)}
                    className="rounded-full bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800"
                  >
                    Reba izindi nsigamigani
                  </button>
                  <p className="text-xs text-slate-400">
                    Wereka {Math.min(visible, results.length)} kuri{" "}
                    {results.length}
                  </p>
                </div>
              ) : null}
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
