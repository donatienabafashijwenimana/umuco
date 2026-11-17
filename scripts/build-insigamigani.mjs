/**
 * Extracts the Insigamigani PDF into a structured JSON dataset used by the
 * Insigamigani reader page.
 *
 *   node scripts/build-insigamigani.mjs
 *
 * Output: public/document/insigamigani/insigamigani.json
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PDF_PATH = path.join(root, "public/document/insigamigani/INSIGAMIGANI.pdf");
const OUT_PATH = path.join(root, "public/document/insigamigani/insigamigani.json");

/**
 * Rebuild visual lines from pdf.js text items, grouped by baseline, keeping the
 * vertical gap and left offset so paragraphs can be detected later on.
 */
function pageLines(items) {
  const rows = new Map();
  for (const item of items) {
    if (!item.str || !item.str.trim()) continue;
    const y = Math.round(item.transform[5]);
    const x = item.transform[4];
    if (!rows.has(y)) rows.set(y, { x: Infinity, parts: [] });
    const row = rows.get(y);
    row.x = Math.min(row.x, x);
    row.parts.push({ x, str: item.str });
  }
  const lines = [...rows.entries()].sort((a, b) => b[0] - a[0]);
  return lines.map(([y, { x, parts }], index) => ({
    y,
    x,
    gap: index === 0 ? Infinity : lines[index - 1][0] - y,
    text: parts
      .sort((a, b) => a.x - b.x)
      .map((p) => p.str)
      .join("")
      .replace(/\s+/g, " ")
      .trim(),
  }));
}

const isNoise = (line) =>
  !line ||
  /^\d{1,3}$/.test(line) ||
  /^ITONDEKE RY[’']INSIGAMIGANI$/i.test(line) ||
  /^Imirangururire y[’']insigamigani$/i.test(line);

const TOC_LINE = /^(\d{1,3})\.\s*(.*?)\s*\.{4,}\s*\d{1,3}\s*$/;
const HEADING = /^(\d{1,3})\.\s*(.*)$/;

/** Loose comparison key: lowercase alphanumerics only. */
const key = (text) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const sameHeading = (lineText, number, title) => {
  const match = HEADING.exec(lineText);
  if (!match || Number(match[1]) !== number) return false;
  const rest = key(match[2]).replace(/[.'"]/g, "").trim();
  const wanted = key(title).replace(/[.'"]/g, "").trim();
  if (!wanted) return rest === "";
  return rest === wanted || rest.startsWith(wanted) || wanted.startsWith(rest);
};

const pdf = await pdfjs.getDocument({
  data: new Uint8Array(await readFile(PDF_PATH)),
  useSystemFonts: true,
}).promise;

const pages = [];
for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
  const page = await pdf.getPage(pageNumber);
  const { items } = await page.getTextContent();
  pages.push(
    pageLines(items)
      .filter((line) => !isNoise(line.text))
      .map((line) => ({ ...line, page: pageNumber }))
  );
}

const allLines = pages.flat();
const pageMedianGap = new Map(
  pages.map((lines) => {
    const gaps = lines
      .map((line) => line.gap)
      .filter((gap) => Number.isFinite(gap) && gap > 0 && gap < 100)
      .sort((a, b) => a - b);
    return [lines[0]?.page, gaps[Math.floor(gaps.length / 2)] ?? 16];
  })
);

// ---- Table of contents ----------------------------------------------------
let toc = [];
let tocStartIndex = -1;
for (const [index, line] of allLines.entries()) {
  const match = TOC_LINE.exec(line.text);
  if (!match) continue;
  const number = Number(match[1]);
  // The document has a short TOC for its introduction, then the story TOC
  // starts again at 1. Keep only the second, story-level list.
  if (number === 1 && toc.length > 1) {
    toc = [];
    tocStartIndex = index;
  }
  if (tocStartIndex === -1) tocStartIndex = index;
  toc.push({
    number,
    title: match[2].replace(/\s*\.+$/, "").replace(/\s+/g, " ").trim(),
  });
}

// ---- Body ----------------------------------------------------------------
const lastTocIndex = allLines.reduce(
  (last, line, index) => (TOC_LINE.test(line.text) ? index : last),
  -1
);
// Dot leaders identify the table of contents; they never belong to the text.
const body = allLines
  .slice(lastTocIndex + 1)
  .filter((line) => !/\.{4,}\s*\d*\s*$/.test(line.text));

const introStart = body.findIndex((line) =>
  /^Insigamigani\s*ni\s*zimwe/i.test(line.text)
);

// Locate each TOC entry in the body, in order, so repeated titles don't collide.
const headingIndexes = [];
let cursor = introStart + 1;
for (const entry of toc) {
  for (let i = cursor; i < body.length; i += 1) {
    if (sameHeading(body[i].text, entry.number, entry.title)) {
      headingIndexes.push({ ...entry, index: i });
      cursor = i + 1;
      break;
    }
  }
}

// Drop an index/appendix section if one follows the last story.
const endIndex = (() => {
  const stop = body.findIndex(
    (line, index) =>
      index > (headingIndexes.at(-1)?.index ?? 0) &&
      /^IBYIFASHISHIJWE|^IBYIFASHSHIJWE|^AMASHAKIRO/i.test(line.text)
  );
  return stop === -1 ? body.length : stop;
})();

/** Join raw lines into paragraphs, using vertical gaps as paragraph breaks. */
function paragraphsOf(lines) {
  const paragraphs = [];
  let current = [];
  let previousPage = null;
  for (const line of lines) {
    const typicalGap = pageMedianGap.get(line.page) ?? 16;
    const newPage = previousPage !== null && line.page !== previousPage;
    const bigGap = line.gap > typicalGap * 1.3 && line.gap < typicalGap * 4;
    // Page/gap breaks only start a new paragraph when the previous sentence ended.
    const endsSentence = /[.!?:;»”"]$/.test(current[current.length - 1] ?? "");
    const pageBreak = newPage && current.length && endsSentence;
    const gapBreak = bigGap && current.length && endsSentence;
    if ((pageBreak || gapBreak) && current.length) {
      paragraphs.push(current.join(" "));
      current = [];
    }
    current.push(line.text);
    previousPage = line.page;
  }
  if (current.length) paragraphs.push(current.join(" "));
  return paragraphs
    .map((text) =>
      text
        .replace(/[“«]{1}/g, "«")
        .replace(/[”»]{1}/g, "»")
        .replace(/\s+([,.;:!?])/g, "$1")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((text) => text.length > 1);
}

const introEnd = headingIndexes[0]?.index ?? endIndex;
const intro = paragraphsOf(body.slice(introStart === -1 ? 0 : introStart, introEnd));

const stories = headingIndexes.map((entry, i) => {
  const start = entry.index + 1;
  const stop = headingIndexes[i + 1]?.index ?? endIndex;
  return {
    number: entry.number,
    title: entry.title,
    paragraphs: paragraphsOf(body.slice(start, stop)),
  };
});

const dataset = {
  source: "Insigamigani — ibirari by'imigani y'u Rwanda",
  intro,
  stories: stories.filter((story) => story.paragraphs.length > 0),
};

await writeFile(OUT_PATH, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");

console.log(
  `TOC entries: ${toc.length} | matched: ${headingIndexes.length} | written: ${
    dataset.stories.length
  } | intro: ${intro.length} paras`
);
const missing = toc.filter(
  (entry) => !headingIndexes.some((heading) => heading.number === entry.number)
);
if (missing.length) {
  console.log("Unmatched:", missing.map((m) => `${m.number}. ${m.title}`).join(" | "));
}
