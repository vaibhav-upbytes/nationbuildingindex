import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { RailwayDevelopmentSection } from "@/components/RailwayDevelopmentSection";
import { RuralRoadDevelopmentSection } from "@/components/RuralRoadDevelopmentSection";
import { UrbanHousingDevelopmentSection } from "@/components/UrbanHousingDevelopmentSection";
import { comparisonData } from "@/data/comparison-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-950">
            Project overview
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            NamoVsMMS is a static reference site for comparing measurable public
            work completed during 2004–2014 and 2014–Present. The site is
            intentionally neutral and keeps unverifiable values marked as
            pending until official sources are added.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisonData.map((row) => (
            <CategoryCard
              key={`${row.category}-${row.metric}`}
              category={row.category}
              metric={row.metric}
              status={row.status}
            />
          ))}
        </div>
      </section>
      <RuralRoadDevelopmentSection />
      <UrbanHousingDevelopmentSection />
      <RailwayDevelopmentSection />
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Review the rules before reading the numbers
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700">
              The methodology and source pages explain how each future claim
              should be checked before a placeholder becomes verified data.
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
