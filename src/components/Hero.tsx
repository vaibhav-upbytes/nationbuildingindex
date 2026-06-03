import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-teal-700">
            Static public comparison
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Narendra Modi government vs Manmohan Singh government
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            This project compares completed work and measurable outcomes. It
            does not compare government spending or political claims.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <dl className="grid gap-5">
            <div>
              <dt className="text-sm font-medium text-slate-500">
                Manmohan Singh government
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-950">
                2004–2014
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">
                Narendra Modi government
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-950">
                2014–Present
              </dd>
            </div>
            <div className="rounded-md bg-white p-4 text-sm leading-6 text-slate-700">
              Every claim should link back to official reports, ministry
              websites, annual reports, or public datasets.
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
