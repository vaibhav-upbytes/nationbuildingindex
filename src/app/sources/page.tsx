import type { Metadata } from "next";
import { SourceRegistry } from "@/components/SourceRegistry";
import { sources } from "@/data/sources";

export const metadata: Metadata = {
  title: "Sources & Data References",
  description:
    "Verify Nation Building Index data references across PMGSY, railways, power, highways, education, economy, inflation, taxation, fuel prices and currency sources.",
};

export default function SourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Sources
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          Sources & Data References
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          All data presented on Nation Building Index is derived from publicly
          available government publications, official statistics, regulatory
          institutions, and reference datasets. Every category includes links to
          the original source material wherever available.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Source records</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            {sources.length}
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Coverage</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">10 sectors</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Link policy</p>
          <p className="mt-2 text-lg font-bold text-slate-950">
            Opens official sources
          </p>
        </article>
      </div>

      <SourceRegistry sources={sources} />
    </section>
  );
}
