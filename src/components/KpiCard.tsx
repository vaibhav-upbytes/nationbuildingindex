type KpiCardProps = {
  label: string;
  before: string;
  after: string;
  unit?: string;
};

export function KpiCard({ label, before, after, unit }: KpiCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <p className="rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
          {before}
        </p>
        <span className="hidden text-slate-400 sm:block">→</span>
        <p className="rounded-md bg-orange-50 px-3 py-2 text-sm font-semibold text-slate-950">
          {after}
        </p>
      </div>
      {unit ? <p className="mt-2 text-xs text-slate-500">{unit}</p> : null}
    </article>
  );
}
