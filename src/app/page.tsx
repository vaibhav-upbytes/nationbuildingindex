import type { Metadata } from "next";
import Link from "next/link";
import { DashboardExperience } from "@/components/DashboardExperience";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Nation Building Index – Compare Development Outcomes Through Data",
  description:
    "Nation Building Index helps citizens compare governance outcomes across infrastructure, economy, education, energy, taxation, inflation and public services using official data sources and long-term development trends.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <DashboardExperience />
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Review the rules before reading the numbers
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700">
              The methodology and source pages explain how each claim should be
              checked before it becomes part of a source-backed comparison.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/methodology/"
              className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Methodology
            </Link>
            <Link
              href="/sources/"
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Sources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
