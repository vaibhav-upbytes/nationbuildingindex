import { railwayDevelopment } from "@/data/railwayDevelopment";

const numberFormatter = new Intl.NumberFormat("en-IN");

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
        {rows.map((row) => {
          const width = maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";

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
                  className="h-3 rounded-full bg-teal-700"
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

function ElectrificationCard() {
  const { electrification } = railwayDevelopment;
  const latestCore = electrification.post2014CoreRecord;
  const periodRows = [
    {
      label: "MMS government period",
      period: "2005–2014",
      value: latestCore.previousPeriodRouteKm,
      display: `${formatNumber(latestCore.previousPeriodRouteKm)} RKM`,
      note: "Route km electrified during 2005–2014 as reported by CORE.",
    },
    {
      label: "Modi government period",
      period: "2014–March 2024",
      value: latestCore.electrifiedRouteKmSince2014,
      display: `${formatNumber(latestCore.electrifiedRouteKmSince2014)} RKM`,
      note: "Route km electrified since 2014 as reported by CORE.",
    },
  ];
  const maxValue = Math.max(...periodRows.map((row) => row.value));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        {electrification.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        CORE period-wise route electrification data is shown first because it
        directly compares work completed before 2014 and after 2014.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {periodRows.map((row) => (
          <article key={row.label} className="rounded-md bg-slate-50 p-5">
            <p className="text-sm font-semibold text-teal-700">{row.period}</p>
            <h4 className="mt-2 text-lg font-bold text-slate-950">
              {row.label}
            </h4>
            <p className="mt-3 text-3xl font-bold text-slate-950">
              {row.display}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{row.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-md border border-slate-200 bg-white p-4">
        <h4 className="text-sm font-semibold text-slate-950">
          Electrification work comparison
        </h4>
        <div className="mt-4 space-y-4">
          {periodRows.map((row) => {
            const width =
              maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";

            return (
              <div key={`${row.label}-bar`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium text-slate-700">
                    {row.period}
                  </span>
                  <span className="font-semibold text-slate-950">
                    {row.display}
                  </span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-teal-700"
                    style={{ width }}
                    aria-label={`${row.label}: ${row.display}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md bg-teal-50 p-4">
          <p className="text-sm font-medium text-slate-600">
            Total electrified till March 2024
          </p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {formatNumber(latestCore.electrifiedRouteKmTillMarch2024)} RKM
          </p>
        </div>
        {electrification.data.map((item) => (
          <div key={item.year} className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-600">
              Cumulative running tracks in {item.year}
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {formatNumber(item.electrifiedRunningTrackKm)} km
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonCards() {
  type MetricRow = {
    label: string;
    value: number;
    display: string;
    government?: string;
  };

  type MetricCard = {
    title: string;
    rows: MetricRow[];
  };

  const metrics: MetricCard[] = [
    {
      title: railwayDevelopment.lhbCoaches.title,
      rows: railwayDevelopment.lhbCoaches.data.map((item) => ({
        label: item.period,
        value: item.coaches,
        display: `${formatNumber(item.coaches)} coaches`,
        government: item.government,
      })),
    },
    {
      title: railwayDevelopment.bioToilets.title,
      rows: railwayDevelopment.bioToilets.data.map((item) => ({
        label: item.period,
        value: item.coaches,
        display: `${formatNumber(item.coaches)} coaches`,
        government: item.government,
      })),
    },
    {
      title: railwayDevelopment.trackLaying.title,
      rows: railwayDevelopment.trackLaying.data.map((item) => ({
        label: item.period,
        value: item.trackWorkRkm,
        display: `${formatNumber(item.trackWorkRkm)} RKM`,
        government: item.government,
      })),
    },
    {
      title: railwayDevelopment.cctvStations.title,
      rows: railwayDevelopment.cctvStations.data.map((item) => ({
        label: item.period,
        value: item.stations,
        display: `${formatNumber(item.stations)} stations`,
      })),
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {metrics.map((metric) => (
        <article
          key={metric.title}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-950">
            {metric.title}
          </h3>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {metric.rows.map((row) => (
              <div key={row.label} className="rounded-md bg-slate-50 p-4">
                <dt className="text-sm font-medium text-slate-600">
                  {row.label}
                </dt>
                <dd className="mt-2 text-2xl font-bold text-slate-950">
                  {row.display}
                </dd>
                {row.government ? (
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {row.government}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

function NorthEastTimeline() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        {railwayDevelopment.northEastConnectivity.title}
      </h3>
      <ol className="mt-5 grid gap-4 md:grid-cols-2">
        {railwayDevelopment.northEastConnectivity.states.map((item) => (
          <li
            key={`${item.state}-${item.date}`}
            className="rounded-md border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-sm font-semibold text-teal-700">{item.date}</p>
            <h4 className="mt-2 text-lg font-bold text-slate-950">
              {item.state}
            </h4>
            {"station" in item ? (
              <p className="mt-1 text-sm text-slate-600">
                Station: {item.station}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RailwayDevelopmentSection() {
  const lhbRows = railwayDevelopment.lhbCoaches.data.map((item) => ({
    label: item.period,
    value: item.coaches,
    display: `${formatNumber(item.coaches)} coaches`,
  }));
  const bioToiletRows = railwayDevelopment.bioToilets.data.map((item) => ({
    label: item.period,
    value: item.coaches,
    display: `${formatNumber(item.coaches)} coaches`,
  }));
  const trackRows = railwayDevelopment.trackLaying.data.map((item) => ({
    label: item.period,
    value: item.trackWorkRkm,
    display: `${formatNumber(item.trackWorkRkm)} RKM`,
  }));
  const cctvRows = railwayDevelopment.cctvStations.data.map((item) => ({
    label: item.period,
    value: item.stations,
    display: `${formatNumber(item.stations)} stations`,
  }));

  return (
    <section id="railway-development" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Railway Development
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {railwayDevelopment.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Railway work is compared using completed or cumulative operational
            metrics including electrification, coach manufacturing, track work,
            connectivity, and station surveillance coverage.
          </p>
        </div>

        <div className="mt-8">
          <ElectrificationCard />
        </div>

        <div className="mt-8">
          <ComparisonCards />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <BarChart title={railwayDevelopment.lhbCoaches.title} rows={lhbRows} />
          <BarChart
            title={railwayDevelopment.bioToilets.title}
            rows={bioToiletRows}
          />
          <BarChart title={railwayDevelopment.trackLaying.title} rows={trackRows} />
          <BarChart
            title={railwayDevelopment.cctvStations.title}
            rows={cctvRows}
          />
        </div>

        <p className="mt-6 rounded-md bg-white p-4 text-sm font-medium text-slate-700">
          {railwayDevelopment.trackLaying.highlight}
        </p>

        <div className="mt-8">
          <NorthEastTimeline />
        </div>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={railwayDevelopment.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {railwayDevelopment.source}
          </a>
        </p>
      </div>
    </section>
  );
}
