import { inflationStability } from "@/data/inflationStability";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatPercent(value: number) {
  return `${formatNumber(value)}%`;
}

function SummaryCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
    </article>
  );
}

function BarChart({
  title,
  rows,
}: {
  title: string;
  rows: {
    label: string;
    value: number;
    display: string;
    after2014?: boolean;
    colorClass?: string;
  }[];
}) {
  const maxValue = Math.max(...rows.map((row) => row.value));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((row) => {
          const width = maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";
          const color =
            row.colorClass ?? (row.after2014 ? "bg-[#ff9933]" : "bg-teal-700");

          return (
            <div key={`${title}-${row.label}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{row.label}</span>
                <span className="font-semibold text-slate-950">
                  {row.display}
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${color}`}
                  style={{ width }}
                  aria-label={`${row.label}: ${row.display}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function InflationStabilitySection() {
  const data = inflationStability;
  const latestTrend = data.recentTrend[data.recentTrend.length - 1];
  const averageRows = data.averageInflation.map((item, index) => ({
    label: item.period,
    value: item.valuePercent,
    display: `${formatPercent(item.valuePercent)} (${item.government})`,
    after2014: index > 0,
    colorClass: index === 0 ? "bg-red-600" : undefined,
  }));
  const trendRows = data.recentTrend.map((item) => ({
    label: item.year,
    value: item.inflationPercent,
    display: formatPercent(item.inflationPercent),
    after2014: true,
  }));

  return (
    <section id="inflation-price-stability" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Inflation & Price Stability
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Retail inflation is compared using average CPI inflation, recent
            annual trend data, and March 2025 rural, urban, and food inflation
            indicators from the official PIB release.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard
            label="Average inflation 2004–14"
            value={formatPercent(data.averageInflation[0].valuePercent)}
            note={data.averageInflation[0].period}
          />
          <SummaryCard
            label="Average inflation 2015–25"
            value={formatPercent(data.averageInflation[1].valuePercent)}
            note={data.averageInflation[1].period}
          />
          <SummaryCard
            label="FY2024–25 retail inflation"
            value={formatPercent(latestTrend.inflationPercent)}
            note="Lowest since 2018–19"
          />
          <SummaryCard
            label="March 2025 CPI inflation"
            value={formatPercent(data.march2025.cpiInflationPercent)}
            note="Year-on-year CPI inflation"
          />
          <SummaryCard
            label="March 2025 food inflation"
            value={formatPercent(data.march2025.foodInflationPercent)}
            note="Consumer Food Price Index"
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <BarChart title="Average Retail Inflation" rows={averageRows} />
          <BarChart title="Recent CPI Trend" rows={trendRows} />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">
            March 2025 Detail
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
              label="Rural headline inflation"
              value={formatPercent(data.march2025.ruralHeadlineInflationPercent)}
              note={`Rural food inflation: ${formatPercent(
                data.march2025.ruralFoodInflationPercent,
              )}`}
            />
            <SummaryCard
              label="Urban headline inflation"
              value={formatPercent(data.march2025.urbanHeadlineInflationPercent)}
              note={`Urban food inflation: ${formatPercent(
                data.march2025.urbanFoodInflationPercent,
              )}`}
            />
            <SummaryCard
              label="Food inflation"
              value={formatPercent(data.march2025.foodInflationPercent)}
              note="Lowest since November 2021"
            />
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Policy Measures
          </h3>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
            {data.policyMeasures.map((measure) => (
              <li key={measure} className="rounded-md bg-slate-50 px-3 py-2">
                {measure}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={data.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {data.source}
          </a>
        </p>
      </div>
    </section>
  );
}
