import type { EmploymentSourceEvidence } from "@/data/employmentWorkforce";
import { employmentWorkforce } from "@/data/employmentWorkforce";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatPercent(value: number) {
  return `${formatNumber(value)}%`;
}

function formatCrore(value: number) {
  return `${formatNumber(value)} crore`;
}

function formatLakh(value: number) {
  return `${formatNumber(value)} lakh`;
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
        Important Employment Data Note
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {employmentWorkforce.methodologyNote}
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
  rows: {
    label: string;
    value: number;
    display: string;
    after2014?: boolean;
  }[];
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
            : row.after2014
              ? "bg-[#ff9933]"
              : "bg-teal-700";

          return (
            <div key={`${title}-${row.label}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{row.label}</span>
                <span className="font-semibold text-slate-950">{row.display}</span>
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

function IndicatorTable({
  title,
  rows,
}: {
  title: string;
  rows: { indicator: string; period: string; value: string }[];
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Indicator</th>
              <th className="px-4 py-3 font-semibold">Period</th>
              <th className="px-4 py-3 font-semibold">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {rows.map((row) => (
              <tr key={`${title}-${row.indicator}-${row.period}`}>
                <td className="px-4 py-3 font-semibold text-slate-950">
                  {row.indicator}
                </td>
                <td className="px-4 py-3">{row.period}</td>
                <td className="px-4 py-3">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function HistoricalTable() {
  const historical = employmentWorkforce.historical2004_2014;
  const rows = [
    ...historical.unemployedPeopleMillion.map((item) => ({
      indicator: "Unemployed people",
      period: item.year,
      value: `${formatNumber(item.value)} million`,
    })),
    ...historical.cdsUnemploymentRate.map((item) => ({
      indicator: "CDS unemployment rate",
      period: item.year,
      value: formatPercent(item.value),
    })),
    ...historical.jobsCreatedPsSsMillion.map((item) => ({
      indicator: "Jobs created PS+SS",
      period: item.period,
      value: `${formatNumber(item.value)} million`,
    })),
    ...historical.labourForceParticipation.map((item) => ({
      indicator: "Labour Force Participation Rate",
      period: item.year,
      value: formatPercent(item.value),
    })),
    {
      indicator: "Worker Population Ratio",
      period: "2011-12, All India",
      value: formatPercent(historical.workerPopulationRatio2011_12.allIndia),
    },
    {
      indicator: "Worker Population Ratio",
      period: "2011-12, Rural",
      value: formatPercent(historical.workerPopulationRatio2011_12.rural),
    },
    {
      indicator: "Worker Population Ratio",
      period: "2011-12, Urban",
      value: formatPercent(historical.workerPopulationRatio2011_12.urban),
    },
    {
      indicator: "Organised sector employment",
      period: "March 2011",
      value: formatLakh(historical.organisedSectorEmployment.march2011Lakh),
    },
    {
      indicator: "Organised sector employment",
      period: "March 2012",
      value: formatLakh(historical.organisedSectorEmployment.march2012Lakh),
    },
    {
      indicator: "Private sector employment",
      period: "2004",
      value: formatLakh(historical.organisedSectorEmployment.privateSector2004Lakh),
    },
    {
      indicator: "Private sector employment",
      period: "2012",
      value: formatLakh(historical.organisedSectorEmployment.privateSector2012Lakh),
    },
  ];

  return <IndicatorTable title="2004–2014 Employment Indicators" rows={rows} />;
}

function RecentTable() {
  const recent = employmentWorkforce.recent2014_2024;
  const rows = [
    ...recent.totalEmployment.map((item) => ({
      indicator: "Total employment",
      period: item.year,
      value: formatCrore(item.valueCrore),
    })),
    {
      indicator: "Net jobs added",
      period: "2017-18 to 2023-24",
      value: formatCrore(recent.netJobsAddedCrore),
    },
    ...recent.unemploymentRate.map((item) => ({
      indicator: "Unemployment rate",
      period: item.year,
      value: formatPercent(item.value),
    })),
    ...recent.youthUnemploymentRate.map((item) => ({
      indicator: "Youth unemployment rate",
      period: item.year,
      value: formatPercent(item.value),
    })),
    ...recent.lfpr.map((item) => ({
      indicator: "Labour Force Participation Rate",
      period: item.year,
      value: formatPercent(item.value),
    })),
    ...recent.wpr.map((item) => ({
      indicator: "Worker Population Ratio",
      period: item.year,
      value: formatPercent(item.value),
    })),
    ...recent.womenWorkforce.femaleLfpr.map((item) => ({
      indicator: "Female LFPR",
      period: item.year,
      value: formatPercent(item.value),
    })),
    ...recent.womenWorkforce.femaleWpr.map((item) => ({
      indicator: "Female WPR",
      period: item.year,
      value: formatPercent(item.value),
    })),
    ...recent.formalEmployment.epfoNetSubscribers.map((item) => ({
      indicator: "EPFO net subscribers",
      period: item.year,
      value: item.display,
    })),
    {
      indicator: "Cumulative EPFO net subscribers",
      period: "Since Sep 2017",
      value: formatCrore(recent.formalEmployment.cumulativeEpfoSubscribersCrore),
    },
    {
      indicator: "Female EPFO net subscribers",
      period: "2024-25",
      value: formatLakh(recent.formalEmployment.femaleEpfoSubscribers2024_25Lakh),
    },
    ...recent.wageGrowth.casualLabourDailyWage.map((item) => ({
      indicator: "Average daily wage for casual labourers",
      period: item.period,
      value: `₹${formatNumber(item.value)}`,
    })),
    ...recent.wageGrowth.regularSalariedMonthlyEarnings.map((item) => ({
      indicator: "Regular salaried monthly earnings",
      period: item.period,
      value: `₹${formatNumber(item.value)}`,
    })),
  ];

  return <IndicatorTable title="2014–2024/25 Employment Indicators" rows={rows} />;
}

function EmergingEmploymentCards() {
  const emerging = employmentWorkforce.recent2014_2024.emergingEmployment;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        Emerging Employment Indicators
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label="Gig workforce"
          value={`${formatCrore(emerging.gigWorkforce[0].valueCrore)} → ${formatCrore(
            emerging.gigWorkforce[1].valueCrore,
          )}`}
          note="2024-25 to 2029-30 projected"
        />
        <SummaryCard
          label="DPIIT-recognized startups"
          value={formatNumber(emerging.startups.dpiitRecognized)}
          note={`${formatNumber(emerging.startups.jobsCreated)}+ jobs reported`}
        />
        <SummaryCard
          label="Global Capability Centres"
          value={formatNumber(emerging.gccs.centres)}
          note={`${formatNumber(emerging.gccs.employment)}+ employment`}
        />
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
          The later-period figures are linked to public PIB, PLFS and
          administrative source references. Earlier-period indicators are kept
          separately because NSSO survey definitions differ from PLFS.
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
            <dl className="mt-4 text-sm">
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
            </dl>
            <div className="mt-5">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold !text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                Open public source
              </a>
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
  const historical = data.historical2004_2014;
  const recent = data.recent2014_2024;
  const epfo2018Crore =
    (recent.formalEmployment.epfoNetSubscribers[0].valueLakh ?? 0) / 100;
  const epfo2025Crore =
    recent.formalEmployment.epfoNetSubscribers[1].valueCrore ?? 0;

  return (
    <section id="employment-workforce" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Employment & Labour Market
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            A neutral view of employment growth, unemployment reduction,
            labour-force participation, women workforce participation, formal
            payroll expansion, wages and employment quality.
          </p>
        </div>

        <div className="mt-8">
          <MethodologyNote />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total employment"
            value={`${formatCrore(recent.totalEmployment[0].valueCrore)} → ${formatCrore(
              recent.totalEmployment[1].valueCrore,
            )}`}
            note="2017-18 to 2023-24"
          />
          <SummaryCard
            label="Jobs added"
            value={formatCrore(recent.netJobsAddedCrore)}
            note="Net employment addition between 2017-18 and 2023-24"
          />
          <SummaryCard
            label="Unemployment rate"
            value={`${formatPercent(recent.unemploymentRate[0].value)} → ${formatPercent(
              recent.unemploymentRate[1].value,
            )}`}
            note="PLFS headline unemployment rate"
          />
          <SummaryCard
            label="Youth unemployment"
            value={`${formatPercent(recent.youthUnemploymentRate[0].value)} → ${formatPercent(
              recent.youthUnemploymentRate[1].value,
            )}`}
            note="Youth unemployment rate"
          />
          <SummaryCard
            label="Female LFPR"
            value={`${formatPercent(recent.womenWorkforce.femaleLfpr[0].value)} → ${formatPercent(
              recent.womenWorkforce.femaleLfpr[1].value,
            )}`}
            note="Women labour-force participation"
          />
          <SummaryCard
            label="Female WPR"
            value={`${formatPercent(recent.womenWorkforce.femaleWpr[0].value)} → ${formatPercent(
              recent.womenWorkforce.femaleWpr[1].value,
            )}`}
            note="Women worker-population ratio"
          />
          <SummaryCard
            label="EPFO net subscribers"
            value={`${recent.formalEmployment.epfoNetSubscribers[0].display} → ${recent.formalEmployment.epfoNetSubscribers[1].display}`}
            note="Formal payroll additions"
          />
          <SummaryCard
            label="Casual labour share"
            value={`${formatPercent(recent.employmentQuality.casualLabour[0].value)} → ${formatPercent(
              recent.employmentQuality.casualLabour[1].value,
            )}`}
            note="Share of casual labour in employment"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <HistoricalTable />
          <RecentTable />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <BarChart
            title="Total Employment Growth"
            rows={recent.totalEmployment.map((item, index) => ({
              label: item.year,
              value: item.valueCrore,
              display: formatCrore(item.valueCrore),
              after2014: index > 0,
            }))}
          />
          <BarChart
            title="Unemployment Rate"
            negativeIndicator
            rows={recent.unemploymentRate.map((item) => ({
              label: item.year,
              value: item.value,
              display: formatPercent(item.value),
            }))}
          />
          <BarChart
            title="Youth Unemployment Rate"
            negativeIndicator
            rows={recent.youthUnemploymentRate.map((item) => ({
              label: item.year,
              value: item.value,
              display: formatPercent(item.value),
            }))}
          />
          <BarChart
            title="LFPR and WPR"
            rows={[
              ...recent.lfpr.map((item, index) => ({
                label: `LFPR ${item.year}`,
                value: item.value,
                display: formatPercent(item.value),
                after2014: index > 0,
              })),
              ...recent.wpr.map((item, index) => ({
                label: `WPR ${item.year}`,
                value: item.value,
                display: formatPercent(item.value),
                after2014: index > 0,
              })),
            ]}
          />
          <BarChart
            title="Female LFPR and WPR Growth"
            rows={[
              ...recent.womenWorkforce.femaleLfpr.map((item, index) => ({
                label: `Female LFPR ${item.year}`,
                value: item.value,
                display: formatPercent(item.value),
                after2014: index > 0,
              })),
              ...recent.womenWorkforce.femaleWpr.map((item, index) => ({
                label: `Female WPR ${item.year}`,
                value: item.value,
                display: formatPercent(item.value),
                after2014: index > 0,
              })),
            ]}
          />
          <BarChart
            title="EPFO Net Subscribers"
            rows={[
              {
                label: "2018-19",
                value: epfo2018Crore,
                display: recent.formalEmployment.epfoNetSubscribers[0].display,
              },
              {
                label: "2024-25",
                value: epfo2025Crore,
                display: recent.formalEmployment.epfoNetSubscribers[1].display,
                after2014: true,
              },
            ]}
          />
          <BarChart
            title="Wage Growth"
            rows={[
              ...recent.wageGrowth.casualLabourDailyWage.map((item, index) => ({
                label: `Casual daily wage ${item.period}`,
                value: item.value,
                display: `₹${formatNumber(item.value)}`,
                after2014: index > 0,
              })),
              ...recent.wageGrowth.regularSalariedMonthlyEarnings.map((item, index) => ({
                label: `Regular monthly earnings ${item.period}`,
                value: item.value,
                display: `₹${formatNumber(item.value)}`,
                after2014: index > 0,
              })),
            ]}
          />
          <BarChart
            title="2004–2014 CDS Unemployment Rate"
            negativeIndicator
            rows={historical.cdsUnemploymentRate.map((item) => ({
              label: item.year,
              value: item.value,
              display: formatPercent(item.value),
            }))}
          />
          <BarChart
            title="Employment Quality"
            rows={[
              ...recent.employmentQuality.selfEmployment.map((item, index) => ({
                label: `Self-employment ${item.year}`,
                value: item.value,
                display: formatPercent(item.value),
                after2014: index > 0,
              })),
              ...recent.employmentQuality.casualLabour.map((item) => ({
                label: `Casual labour ${item.year}`,
                value: item.value,
                display: formatPercent(item.value),
              })),
            ]}
          />
        </div>

        <div className="mt-8">
          <EmergingEmploymentCards />
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
