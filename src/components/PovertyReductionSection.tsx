import type {
  PovertyMetric,
  PovertySourceEvidence,
} from "@/data/povertyReduction";
import { povertyReduction } from "@/data/povertyReduction";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
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

function MethodologyNote() {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <h3 className="text-lg font-semibold text-slate-950">
        Important Methodology Note
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Poverty measurement changed across time. The 2004–2014 figures use
        national poverty estimates under the Planning Commission / Tendulkar
        methodology. The 2014–2024 figures use World Bank international poverty
        benchmarks and updated household consumption methodology. Because of
        this, the numbers should be compared as broad poverty-reduction trends
        rather than identical statistical measures.
      </p>
    </section>
  );
}

function RateBarChart({
  title,
  rows,
}: {
  title: string;
  rows: {
    label: string;
    value: number;
    display?: string;
    after2014?: boolean;
  }[];
}) {
  const maxValue = Math.max(...rows.map((row) => row.value), 1);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((row) => {
          const width = `${(row.value / maxValue) * 100}%`;
          const color = row.after2014 ? "bg-[#ff9933]" : "bg-teal-700";

          return (
            <div key={`${title}-${row.label}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{row.label}</span>
                <span className="font-semibold text-slate-950">
                  {row.display ?? formatPercent(row.value)}
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${color}`}
                  style={{ width }}
                  aria-label={`${row.label}: ${row.display ?? formatPercent(row.value)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MetricRateChart({
  title,
  metric,
}: {
  title: string;
  metric: PovertyMetric;
}) {
  return (
    <RateBarChart
      title={title}
      rows={[
        { label: metric.startYear, value: metric.startRate },
        { label: metric.endYear, value: metric.endRate, after2014: true },
      ]}
    />
  );
}

function PovertyTable() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-950">
          Poverty Reduction by Period
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[980px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {[
                "Period",
                "Poverty measure",
                "Start year",
                "Start rate",
                "End year",
                "End rate",
                "Reduction",
                "Relative improvement",
                "People lifted",
              ].map((heading) => (
                <th key={heading} className="px-4 py-3 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {povertyReduction.periodComparison.map((row) => (
              <tr key={row.period}>
                <td className="px-4 py-3 font-semibold text-slate-950">
                  {row.period}
                </td>
                <td className="max-w-xs px-4 py-3 leading-6">{row.measure}</td>
                <td className="px-4 py-3">{row.startYear}</td>
                <td className="px-4 py-3">{formatPercent(row.startRate)}</td>
                <td className="px-4 py-3">{row.endYear}</td>
                <td className="px-4 py-3">{formatPercent(row.endRate)}</td>
                <td className="px-4 py-3">
                  {formatNumber(row.reductionPercentagePoints)} percentage
                  points
                </td>
                <td className="px-4 py-3">
                  {formatPercent(row.relativeImprovementPercent)} reduction
                </td>
                <td className="px-4 py-3">{row.peopleLiftedLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function VerificationEvidence({
  evidence,
}: {
  evidence: PovertySourceEvidence[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Verification evidence
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          Public poverty source references
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Poverty indicators are linked directly to public PIB pages. The
          locally stored PDF is provided as a secondary evidence copy for these
          public source references.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {evidence.map((item) => (
          <article
            key={`${item.sourceType}-${item.period}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.sourceType} source
                </p>
                <h4 className="mt-2 text-base font-semibold text-slate-950">
                  {item.label}
                </h4>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Public source
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-teal-700">
              {item.period}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Source URL</dt>
                <dd className="mt-1 break-all font-medium text-slate-950">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 underline underline-offset-2 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                  >
                    {item.sourceUrl}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold !text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                Open public source
              </a>
              {item.pdfPath ? (
                <a
                  href={item.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                >
                  View PDF
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SourcesSection() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">Sources</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {povertyReduction.sources.map((source) => (
          <li key={source.label}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PovertyReductionSection() {
  const data = povertyReduction;
  const metrics = data.detailedMetrics;
  const peopleLiftedRows = [
    {
      label: "2004–2014 national poverty",
      value: data.periodComparison[0].peopleLiftedMillion,
      display: data.periodComparison[0].peopleLiftedLabel,
    },
    {
      label: "Extreme poverty",
      value: metrics.extremePoverty.peopleLiftedMillion ?? 0,
      display: `${formatNumber(metrics.extremePoverty.peopleLiftedMillion ?? 0)} million`,
      after2014: true,
    },
    {
      label: "Lower-middle-income poverty",
      value: metrics.lowerMiddleIncomePoverty.peopleLiftedMillion,
      display: `${formatNumber(metrics.lowerMiddleIncomePoverty.peopleLiftedMillion)} million`,
      after2014: true,
    },
  ];

  return (
    <section id="poverty-reduction" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Poverty & Living Standards
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            A neutral comparison of long-term poverty reduction, people lifted
            out of poverty, rural and urban poverty, multidimensional poverty,
            and consumption inequality indicators.
          </p>
        </div>

        <div className="mt-8">
          <MethodologyNote />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Extreme poverty"
            value={`${formatPercent(metrics.extremePoverty.startRate)} to ${formatPercent(
              metrics.extremePoverty.endRate,
            )}`}
            note="World Bank $2.15/day benchmark"
          />
          <SummaryCard
            label="People lifted from extreme poverty"
            value={`${formatNumber(metrics.extremePoverty.peopleLiftedMillion ?? 0)} million`}
            note="2011-12 to 2022-23"
          />
          <SummaryCard
            label="Lower-middle-income poverty"
            value={`${formatPercent(metrics.lowerMiddleIncomePoverty.startRate)} to ${formatPercent(
              metrics.lowerMiddleIncomePoverty.endRate,
            )}`}
            note="World Bank $3.65/day benchmark"
          />
          <SummaryCard
            label="People lifted from lower-middle-income poverty"
            value={`${formatNumber(metrics.lowerMiddleIncomePoverty.peopleLiftedMillion)} million`}
            note="2011-12 to 2022-23"
          />
          <SummaryCard
            label="Rural extreme poverty"
            value={`${formatPercent(metrics.ruralExtremePoverty.startRate)} to ${formatPercent(
              metrics.ruralExtremePoverty.endRate,
            )}`}
            note={`${formatPercent(metrics.ruralExtremePoverty.relativeImprovementPercent)} relative improvement`}
          />
          <SummaryCard
            label="Urban extreme poverty"
            value={`${formatPercent(metrics.urbanExtremePoverty.startRate)} to ${formatPercent(
              metrics.urbanExtremePoverty.endRate,
            )}`}
            note={`${formatPercent(metrics.urbanExtremePoverty.relativeImprovementPercent)} relative improvement`}
          />
          <SummaryCard
            label="Multidimensional poverty"
            value={`${formatPercent(metrics.multidimensionalPoverty.startRate)} to ${formatPercent(
              metrics.multidimensionalPoverty.latestRate,
            )}`}
            note={`${metrics.multidimensionalPoverty.startYear} to ${metrics.multidimensionalPoverty.latestYear}`}
          />
          <SummaryCard
            label="Gini Index"
            value={`${formatNumber(metrics.inequality.startValue)} to ${formatNumber(
              metrics.inequality.endValue,
            )}`}
            note={`${formatNumber(metrics.inequality.improvementPoints)} point improvement`}
          />
        </div>

        <div className="mt-8">
          <PovertyTable />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <RateBarChart
            title="Period Poverty Reduction"
            rows={data.periodComparison.map((item, index) => ({
              label: item.period,
              value: item.reductionPercentagePoints,
              display: `${formatNumber(item.reductionPercentagePoints)} pp (${formatPercent(
                item.relativeImprovementPercent,
              )})`,
              after2014: index > 0,
            }))}
          />
          <MetricRateChart
            title="Extreme Poverty"
            metric={metrics.extremePoverty}
          />
          <RateBarChart
            title="Rural vs Urban Extreme Poverty"
            rows={[
              {
                label: `Rural ${metrics.ruralExtremePoverty.startYear}`,
                value: metrics.ruralExtremePoverty.startRate,
              },
              {
                label: `Rural ${metrics.ruralExtremePoverty.endYear}`,
                value: metrics.ruralExtremePoverty.endRate,
                after2014: true,
              },
              {
                label: `Urban ${metrics.urbanExtremePoverty.startYear}`,
                value: metrics.urbanExtremePoverty.startRate,
              },
              {
                label: `Urban ${metrics.urbanExtremePoverty.endYear}`,
                value: metrics.urbanExtremePoverty.endRate,
                after2014: true,
              },
            ]}
          />
          <MetricRateChart
            title="Lower-Middle-Income Poverty"
            metric={metrics.lowerMiddleIncomePoverty}
          />
          <RateBarChart
            title="Multidimensional Poverty"
            rows={[
              {
                label: metrics.multidimensionalPoverty.startYear,
                value: metrics.multidimensionalPoverty.startRate,
              },
              {
                label: metrics.multidimensionalPoverty.midYear,
                value: metrics.multidimensionalPoverty.midRate,
                after2014: true,
              },
              {
                label: metrics.multidimensionalPoverty.latestYear,
                value: metrics.multidimensionalPoverty.latestRate,
                after2014: true,
              },
            ]}
          />
          <RateBarChart title="People Lifted" rows={peopleLiftedRows} />
        </div>

        <div className="mt-8">
          <VerificationEvidence evidence={data.verificationEvidence} />
        </div>

        <div className="mt-8">
          <SourcesSection />
        </div>
      </div>
    </section>
  );
}
