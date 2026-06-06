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
              className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              title={sourceReference.title}
            >
              {source}
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
    </div>
  );
}
