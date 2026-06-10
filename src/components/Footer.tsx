import Link from "next/link";

const dataSources = [
  "PIB",
  "Ministry of Power",
  "Ministry of Education",
  "Ministry of Rural Development",
  "Ministry of Road Transport & Highways",
  "Indian Railways",
  "RBI",
  "PPAC",
  "Income Tax Department",
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 text-sm text-slate-600 md:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
              <img
                src="/images/nbi_logo.png"
                alt="Nation Building Index logo"
                className="size-full object-contain"
              />
            </span>
            <span className="text-base font-semibold text-slate-950">
              Nation Building Index
            </span>
          </div>
          <p>
            Nation Building Index is a static, data-focused public comparison
            project. Values should remain tied to official sources and
            source-backed verification.
          </p>
          <Link
            href="/sources/"
            className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          >
            View All Sources
          </Link>
        </div>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            Data Sources
          </h2>
          <p className="mt-2 leading-6 text-slate-600">
            Official data used throughout the website is sourced from:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {dataSources.map((source) => (
              <li
                key={source}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {source}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
}
