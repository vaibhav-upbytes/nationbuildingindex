import { metroRailDevelopment } from "@/data/metroRailDevelopment";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function BarChart({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: number; display: string }[];
}) {
  const maxValue = Math.max(...rows.map((row) => row.value));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((row, index) => {
          const width = maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";
          const color = index > 0 ? "bg-[#ff9933]" : "bg-teal-700";

          return (
            <div key={row.label}>
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

export function MetroRailDevelopmentSection() {
  const { periods } = metroRailDevelopment;
  const networkRows = periods.map((period) => ({
    label: period.period,
    value: period.operationalNetworkKm,
    display: `${formatNumber(period.operationalNetworkKm)} km`,
  }));
  const commissionedRows = periods.map((period) => ({
    label: period.period,
    value: period.averageCommissionedKmPerMonth,
    display: `${formatNumber(period.averageCommissionedKmPerMonth)} km/month`,
  }));
  const ridershipRows = periods.map((period) => ({
    label: period.period,
    value: period.averageDailyRidershipLakh,
    display:
      "ridershipLabel" in period && period.ridershipLabel
        ? period.ridershipLabel
        : `${formatNumber(period.averageDailyRidershipLakh)} lakh`,
  }));
  const cityRows = periods.map((period) => ({
    label: period.period,
    value: period.operationalCities,
    display: `${formatNumber(period.operationalCities)} cities`,
  }));

  return (
    <section id="metro-rail-development" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Metro Rail Construction
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {metroRailDevelopment.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Metro rail progress is compared using operational network length,
            commissioning pace, average daily ridership, and number of cities
            with operational metro rail.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {periods.map((period) => (
            <article
              key={period.period}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-teal-700">
                {period.period}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">
                {period.government}
              </h3>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md bg-slate-50 p-4">
                  <dt className="text-sm font-medium text-slate-600">
                    Operational metro network
                  </dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-950">
                    {formatNumber(period.operationalNetworkKm)} km
                  </dd>
                </div>
                <div className="rounded-md bg-slate-50 p-4">
                  <dt className="text-sm font-medium text-slate-600">
                    Lines commissioned per month
                  </dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-950">
                    {formatNumber(period.averageCommissionedKmPerMonth)} km
                  </dd>
                </div>
                <div className="rounded-md bg-slate-50 p-4">
                  <dt className="text-sm font-medium text-slate-600">
                    Average daily ridership
                  </dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-950">
                    {"ridershipLabel" in period && period.ridershipLabel
                      ? period.ridershipLabel
                      : `${formatNumber(period.averageDailyRidershipLakh)} lakh`}
                  </dd>
                </div>
                <div className="rounded-md bg-slate-50 p-4">
                  <dt className="text-sm font-medium text-slate-600">
                    Cities with operational metro
                  </dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-950">
                    {formatNumber(period.operationalCities)}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <BarChart title="Operational metro rail network" rows={networkRows} />
          <BarChart
            title="Average metro lines commissioned per month"
            rows={commissionedRows}
          />
          <BarChart title="Average daily ridership" rows={ridershipRows} />
          <BarChart title="Cities with operational metro rail" rows={cityRows} />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">
            Budget Context
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Budget is shown only as context. The project comparison remains
            focused on completed work and measurable outcomes.
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {periods.map((period) => (
              <div key={`${period.period}-budget`} className="rounded-md bg-white p-4">
                <dt className="text-sm font-medium text-slate-600">
                  {period.annualBudgetYear}
                </dt>
                <dd className="mt-2 text-xl font-bold text-slate-950">
                  Rs {formatNumber(period.annualBudgetRsCrore)} crore
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={metroRailDevelopment.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {metroRailDevelopment.source}
          </a>
        </p>
      </div>
    </section>
  );
}
