import { Fragment } from "react";

/** Renders text with **word** segments highlighted in red. */
export function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*([^*]+)\*\*$/);
        if (m) {
          return (
            <span key={i} className="text-[#e11d2a]">
              {m[1]}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
