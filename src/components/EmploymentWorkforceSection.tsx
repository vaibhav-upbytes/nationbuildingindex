import type {
  EmploymentComparisonRow,
  EmploymentSourceEvidence,
} from "@/data/employmentWorkforce";
import { employmentWorkforce } from "@/data/employmentWorkforce";

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
        How to read this data
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {employmentWorkforce.methodologyNote}
      </p>
    </section>
  );
}

function LimitationCallout() {
  return (
    <section className="rounded-lg border border-slate-300 bg-slate-100 p-5">
      <h3 className="text-lg font-semibold text-slate-950">
        Private-sector jobs limitation
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {employmentWorkforce.privateSectorLimitation}
      </p>
    </section>
  );
}

function BarChart({
  title,
  rows,
  negativeIndicator = false,
}: {
  title: string;
  rows: { label: string; value: number; display: string; later?: boolean }[];
  negativeIndicator?: boolean;
}) {
  const maxValue = Math.max(...rows.map((row) => row.value), 1);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((row) => {
          const width = `${Math.max(8, (row.value / maxValue) * 100)}%`;
          const color = negativeIndicator
            ? "bg-red-600"
            : row.later
              ? "bg-[#ff9933]"
              : "bg-teal-700";

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

function ComparisonTable({ rows }: { rows: EmploymentComparisonRow[] }) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-950">
          Employment Indicators by Data Type
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1120px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {[
                "Indicator",
                "2004–2014 / Earlier Period",
                "2014–2024 / Later Period",
                "Data Type",
                "Source",
                "Notes",
              ].map((heading) => (
                <th key={heading} className="px-4 py-3 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {rows.map((row) => (
              <tr key={row.indicator}>
                <td className="px-4 py-3 font-semibold text-slate-950">
                  {row.indicator}
                </td>
                <td className="px-4 py-3 leading-6">{row.earlierPeriod}</td>
                <td className="px-4 py-3 leading-6">{row.laterPeriod}</td>
                <td className="px-4 py-3 leading-6">{row.dataType}</td>
                <td className="px-4 py-3 leading-6">
                  <a
                    href={row.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-teal-700 underline-offset-4 hover:text-teal-900 hover:underline"
                  >
                    {row.source}
                  </a>
                </td>
                <td className="max-w-sm px-4 py-3 leading-6">{row.notes}</td>
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
  evidence: EmploymentSourceEvidence[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Verification evidence
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          Employment source references
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Each employment number is shown by indicator type because the source
          systems measure different labour-market concepts.
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
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold !text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Open source
            </a>
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
        {employmentWorkforce.sources.map((source) => (
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

export function EmploymentWorkforceSection() {
  const data = employmentWorkforce;
  const metrics = data.keyMetrics;

  return (
    <section id="employment-workforce" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Employment & Labour Market
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            Tracking India&apos;s workforce expansion, formal payroll growth,
            recruitment, and unemployment trends using public datasets.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total Employment Added"
            value={`${metrics.totalEmploymentAdded.earlier.display} → ${metrics.totalEmploymentAdded.later.display}`}
            note="RBI KLEMS / PIB / SBI Ecowrap broad total-employment estimate"
          />
          <SummaryCard
            label="Formal Payroll Expansion"
            value={metrics.formalPayroll.later.display}
            note="EPFO net subscribers, September 2017–March 2024"
          />
          <SummaryCard
            label="Central Government Recruitment"
            value={`${metrics.centralGovernmentRecruitment.earlier.display} → ${metrics.centralGovernmentRecruitment.later.display}`}
            note="Direct central government appointments only"
          />
          <SummaryCard
            label="Unemployment Rate"
            value={`${metrics.unemploymentRate.earlier.display} → ${metrics.unemploymentRate.later.display}`}
            note="PLFS trend from 2017–18 to 2023–24"
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <BarChart
            title="Total Employment Added"
            rows={[
              {
                label: "Period 2004–2014",
                value: metrics.totalEmploymentAdded.earlier.valueCrore,
                display: metrics.totalEmploymentAdded.earlier.display,
              },
              {
                label: "Period 2014–2024",
                value: metrics.totalEmploymentAdded.later.valueCrore,
                display: metrics.totalEmploymentAdded.later.display,
                later: true,
              },
            ]}
          />
          <BarChart
            title="Central Government Recruitment"
            rows={[
              {
                label: "Period 2004–2013",
                value: metrics.centralGovernmentRecruitment.earlier.valueLakh,
                display: metrics.centralGovernmentRecruitment.earlier.display,
              },
              {
                label: "Period 2014–2023",
                value: metrics.centralGovernmentRecruitment.later.valueLakh,
                display: metrics.centralGovernmentRecruitment.later.display,
                later: true,
              },
            ]}
          />
          <BarChart
            title="Unemployment Rate Trend"
            negativeIndicator
            rows={[
              {
                label: "2017–18",
                value: metrics.unemploymentRate.earlier.valuePercent,
                display: metrics.unemploymentRate.earlier.display,
              },
              {
                label: "2023–24",
                value: metrics.unemploymentRate.later.valuePercent,
                display: metrics.unemploymentRate.later.display,
                later: true,
              },
            ]}
          />
          <BarChart
            title="Formal Payroll Proxy"
            rows={[
              {
                label: "2004–2014",
                value: 0,
                display: "Not comparable",
              },
              {
                label: "Sep 2017–Mar 2024",
                value: metrics.formalPayroll.later.valueCrore,
                display: metrics.formalPayroll.later.display,
                later: true,
              },
            ]}
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <MethodologyNote />
          <LimitationCallout />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <SummaryCard
            label="Total employment note"
            value="Broad economy-wide estimate"
            note={data.totalEmploymentNote}
          />
          <SummaryCard
            label="EPFO note"
            value="Formal payroll proxy"
            note={data.epfoNote}
          />
          <SummaryCard
            label="Recruitment note"
            value="Central appointments only"
            note={data.centralRecruitmentNote}
          />
        </div>

        <div className="mt-8">
          <ComparisonTable rows={data.comparisonRows} />
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
