type SourceListProps = {
  sources: string[];
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase text-slate-500">Sources</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {sources.map((source) => (
          <span
            key={source}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {source}
          </span>
        ))}
      </div>
    </div>
  );
}
