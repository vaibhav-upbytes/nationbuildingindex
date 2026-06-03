import { urbanHousingDevelopment } from "@/data/urbanDevelopment";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

function formatLakh(value: number) {
  return `${numberFormatter.format(value)} lakh`;
}

function metricValue(periodIndex: number, label: string) {
  return (
    urbanHousingDevelopment.periods[periodIndex].metrics.find(
      (metric) => metric.label === label,
    )?.valueLakh ?? 0
  );
}

function HousingPeriodCard({
  period,
}: {
  period: (typeof urbanHousingDevelopment.periods)[number];
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-teal-700">{period.period}</p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          {period.government}
        </h3>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Schemes: {period.schemes}
        </p>
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {period.metrics.map((metric) => (
          <div key={metric.label} className="rounded-md bg-slate-50 p-4">
            <dt className="text-sm font-medium text-slate-600">
              {metric.label}
            </dt>
            <dd className="mt-2 text-2xl font-bold text-slate-950">
              {formatLakh(metric.valueLakh)}
            </dd>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {metric.description}
            </p>
          </div>
        ))}
      </dl>
    </article>
  );
}

function HousingComparisonChart() {
  const rows = [
    {
      label: "Approved houses",
      values: [
        {
          period: "2004–2014",
          value: metricValue(0, "Houses approved"),
        },
        {
          period: "2015–2024",
          value: metricValue(1, "Houses approved"),
        },
      ],
    },
    {
      label: "Completed houses",
      values: [
        {
          period: "2004–2014",
          value: metricValue(0, "Houses completed"),
        },
        {
          period: "2015–2024",
          value: metricValue(1, "Houses completed"),
        },
      ],
    },
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        Housing comparison
      </h3>
      <div className="mt-5 space-y-6">
        {rows.map((row) => {
          const maxValue = Math.max(...row.values.map((item) => item.value));

          return (
            <div key={row.label}>
              <p className="text-sm font-semibold text-slate-950">
                {row.label}
              </p>
              <div className="mt-3 space-y-3">
                {row.values.map((item) => {
                  const width =
                    maxValue > 0 ? `${(item.value / maxValue) * 100}%` : "0%";

                  return (
                    <div key={`${row.label}-${item.period}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                        <span className="font-medium text-slate-700">
                          {item.period}
                        </span>
                        <span className="font-semibold text-slate-950">
                          {formatLakh(item.value)}
                        </span>
                      </div>
                      <div className="mt-2 h-3 rounded-full bg-slate-100">
                        <div
                          className="h-3 rounded-full bg-teal-700"
                          style={{ width }}
                          aria-label={`${row.label}, ${item.period}: ${formatLakh(item.value)}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function UrbanHousingDevelopmentSection() {
  return (
    <section id="urban-development-housing" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Urban Development
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {urbanHousingDevelopment.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Urban housing is compared by approved houses and completed houses
            across the earlier JnNURM/RRY period and the later PMAY-U period.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {urbanHousingDevelopment.periods.map((period) => (
            <HousingPeriodCard key={period.period} period={period} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <HousingComparisonChart />
          <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-950">
              Increase summary
            </h3>
            <div className="mt-4 grid gap-3">
              {urbanHousingDevelopment.comparisons.map((comparison) => (
                <article
                  key={comparison.label}
                  className="rounded-md bg-white p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="font-semibold text-slate-950">
                      {comparison.label}
                    </h4>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-800">
                      {comparison.multiplier}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {comparison.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={urbanHousingDevelopment.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {urbanHousingDevelopment.source}
          </a>
        </p>
      </div>
    </section>
  );
}
