import type { RuralRoadDevelopmentPeriod } from "@/data/ruralDevelopment";
import { ruralRoadDevelopment } from "@/data/ruralDevelopment";

const numberFormatter = new Intl.NumberFormat("en-IN");

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatKm(value: number) {
  return `${formatNumber(value)} km`;
}

function PeriodCard({ period }: { period: RuralRoadDevelopmentPeriod }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-teal-700">{period.period}</p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          {period.government}
        </h3>
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-4">
          <dt className="text-sm font-medium text-slate-600">
            Total completed road length
          </dt>
          <dd className="mt-2 text-2xl font-bold text-slate-950">
            {formatKm(period.totalRoadLengthKm)}
          </dd>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <dt className="text-sm font-medium text-slate-600">
            Total completed bridges
          </dt>
          <dd className="mt-2 text-2xl font-bold text-slate-950">
            {formatNumber(period.totalBridges)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function RoadsTable({ periods }: { periods: RuralRoadDevelopmentPeriod[] }) {
  const schemes = Array.from(
    new Set(periods.flatMap((period) => period.roadsByScheme.map((row) => row.scheme))),
  );

  const findLength = (period: RuralRoadDevelopmentPeriod, scheme: string) =>
    period.roadsByScheme.find((row) => row.scheme === scheme)?.lengthKm ?? 0;

  return (
    <BreakdownTable
      title="Scheme-wise road length"
      unit="Length"
      schemes={schemes}
      periods={periods}
      getValue={(period, scheme) => formatKm(findLength(period, scheme))}
    />
  );
}

function BridgesTable({ periods }: { periods: RuralRoadDevelopmentPeriod[] }) {
  const schemes = Array.from(
    new Set(
      periods.flatMap((period) => period.bridgesByScheme.map((row) => row.scheme)),
    ),
  );

  const findCount = (period: RuralRoadDevelopmentPeriod, scheme: string) =>
    period.bridgesByScheme.find((row) => row.scheme === scheme)?.count ?? 0;

  return (
    <BreakdownTable
      title="Scheme-wise bridges"
      unit="Bridges"
      schemes={schemes}
      periods={periods}
      getValue={(period, scheme) => formatNumber(findCount(period, scheme))}
    />
  );
}

function BreakdownTable({
  title,
  unit,
  schemes,
  periods,
  getValue,
}: {
  title: string;
  unit: string;
  schemes: string[];
  periods: RuralRoadDevelopmentPeriod[];
  getValue: (period: RuralRoadDevelopmentPeriod, scheme: string) => string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[620px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Scheme</th>
              {periods.map((period) => (
                <th key={period.period} className="px-4 py-3">
                  {period.period}
                </th>
              ))}
              <th className="px-4 py-3">Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {schemes.map((scheme) => (
              <tr key={scheme}>
                <td className="px-4 py-3 font-semibold text-slate-950">
                  {scheme}
                </td>
                {periods.map((period) => (
                  <td key={`${period.period}-${scheme}`} className="px-4 py-3">
                    {getValue(period, scheme)}
                  </td>
                ))}
                <td className="px-4 py-3">{unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonBars({
  title,
  values,
}: {
  title: string;
  values: { label: string; value: number; display: string }[];
}) {
  const maxValue = Math.max(...values.map((item) => item.value));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {values.map((item, index) => {
          const width = maxValue > 0 ? `${(item.value / maxValue) * 100}%` : "0%";
          const color = index > 0 ? "bg-[#ff9933]" : "bg-teal-700";

          return (
            <div key={item.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="font-semibold text-slate-950">
                  {item.display}
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${color}`}
                  style={{ width }}
                  aria-label={`${item.label}: ${item.display}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function RuralRoadDevelopmentSection() {
  const { periods } = ruralRoadDevelopment;
  const roadChartValues = periods.map((period) => ({
    label: period.period,
    value: period.totalRoadLengthKm,
    display: formatKm(period.totalRoadLengthKm),
  }));
  const bridgeChartValues = periods.map((period) => ({
    label: period.period,
    value: period.totalBridges,
    display: formatNumber(period.totalBridges),
  }));

  return (
    <section id="rural-road-development-pmgsy" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Rural Development
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {ruralRoadDevelopment.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Completed PMGSY works are compared by road length and bridge count
            across the two government periods.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {periods.map((period) => (
            <PeriodCard key={period.period} period={period} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <ComparisonBars
            title="Road length comparison"
            values={roadChartValues}
          />
          <ComparisonBars
            title="Bridges comparison"
            values={bridgeChartValues}
          />
        </div>

        <div className="mt-8 grid gap-4">
          <RoadsTable periods={periods} />
          <BridgesTable periods={periods} />
        </div>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source: {ruralRoadDevelopment.source}
        </p>
      </div>
    </section>
  );
}
