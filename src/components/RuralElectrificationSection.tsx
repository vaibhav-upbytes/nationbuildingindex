import { ruralElectrification } from "@/data/ruralElectrification";

const numberFormatter = new Intl.NumberFormat("en-IN");

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function RuralElectrificationSection() {
  const primaryAchievements = [
    ruralElectrification.achievements[1],
    ruralElectrification.achievements[0],
    ruralElectrification.achievements[3],
    {
      label: "States reporting 100% household electrification as of 31 March 2021",
      value: ruralElectrification.sevenStatesReported100PercentElectrification.length,
      displayValue: `${ruralElectrification.sevenStatesReported100PercentElectrification.length} states`,
    },
  ];
  const maxAchievementValue = Math.max(
    ...ruralElectrification.achievements.map((achievement) => achievement.value),
  );

  return (
    <section id="rural-electrification" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Rural Development
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {ruralElectrification.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            This section tracks village and household electricity access through
            DDUGJY and Saubhagya using official Ministry of Power outcome
            figures.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {ruralElectrification.schemes.map((scheme) => (
            <article
              key={scheme.shortName}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-teal-700">
                Launched: {scheme.launched}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">
                {scheme.shortName}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {scheme.name}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                {scheme.focus}
              </p>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700">
                {scheme.objectives.map((objective) => (
                  <li
                    key={objective}
                    className="rounded-md bg-slate-50 px-3 py-2"
                  >
                    {objective}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {primaryAchievements.map((achievement) => (
            <article
              key={achievement.label}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-3xl font-bold text-slate-950">
                {achievement.displayValue}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {achievement.label}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Household electrification outcomes
          </h3>
          <div className="mt-5 space-y-4">
            {ruralElectrification.achievements.map((achievement) => {
              const width =
                maxAchievementValue > 0
                  ? `${(achievement.value / maxAchievementValue) * 100}%`
                  : "0%";

              return (
                <div key={achievement.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium text-slate-700">
                      {achievement.label}
                    </span>
                    <span className="font-semibold text-slate-950">
                      {achievement.displayValue}
                    </span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-[#ff9933]"
                      style={{ width }}
                      aria-label={`${achievement.label}: ${formatNumber(
                        achievement.value,
                      )}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-950">
              Seven States Reporting 100% Household Electrification
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {ruralElectrification.sevenStatesReported100PercentElectrification.map(
                (state) => (
                  <span
                    key={state}
                    className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    {state}
                  </span>
                ),
              )}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">Timeline</h3>
            <ol className="mt-5 grid gap-3">
              {ruralElectrification.timeline.map((item) => (
                <li
                  key={`${item.date}-${item.event}`}
                  className="rounded-md bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-teal-700">
                    {item.date}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.event}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">
              Before 2014
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {ruralElectrification.comparisonSummary.before2014}
            </p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">After 2014</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {ruralElectrification.comparisonSummary.after2014}
            </p>
          </article>
        </section>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={ruralElectrification.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {ruralElectrification.source}
          </a>
        </p>
      </div>
    </section>
  );
}
