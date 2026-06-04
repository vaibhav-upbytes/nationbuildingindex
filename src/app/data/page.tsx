import type { Metadata } from "next";
import { ComparisonTable } from "@/components/ComparisonTable";
import { DirectIncomeTaxSection } from "@/components/DirectIncomeTaxSection";
import { EconomicGrowthSection } from "@/components/EconomicGrowthSection";
import { EducationDevelopmentSection } from "@/components/EducationDevelopmentSection";
import { HighwayExpresswayDevelopmentSection } from "@/components/HighwayExpresswayDevelopmentSection";
import { InflationStabilitySection } from "@/components/InflationStabilitySection";
import { MetroRailDevelopmentSection } from "@/components/MetroRailDevelopmentSection";
import { MiscellaneousSection } from "@/components/MiscellaneousSection";
import { PowerElectricitySection } from "@/components/PowerElectricitySection";
import { RailwayDevelopmentSection } from "@/components/RailwayDevelopmentSection";
import { RuralElectrificationSection } from "@/components/RuralElectrificationSection";
import { RuralRoadDevelopmentSection } from "@/components/RuralRoadDevelopmentSection";
import { UrbanHousingDevelopmentSection } from "@/components/UrbanHousingDevelopmentSection";
import { WaterDevelopmentSection } from "@/components/WaterDevelopmentSection";
import { comparisonData } from "@/data/comparison-data";

export const metadata: Metadata = {
  title: "Data",
  description:
    "Static comparison table for verified NamoVsMMS categories and source-backed metrics.",
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
            All verified categories are shown in one place with source-backed
            metrics from official reports, ministry pages, annual reports, or
            public datasets.
          </p>
        </div>
        <div className="mt-10">
          <ComparisonTable rows={comparisonData} />
        </div>
      </section>
      <RuralRoadDevelopmentSection />
      <RuralElectrificationSection />
      <UrbanHousingDevelopmentSection />
      <WaterDevelopmentSection />
      <PowerElectricitySection />
      <RailwayDevelopmentSection />
      <MetroRailDevelopmentSection />
      <HighwayExpresswayDevelopmentSection />
      <EducationDevelopmentSection />
      <EconomicGrowthSection />
      <InflationStabilitySection />
      <DirectIncomeTaxSection />
      <MiscellaneousSection />
    </>
  );
}
