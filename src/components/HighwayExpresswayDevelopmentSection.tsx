import {
  highwayExpresswayDevelopment,
  type CompletionProgramme,
  type HighwayGrowthMetric,
  type HighwaySourceEvidence,
} from "@/data/highwayExpresswayDevelopment";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
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

function ComparisonBarChart({ metric }: { metric: HighwayGrowthMetric }) {
  const maxValue = Math.max(...metric.data.map((row) => row.valueKm));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{metric.title}</h3>
      <p className="mt-1 text-sm text-slate-600">
        Increase: {formatNumber(metric.increaseKm)} km (
        {formatNumber(metric.growthPercent)}%)
      </p>
      <div className="mt-5 space-y-4">
        {metric.data.map((row, index) => {
          const width =
            maxValue > 0 ? `${(row.valueKm / maxValue) * 100}%` : "0%";
          const color = index > 0 ? "bg-[#ff9933]" : "bg-teal-700";

          return (
            <div key={`${metric.title}-${row.label}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{row.label}</span>
                <span className="font-semibold text-slate-950">
                  {formatNumber(row.valueKm)} km
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${color}`}
                  style={{ width }}
                  aria-label={`${row.label}: ${formatNumber(row.valueKm)} km`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ConstructionLineChart() {
  const rows = highwayExpresswayDevelopment.yearlyConstruction.data;
  const maxValue = Math.max(...rows.map((row) => row.constructedKm));
  const minValue = Math.min(...rows.map((row) => row.constructedKm));
  const points = rows
    .map((row, index) => {
      const x = rows.length > 1 ? (index / (rows.length - 1)) * 100 : 0;
      const y =
        maxValue > minValue
          ? 100 -
            ((row.constructedKm - minValue) / (maxValue - minValue)) * 82 -
            9
          : 50;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">
            {highwayExpresswayDevelopment.yearlyConstruction.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {highwayExpresswayDevelopment.yearlyConstruction.highlight}
          </p>
        </div>
        <p className="rounded-md bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800">
          36.5 km/day peak pace
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[680px]">
          <svg
            viewBox="0 0 100 100"
            role="img"
            aria-label="Line chart of yearly national highway construction"
            className="h-56 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <polyline
              points={points}
              fill="none"
              stroke="#ff9933"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
            {rows.map((row, index) => {
              const x = rows.length > 1 ? (index / (rows.length - 1)) * 100 : 0;
              const y =
                maxValue > minValue
                  ? 100 -
                    ((row.constructedKm - minValue) / (maxValue - minValue)) *
                      82 -
                    9
                  : 50;

              return (
                <circle
                  key={row.year}
                  cx={x}
                  cy={y}
                  r="1.6"
                  fill="#ff9933"
                  aria-label={`${row.year}: ${formatNumber(row.constructedKm)} km`}
                />
              );
            })}
          </svg>
          <div className="grid grid-cols-11 gap-2 text-center text-xs text-slate-500">
            {rows.map((row) => (
              <span key={`${row.year}-axis`}>{row.year.slice(2)}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="py-3 pr-4 font-semibold">Year</th>
              <th className="py-3 pr-4 font-semibold">Constructed</th>
              <th className="py-3 pr-4 font-semibold">Per day</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.year} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium text-slate-800">
                  {row.year}
                </td>
                <td className="py-3 pr-4 text-slate-700">
                  {formatNumber(row.constructedKm)} km
                </td>
                <td className="py-3 pr-4 text-slate-700">
                  {formatNumber(row.kmPerDay)} km/day
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProgressChart({
  title,
  completed,
  total,
  percent,
}: {
  title: string;
  completed: string;
  total: string;
  percent: number;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className="grid size-24 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#ff9933 ${percent * 3.6}deg, #e2e8f0 0deg)`,
          }}
          role="img"
          aria-label={`${title}: ${formatNumber(percent)}% complete`}
        >
          <div className="grid size-16 place-items-center rounded-full bg-white text-lg font-bold text-slate-950">
            {formatNumber(percent)}%
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-950">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{completed} completed</p>
          <p className="mt-1 text-sm text-slate-500">{total} total planned</p>
        </div>
      </div>
    </article>
  );
}

function VerificationEvidence({
  evidence,
}: {
  evidence: HighwaySourceEvidence[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Verification evidence
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          Public highway source reference
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Highway and expressway indicators are linked directly to the public
          PIB page. The locally stored PDF is provided as a secondary evidence
          copy for the same public source.
        </p>
      </div>

      <div className="mt-5 grid gap-4">
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

function ProgrammeProgress({ programme }: { programme: CompletionProgramme }) {
  return (
    <ProgressChart
      title={programme.title}
      completed={`${formatNumber(programme.completedKm)} km`}
      total={`${formatNumber(programme.plannedKm)} km`}
      percent={programme.completionPercent}
    />
  );
}

export function HighwayExpresswayDevelopmentSection() {
  const data = highwayExpresswayDevelopment;

  return (
    <section id="highway-expressway-development" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Highway & Expressway Development
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            A static, outcome-focused comparison of National Highway expansion,
            expressway development, construction pace, regional connectivity,
            and logistics infrastructure.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="NH network growth"
            value={`${formatNumber(data.nationalHighways.data[0].valueKm)} to ${formatNumber(
              data.nationalHighways.data[1].valueKm,
            )} km`}
            note={`Increase: ${formatNumber(data.nationalHighways.increaseKm)} km (${formatNumber(
              data.nationalHighways.growthPercent,
            )}%)`}
          />
          <SummaryCard
            label="Expressway growth"
            value={`${formatNumber(data.expressways.data[0].valueKm)} to ${formatNumber(
              data.expressways.data[1].valueKm,
            )} km`}
            note={`Increase: ${formatNumber(data.expressways.increaseKm)} km (${formatNumber(
              data.expressways.growthPercent,
            )}%)`}
          />
          <SummaryCard
            label="4-lane highway growth"
            value={`${formatNumber(data.fourLaneHighways.data[0].valueKm)} to ${formatNumber(
              data.fourLaneHighways.data[1].valueKm,
            )} km`}
            note={`Increase: ${formatNumber(data.fourLaneHighways.increaseKm)} km (${formatNumber(
              data.fourLaneHighways.growthPercent,
            )}%)`}
          />
          <SummaryCard
            label="Bharatmala completion"
            value={`${formatNumber(data.bharatmala.completionPercent)}%`}
            note={`${formatNumber(data.bharatmala.completedKm)} of ${formatNumber(
              data.bharatmala.approvedLengthKm,
            )} km completed`}
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <ComparisonBarChart metric={data.nationalHighways} />
          <ComparisonBarChart metric={data.expressways} />
          <ComparisonBarChart metric={data.fourLaneHighways} />
          <ConstructionLineChart />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ProgressChart
            title={data.bharatmala.title}
            completed={`${formatNumber(data.bharatmala.completedKm)} km`}
            total={`${formatNumber(data.bharatmala.approvedLengthKm)} km`}
            percent={data.bharatmala.completionPercent}
          />
          <ProgrammeProgress programme={data.sardpNe} />
          <ProgrammeProgress programme={data.lweRoadProgramme} />
          <ProgrammeProgress programme={data.externallyAidedProjects} />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Bharatmala Component-wise Completion
          </h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-3 pr-4 font-semibold">Component</th>
                  <th className="py-3 pr-4 font-semibold">Completed</th>
                </tr>
              </thead>
              <tbody>
                {data.bharatmala.components.map((component) => (
                  <tr
                    key={component.component}
                    className="border-b border-slate-100"
                  >
                    <td className="py-3 pr-4 font-medium text-slate-800">
                      {component.component}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">
                      {formatNumber(component.completedKm)} km
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <SummaryCard
            label={data.logisticsParks.title}
            value={`${formatNumber(data.logisticsParks.planned)} parks`}
            note={`Rs ${formatNumber(
              data.logisticsParks.investmentCrore,
            )} crore investment; ${formatNumber(
              data.logisticsParks.cargoHandlingCapacityMmt,
            )} MMT handling capacity`}
          />
          <SummaryCard
            label={data.waysideAmenities.title}
            value={`${formatNumber(data.waysideAmenities.awarded)} awarded`}
            note={`${formatNumber(data.waysideAmenities.operational)} operational by November 2025`}
          />
          <SummaryCard
            label="North-East connectivity"
            value={`${formatNumber(data.sardpNe.completedKm)} km`}
            note={`${formatNumber(data.sardpNe.completionPercent)}% SARDP-NE completion`}
          />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Infrastructure Timeline
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {data.timeline.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="border-l-2 border-teal-700 pl-4"
              >
                <p className="text-sm font-bold text-teal-700">{item.year}</p>
                <h4 className="mt-2 text-base font-semibold text-slate-950">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <VerificationEvidence evidence={data.verificationEvidence} />
        </div>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={data.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {data.source}
          </a>
        </p>
      </div>
    </section>
  );
}
