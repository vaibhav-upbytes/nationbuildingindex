import type { Metadata } from "next";
import Link from "next/link";
import { MethodologySection } from "@/components/MethodologySection";

const dataPrinciples = [
  "Use official government data whenever available.",
  "Use outcome-based metrics instead of expenditure.",
  "Prefer physical infrastructure outcomes.",
  "Show sources for every metric.",
  "Present data without political endorsement.",
];

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Nation Building Index methodology for comparing governance outcomes using official sources, physical outcomes, long-term trends and transparent data references.",
};

export default function MethodologyPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Methodology
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          Measuring outcomes, not political claims
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Nation Building Index compares completed work and measurable outcomes.
          It does not compare government spending or campaign claims. Each
          metric should be read with its period, source note, and source link.
        </p>
      </div>

      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">Data Principles</h2>
        <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
          {dataPrinciples.map((principle) => (
            <li key={principle} className="rounded-md bg-slate-50 px-4 py-3">
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-2xl font-bold text-slate-950">
          Important Disclaimer
        </h2>
        <p className="mt-4 leading-7 text-slate-800">
          Many projects span multiple governments and administrations.
          Development outcomes often result from policies, investments, and
          projects initiated across different periods. This platform presents
          publicly available data to support informed analysis and does not
          attribute outcomes exclusively to any single government unless
          explicitly stated by the source.
        </p>
      </section>

      <div className="mt-10">
        <MethodologySection />
      </div>

      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          Source Verification
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">
          The source registry lists category-level references used throughout the
          website. Source links open in a new tab so users can inspect the
          original publication or dashboard directly.
        </p>
        <Link
          href="/sources/"
          className="mt-5 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
        >
          View All Sources
        </Link>
      </section>
    </section>
  );
}
