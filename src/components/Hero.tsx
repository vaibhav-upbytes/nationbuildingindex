import Link from "next/link";

const usagePoints = [
  "Compare measurable outcomes, not political promises.",
  "Read each metric with its period and source.",
  "Understand that many projects span multiple governments.",
  "Use long-term trends instead of isolated events.",
  "Draw your own conclusions from the evidence.",
];

const trustItems = [
  "10+ sectors covered",
  "2004–2025 timeline",
  "Official data sources",
  "Outcome-based comparison",
];

const summaryItems = [
  { label: "Sectors", value: "10+" },
  { label: "Period", value: "2004–2025" },
  {
    label: "Sources",
    value: "PIB, RBI, PPAC, Indian Railways, official dashboards",
  },
  { label: "Method", value: "Outcome-based comparison" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-slate-600 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200">
            Public Data • Governance Outcomes • Long-Term Trends
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Nation Building Index
          </h1>

          <p className="mt-6 max-w-[900px] text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">
            <strong className="font-semibold text-white">
              Development is cumulative.
            </strong>{" "}
            Every government inherits opportunities and challenges from its
            predecessor, while its decisions shape the lives of current and
            future generations. Nation Building Index presents{" "}
            <strong className="font-semibold text-cyan-200">
              objective data
            </strong>{" "}
            across key sectors to help citizens evaluate performance, understand{" "}
            <strong className="font-semibold text-cyan-200">
              long-term trends
            </strong>
            {", "}
            and{" "}
            <strong className="font-semibold text-cyan-200">
              compare outcomes
            </strong>{" "}
            using{" "}
            <strong className="font-semibold text-white">
              facts rather than narratives
            </strong>
            {"."}
          </p>

          <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
            Compare development outcomes across infrastructure, economy,
            education, energy, taxation, inflation, and public services using
            official data sources.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#category-dashboard"
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
              style={{
                backgroundColor: "#ffffff",
                color: "#0f172a",
                WebkitTextFillColor: "#0f172a",
              }}
            >
              <span style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}>
                Explore the Index
              </span>
            </Link>
            <Link
              href="/methodology/"
              className="rounded-md border border-slate-500 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              View Methodology
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-sm text-slate-200">
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-700 bg-white/6 px-3 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-700 bg-white/8 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">
                NBI Summary
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Public Data Index
              </h2>
            </div>
            <span className="rounded-md bg-white px-2.5 py-1 text-sm font-bold text-slate-950">
              NBI
            </span>
          </div>

          <dl className="mt-5 grid gap-4">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="rounded-md border border-slate-700 bg-slate-950/40 p-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-slate-100">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <section className="mt-5 rounded-md border border-slate-700 bg-slate-900/70 p-5">
            <h2 className="text-base font-semibold text-white">
              How to Read the Index
            </h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {usagePoints.map((point, index) => (
                <li key={point} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-xs font-bold text-slate-950">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </section>
  );
}
