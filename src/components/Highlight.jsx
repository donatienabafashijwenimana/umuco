const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Marks the search term inside a text snippet without using dangerouslySetInnerHTML.
 */
export function Highlight({ text, query }) {
  const term = query.trim();
  if (!term) return text;

  const parts = String(text).split(new RegExp(`(${escapeRegExp(term)})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark
        key={index}
        className="rounded-sm bg-amber-200/70 px-0.5 text-inherit"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default Highlight;
