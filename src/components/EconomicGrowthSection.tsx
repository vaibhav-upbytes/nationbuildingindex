import { economicGrowth } from "@/data/economicGrowth";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
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

function BarChart({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: number; display: string; after2014?: boolean }[];
}) {
  const maxValue = Math.max(...rows.map((row) => row.value));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((row) => {
          const width = maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";
          const color = row.after2014 ? "bg-[#ff9933]" : "bg-teal-700";

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

function SectorStackedChart() {
  const { sectorComposition } = economicGrowth;
  const rows = [
    {
      year: "FY2014",
      primary: sectorComposition.primary.fy14Percent,
      secondary: sectorComposition.secondary.fy14Percent,
      tertiary: sectorComposition.tertiary.fy14Percent,
      after2014: false,
    },
    {
      year: "FY2025",
      primary: sectorComposition.primary.fy25Percent,
      secondary: sectorComposition.secondary.fy25Percent,
      tertiary: sectorComposition.tertiary.fy25Percent,
      after2014: true,
    },
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
      <h3 className="text-lg font-semibold text-slate-950">
        Sector Composition
      </h3>
      <div className="mt-5 space-y-5">
        {rows.map((row) => {
          const remainder = Math.max(
            0,
            100 - row.primary - row.secondary - row.tertiary,
          );
          const tertiaryColor = row.after2014 ? "bg-[#ff9933]" : "bg-teal-700";

          return (
            <div key={row.year}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-slate-800">{row.year}</span>
                <span className="text-slate-600">
                  Services: {formatNumber(row.tertiary)}%
                </span>
              </div>
              <div
                className="flex h-5 overflow-hidden rounded-full bg-slate-100"
                role="img"
                aria-label={`${row.year}: primary ${formatNumber(
                  row.primary,
                )}%, secondary ${formatNumber(row.secondary)}%, tertiary ${formatNumber(
                  row.tertiary,
                )}%`}
              >
                <div
                  className="bg-emerald-600"
                  style={{ width: `${row.primary}%` }}
                />
                <div
                  className="bg-sky-600"
                  style={{ width: `${row.secondary}%` }}
                />
                <div
                  className={tertiaryColor}
                  style={{ width: `${row.tertiary}%` }}
                />
                {remainder > 0 ? (
                  <div className="bg-slate-300" style={{ width: `${remainder}%` }} />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-xs font-medium text-slate-600">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-emerald-600" />
          Primary
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-sky-600" />
          Secondary
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff9933]" />
          Tertiary / services
        </span>
      </div>
    </section>
  );
}

function GlobalRankTimeline() {
  const { globalPosition } = economicGrowth;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        Global Rank Progress
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <article className="rounded-md bg-slate-50 p-4">
          <p className="text-sm font-semibold text-teal-700">2014</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            Rank {globalPosition.rank2014}
          </p>
        </article>
        <article className="rounded-md bg-orange-50 p-4">
          <p className="text-sm font-semibold text-orange-700">2025</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            Rank {globalPosition.rank2025}
          </p>
        </article>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {globalPosition.projection}
      </p>
    </section>
  );
}

export function EconomicGrowthSection() {
  const { gdpExpansion, exports, sectorComposition } = economicGrowth;
  const gdpRows = [
    {
      label: "2004",
      value: gdpExpansion.period2004_2014.startUsdTrillion,
      display: `$${formatNumber(gdpExpansion.period2004_2014.startUsdTrillion)} trillion`,
    },
    {
      label: "2014",
      value: gdpExpansion.period2004_2014.endUsdTrillion,
      display: `$${formatNumber(gdpExpansion.period2004_2014.endUsdTrillion)} trillion`,
    },
    {
      label: "2024",
      value: gdpExpansion.period2014_2024.endUsdTrillion,
      display: `$${formatNumber(gdpExpansion.period2014_2024.endUsdTrillion)} trillion`,
      after2014: true,
    },
  ];
  const totalExportRows = [
    {
      label: "FY2013-14",
      value: exports.totalExports.fy14UsdBillion,
      display: `$${formatNumber(exports.totalExports.fy14UsdBillion)} billion`,
    },
    {
      label: "FY2024-25",
      value: exports.totalExports.fy25UsdBillion,
      display: `$${formatNumber(exports.totalExports.fy25UsdBillion)} billion`,
      after2014: true,
    },
  ];
  const servicesExportRows = [
    {
      label: "FY2013-14",
      value: exports.servicesExports.fy14UsdBillion,
      display: `$${formatNumber(exports.servicesExports.fy14UsdBillion)} billion`,
    },
    {
      label: "FY2024-25",
      value: exports.servicesExports.fy25UsdBillion,
      display: `$${formatNumber(exports.servicesExports.fy25UsdBillion)} billion`,
      after2014: true,
    },
  ];

  return (
    <section id="economic-growth" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Economic Growth
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {economicGrowth.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            This section compares GDP size, exports, sector composition, and
            global economic position. It avoids using only GDP growth rates
            because methodology, global conditions, and base years differ.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard
            label="GDP expansion"
            value="$2.10T to $3.90T"
            note="2014–2024 increase: $1.80 trillion"
          />
          <SummaryCard
            label="Global GDP rank"
            value="10th to 4th"
            note="2014 compared with 2025"
          />
          <SummaryCard
            label="Total exports"
            value="$825B"
            note="FY2024-25; 76% growth over FY2013-14"
          />
          <SummaryCard
            label="Services exports"
            value="$387B"
            note="FY2024-25; more than doubled"
          />
          <SummaryCard
            label="Services share"
            value="50.6% to ~55%"
            note="Services remained the largest contributor"
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <BarChart title="GDP Comparison" rows={gdpRows} />
          <BarChart title="Total Export Growth" rows={totalExportRows} />
          <BarChart
            title="Services Export Growth"
            rows={servicesExportRows}
          />
          <SectorStackedChart />
          <GlobalRankTimeline />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            GDP at Current Prices
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SummaryCard
              label="FY2014-15"
              value={`Rs ${formatNumber(gdpExpansion.nominalGdpIndia.fy15LakhCrore)} lakh crore`}
              note="GDP at current prices"
            />
            <SummaryCard
              label="FY2024-25"
              value={`Rs ${formatNumber(gdpExpansion.nominalGdpIndia.fy25LakhCrore)} lakh crore`}
              note={gdpExpansion.nominalGdpIndia.note}
            />
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {Object.values(sectorComposition).map((sector) => (
            <article
              key={sector.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-950">
                {sector.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {sector.description}
              </p>
              <p className="mt-4 text-2xl font-bold text-slate-950">
                {formatNumber(sector.fy14Percent)}% to{" "}
                {formatNumber(sector.fy25Percent)}%
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {sector.observation}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">
              Economic Transformation Highlights
            </h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              {economicGrowth.highlights.map((highlight) => (
                <li key={highlight} className="rounded-md bg-slate-50 px-3 py-2">
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">
              How the Economy Changed
            </h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              {economicGrowth.insights.map((insight) => (
                <li key={insight} className="rounded-md bg-slate-50 px-3 py-2">
                  {insight}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={economicGrowth.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {economicGrowth.source}
          </a>
          {"; reference: "}
          <a
            href={economicGrowth.referenceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {economicGrowth.referenceSource}
          </a>
        </p>
      </div>
    </section>
  );
}
