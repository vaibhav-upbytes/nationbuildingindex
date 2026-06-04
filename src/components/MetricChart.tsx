type MetricChartProps = {
  label: string;
  before: string;
  after: string;
};

function numericValue(value: string) {
  const parsed = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? Math.abs(parsed) : 0;
}

export function MetricChart({ label, before, after }: MetricChartProps) {
  const beforeValue = numericValue(before);
  const afterValue = numericValue(after);
  const maxValue = Math.max(beforeValue, afterValue, 1);
  const beforeWidth = `${Math.max(8, (beforeValue / maxValue) * 100)}%`;
  const afterWidth = `${Math.max(8, (afterValue / maxValue) * 100)}%`;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase text-slate-500">
        Headline Chart
      </h3>
      <p className="mt-2 text-base font-semibold text-slate-950">{label}</p>
      <div className="mt-5 space-y-4">
        <div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-slate-600">2004–2014</span>
            <span className="font-semibold text-slate-950">{before}</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-slate-100">
            <div className="h-3 rounded-full bg-teal-700" style={{ width: beforeWidth }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-slate-600">2014–Present</span>
            <span className="font-semibold text-slate-950">{after}</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-slate-100">
            <div className="h-3 rounded-full bg-[#ff9933]" style={{ width: afterWidth }} />
          </div>
        </div>
      </div>
    </section>
  );
}
