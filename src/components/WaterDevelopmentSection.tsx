import { waterDevelopment } from "@/data/waterDevelopment";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function WaterDevelopmentSection() {
  const { amrut, jalJeevanMission } = waterDevelopment;
  const chartRows = [
    {
      label: `${jalJeevanMission.baseline.period} coverage`,
      value: jalJeevanMission.baseline.householdsCrore,
      display: `${formatNumber(jalJeevanMission.baseline.householdsCrore)} crore households`,
    },
    {
      label: `${jalJeevanMission.progressAsOf} coverage`,
      value: jalJeevanMission.totalCoverageCrore,
      display: `${formatNumber(jalJeevanMission.totalCoverageCrore)} crore households`,
    },
  ];
  const maxValue = Math.max(...chartRows.map((row) => row.value));

  return (
    <section id="water-development" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Drinking Water to Households
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {waterDevelopment.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            This section tracks household water access and urban service
            improvement programs using source-backed outcome metrics where
            available.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-teal-700">
              Launched in {amrut.launched}
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-950">
              {amrut.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {amrut.fullName}
            </p>
            <p className="mt-5 text-sm leading-6 text-slate-700">
              {amrut.description}
            </p>
            <p className="mt-5 rounded-md bg-amber-50 p-3 text-sm font-medium text-amber-800">
              {amrut.status}
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-teal-700">
              Launched on {jalJeevanMission.launched}
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-950">
              {jalJeevanMission.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {jalJeevanMission.goal}
            </p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-slate-50 p-4">
                <dt className="text-sm font-medium text-slate-600">
                  Baseline coverage
                </dt>
                <dd className="mt-2 text-2xl font-bold text-slate-950">
                  {formatNumber(jalJeevanMission.baseline.householdsCrore)} crore
                </dd>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {formatNumber(jalJeevanMission.baseline.coveragePercent)}% of
                  rural households
                </p>
              </div>
              <div className="rounded-md bg-slate-50 p-4">
                <dt className="text-sm font-medium text-slate-600">
                  Additional households connected
                </dt>
                <dd className="mt-2 text-2xl font-bold text-slate-950">
                  {formatNumber(jalJeevanMission.additionalHouseholdsCrore)} crore
                </dd>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  As of {jalJeevanMission.progressAsOf}
                </p>
              </div>
              <div className="rounded-md bg-slate-50 p-4 sm:col-span-2">
                <dt className="text-sm font-medium text-slate-600">
                  Total rural household coverage
                </dt>
                <dd className="mt-2 text-2xl font-bold text-slate-950">
                  Over {formatNumber(jalJeevanMission.totalCoverageCrore)} crore
                </dd>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {formatNumber(jalJeevanMission.totalCoveragePercent)}% of rural
                  households
                </p>
              </div>
            </dl>
          </article>
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Jal Jeevan Mission coverage comparison
          </h3>
          <div className="mt-5 space-y-4">
            {chartRows.map((row, index) => {
              const width =
                maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";
              const color = index > 0 ? "bg-[#ff9933]" : "bg-teal-700";

              return (
                <div key={row.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium text-slate-700">
                      {row.label}
                    </span>
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

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={waterDevelopment.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {waterDevelopment.source}
          </a>
        </p>
      </div>
    </section>
  );
}
