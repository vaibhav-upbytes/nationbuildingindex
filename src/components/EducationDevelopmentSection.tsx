import {
  educationDevelopment,
  type EducationComparisonMetric,
} from "@/data/educationDevelopment";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatCurrencyCrore(value: number) {
  return `Rs ${formatNumber(value)} crore`;
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

function ComparisonBarChart({
  metric,
  title,
}: {
  metric: EducationComparisonMetric;
  title?: string;
}) {
  const maxValue = Math.max(metric.baselineValue, metric.latestValue);
  const rows = [
    {
      label: metric.baselineYear,
      value: metric.baselineValue,
    },
    {
      label: metric.latestYear,
      value: metric.latestValue,
    },
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        {title ?? metric.metric}
      </h3>
      <div className="mt-5 space-y-4">
        {rows.map((row, index) => {
          const width = maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";
          const color = index > 0 ? "bg-[#ff9933]" : "bg-teal-700";

          return (
            <div key={`${metric.metric}-${row.label}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{row.label}</span>
                <span className="font-semibold text-slate-950">
                  {formatNumber(row.value)}
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${color}`}
                  style={{ width }}
                  aria-label={`${row.label}: ${formatNumber(row.value)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function InstituteGroupChart() {
  const metrics = educationDevelopment.higherEducation.data.filter((item) =>
    ["IITs", "IIMs", "AIIMS"].includes(item.metric),
  );
  const maxValue = Math.max(...metrics.map((item) => item.latestValue));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        IITs, IIMs, and AIIMS
      </h3>
      <div className="mt-5 space-y-5">
        {metrics.map((metric) => (
          <div key={metric.metric}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-800">{metric.metric}</span>
              <span className="text-slate-600">
                {formatNumber(metric.baselineValue)} to{" "}
                {formatNumber(metric.latestValue)}
              </span>
            </div>
            <div className="grid gap-2">
              {[metric.baselineValue, metric.latestValue].map((value, index) => {
                const label = index === 0 ? metric.baselineYear : metric.latestYear;
                const width = maxValue > 0 ? `${(value / maxValue) * 100}%` : "0%";
                const color = index > 0 ? "bg-[#ff9933]" : "bg-teal-700";

                return (
                  <div key={`${metric.metric}-${label}`}>
                    <div className="flex justify-between gap-2 text-xs text-slate-500">
                      <span>{label}</span>
                      <span>{formatNumber(value)}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-2 rounded-full ${color}`}
                        style={{ width }}
                        aria-label={`${metric.metric} ${label}: ${formatNumber(
                          value,
                        )}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InnovationRankChart() {
  const { data, note } = educationDevelopment.innovationRanking;
  const maxRank = Math.max(...data.map((item) => item.rank));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        {educationDevelopment.innovationRanking.title}
      </h3>
      <p className="mt-1 text-sm text-slate-600">{note}</p>
      <div className="mt-5 space-y-4">
        {data.map((item, index) => {
          const scoreWidth = `${((maxRank - item.rank + 1) / maxRank) * 100}%`;
          const color = index > 0 ? "bg-[#ff9933]" : "bg-teal-700";

          return (
            <div key={item.year}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{item.year}</span>
                <span className="font-semibold text-slate-950">
                  Rank {formatNumber(item.rank)}
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${color}`}
                  style={{ width: scoreWidth }}
                  aria-label={`${item.year}: rank ${formatNumber(item.rank)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function EducationDevelopmentSection() {
  const data = educationDevelopment;
  const hei = data.higherEducation.data.find(
    (item) => item.metric === "Higher Education Institutions",
  );
  const universities = data.higherEducation.data.find(
    (item) => item.metric === "Universities",
  );
  const colleges = data.higherEducation.data.find(
    (item) => item.metric === "Colleges",
  );
  const summaryMetrics = [
    ...data.higherEducation.data,
    {
      metric: "EMRS schools",
      baselineYear: data.tribalEducation.baselineYear,
      baselineValue: data.tribalEducation.baselineValue,
      latestYear: data.tribalEducation.latestYear,
      latestValue: data.tribalEducation.latestValue,
    },
  ];

  return (
    <section id="education-development" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Education Development
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            A neutral comparison of education infrastructure and institutional
            outcomes using countable metrics from official source material.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryMetrics.map((metric) => (
            <SummaryCard
              key={metric.metric}
              label={metric.metric}
              value={`${formatNumber(metric.baselineValue)} to ${formatNumber(
                metric.latestValue,
              )}`}
              note={`${metric.baselineYear} compared with ${metric.latestYear}`}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {hei ? <ComparisonBarChart metric={hei} /> : null}
          {universities ? <ComparisonBarChart metric={universities} /> : null}
          {colleges ? <ComparisonBarChart metric={colleges} /> : null}
          <InstituteGroupChart />
          <ComparisonBarChart
            title={data.tribalEducation.title}
            metric={{
              metric: data.tribalEducation.metric,
              baselineYear: data.tribalEducation.baselineYear,
              baselineValue: data.tribalEducation.baselineValue,
              latestYear: data.tribalEducation.latestYear,
              latestValue: data.tribalEducation.latestValue,
            }}
          />
          <ComparisonBarChart
            title={data.globalPresence.qsRankings.metric}
            metric={data.globalPresence.qsRankings}
          />
          <InnovationRankChart />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <SummaryCard
            label={data.schoolModernization.title}
            value="14,500+"
            note="PM SHRI schools planned for upgradation"
          />
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              Overseas IIT Campuses
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {formatNumber(
                data.globalPresence.overseasIITCampuses.baselineValue,
              )}{" "}
              to{" "}
              {formatNumber(data.globalPresence.overseasIITCampuses.latestValue)}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {data.globalPresence.overseasIITCampuses.campuses.map((campus) => (
                <li key={campus}>{campus}</li>
              ))}
            </ul>
          </article>
          <SummaryCard
            label="QS-ranked Indian universities"
            value={`${formatNumber(
              data.globalPresence.qsRankings.baselineValue,
            )} to ${formatNumber(data.globalPresence.qsRankings.latestValue)}`}
            note={`${data.globalPresence.qsRankings.baselineYear} compared with ${data.globalPresence.qsRankings.latestYear}`}
          />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">
            {data.researchInfrastructure.title}
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="HEFA established"
              value={String(data.researchInfrastructure.hefaEstablished)}
              note="Higher Education Funding Agency"
            />
            <SummaryCard
              label="Loans sanctioned"
              value={formatCurrencyCrore(
                data.researchInfrastructure.loansSanctionedCrore,
              )}
              note={`${formatNumber(
                data.researchInfrastructure.institutionsCovered,
              )} institutions covered`}
            />
            <SummaryCard
              label="Amount disbursed"
              value={formatCurrencyCrore(
                data.researchInfrastructure.loansDisbursedCrore,
              )}
              note="HEFA disbursement"
            />
            <SummaryCard
              label="Institutions of Eminence"
              value={formatNumber(
                data.researchInfrastructure.institutionsOfEminence.total,
              )}
              note={`${formatNumber(
                data.researchInfrastructure.institutionsOfEminence.publicFunded,
              )} public funded, ${formatNumber(
                data.researchInfrastructure.institutionsOfEminence.private,
              )} private`}
            />
          </div>
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
