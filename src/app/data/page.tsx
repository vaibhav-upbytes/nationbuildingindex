import type { Metadata } from "next";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RailwayDevelopmentSection } from "@/components/RailwayDevelopmentSection";
import { RuralRoadDevelopmentSection } from "@/components/RuralRoadDevelopmentSection";
import { UrbanHousingDevelopmentSection } from "@/components/UrbanHousingDevelopmentSection";
import { comparisonData } from "@/data/comparison-data";

export const metadata: Metadata = {
  title: "Data",
  description:
    "Static comparison table for NamoVsMMS categories, with pending placeholders until source verification.",
};

export default function DataPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">Data</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Static comparison table
          </h1>
          <p className="mt-5 leading-7 text-slate-700">
            All categories are shown in one place. Current values are
            placeholders until the relevant official reports, ministry pages,
            annual reports, or public datasets are checked.
          </p>
        </div>
        <div className="mt-10">
          <ComparisonTable rows={comparisonData} />
        </div>
      </section>
      <RuralRoadDevelopmentSection />
      <UrbanHousingDevelopmentSection />
      <RailwayDevelopmentSection />
    </>
  );
}
