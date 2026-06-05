import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/ComparisonTable";
import { comparisonData } from "@/data/comparison-data";

export const metadata: Metadata = {
  title: "Data",
  description:
    "Static comparison table for verified Nation Building Index categories and source-backed metrics.",
};

export default function DataPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">Data</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Static comparison table
          </h1>
          <p className="mt-5 leading-7 text-slate-700">
            All verified metrics are shown in one place. Use the homepage
            dashboard for category-by-category exploration.
          </p>
        </div>
        <Link
          href="/"
          className="w-fit rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Open Dashboard
        </Link>
      </div>
      <div className="mt-10">
        <ComparisonTable rows={comparisonData} />
      </div>
    </section>
  );
}
