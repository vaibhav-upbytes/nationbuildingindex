import Link from "next/link";

const usagePoints = [
  "Compare measurable outcomes instead of promises.",
  "Focus on long-term trends, not isolated events.",
  "Understand that many projects span multiple governments.",
  "Review official data sources for every category.",
  "Draw your own conclusions based on evidence.",
];

export function Hero() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-20">
        <div className="max-w-[900px]">
          <p className="mb-4 text-sm font-semibold uppercase text-teal-700">
            Static public comparison
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            Narendra Modi government vs Manmohan Singh government
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-200 sm:text-xl sm:leading-9">
            <strong className="font-semibold text-slate-950 dark:text-white">
              Development is cumulative.
            </strong>{" "}
            Every government inherits opportunities and challenges from its
            predecessor, while its decisions shape the lives of current and
            future generations. This platform presents{" "}
            <strong className="font-semibold text-teal-700 dark:text-teal-300">
              objective data
            </strong>{" "}
            across key sectors to help citizens evaluate performance, understand{" "}
            <strong className="font-semibold text-teal-700 dark:text-teal-300">
              long-term trends
            </strong>
            {", "}
            and{" "}
            <strong className="font-semibold text-teal-700 dark:text-teal-300">
              compare outcomes
            </strong>{" "}
            using{" "}
            <strong className="font-semibold text-slate-950 dark:text-white">
              facts rather than narratives
            </strong>
            {"."}
          </p>

          <section className="mx-auto mt-8 max-w-3xl rounded-lg border border-slate-200 bg-slate-50 p-6 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              How to Use This Platform
            </h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200 sm:grid-cols-2">
              {usagePoints.map((point) => (
                <li
                  key={point}
                  className="rounded-md bg-white px-3 py-2 dark:bg-slate-950"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/data/"
              className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              View comparison data
            </Link>
            <Link
              href="/methodology/"
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Read methodology
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
