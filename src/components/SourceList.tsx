import type { SourceReference } from "@/data/sources";

type SourceListProps = {
  sources: string[];
  sourceReferences?: SourceReference[];
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findSourceReference(
  label: string,
  sourceReferences: SourceReference[] = [],
) {
  const normalizedLabel = normalize(label);

  return sourceReferences.find((source) => {
    const candidates = [
      source.id,
      source.title,
      source.organization,
      source.category,
    ].map(normalize);

    return candidates.some(
      (candidate) =>
        candidate.includes(normalizedLabel) || normalizedLabel.includes(candidate),
    );
  });
}

export function SourceList({ sources, sourceReferences = [] }: SourceListProps) {
  const periodBadges = Array.from(
    new Set(sourceReferences.flatMap((source) => source.periodBadges ?? [])),
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase text-slate-500">Sources</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {sources.map((source) => {
          const sourceReference = findSourceReference(source, sourceReferences);

          return sourceReference ? (
            <a
              key={source}
              href={sourceReference.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium !text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              title={sourceReference.title}
            >
              <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                {source}
              </span>
            </a>
          ) : (
            <span
              key={source}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {source}
            </span>
          );
        })}
      </div>

      {periodBadges.length > 0 ? (
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Comparison periods
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {periodBadges.map((period) => (
              <span
                key={period}
                className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800"
              >
                {period}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
