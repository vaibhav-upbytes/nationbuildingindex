import type { ComponentType } from "react";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ContextBox } from "@/components/ContextBox";
import { DirectIncomeTaxSection } from "@/components/DirectIncomeTaxSection";
import { EconomicGrowthSection } from "@/components/EconomicGrowthSection";
import { EducationDevelopmentSection } from "@/components/EducationDevelopmentSection";
import { HighwayExpresswayDevelopmentSection } from "@/components/HighwayExpresswayDevelopmentSection";
import { InflationStabilitySection } from "@/components/InflationStabilitySection";
import { KpiCard } from "@/components/KpiCard";
import { MetricChart } from "@/components/MetricChart";
import { MiscellaneousSection } from "@/components/MiscellaneousSection";
import { PowerElectricitySection } from "@/components/PowerElectricitySection";
import { RailwayDevelopmentSection } from "@/components/RailwayDevelopmentSection";
import { RuralElectrificationSection } from "@/components/RuralElectrificationSection";
import { RuralRoadDevelopmentSection } from "@/components/RuralRoadDevelopmentSection";
import { SourceList } from "@/components/SourceList";
import { getSourcesByCategory } from "@/data/sources";
import type { ComparisonRow } from "@/data/comparison-data";
import type { CategorySummary } from "@/data/categories";

type CategoryDetailProps = {
  category: CategorySummary;
  rows: ComparisonRow[];
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

const detailComponents: Record<string, ComponentType> = {
  "rural-development": RuralRoadDevelopmentSection,
  railways: RailwayDevelopmentSection,
  "rural-electrification": RuralElectrificationSection,
  "power-electricity": PowerElectricitySection,
  "highway-expressway": HighwayExpresswayDevelopmentSection,
  "education-development": EducationDevelopmentSection,
  "economic-growth": EconomicGrowthSection,
  inflation: InflationStabilitySection,
  "direct-income-tax": DirectIncomeTaxSection,
  miscellaneous: MiscellaneousSection,
};

export function CategoryDetail({
  category,
  rows,
  onBack,
  onNext,
  onPrevious,
}: CategoryDetailProps) {
  const EvidenceSection = detailComponents[category.id];
  const kpiRows = rows.slice(0, 6);
  const categorySources = getSourcesByCategory(category.title);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
        >
          Back to Category Explorer
        </button>

        <header className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">
                  {category.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase text-teal-700">
                    Category Detail
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-slate-950">
                    {category.title}
                  </h2>
                </div>
              </div>
              <p className="mt-5 leading-7 text-slate-700">
                {category.description}
              </p>
            </div>
            <dl className="grid gap-3 text-sm sm:grid-cols-3 lg:min-w-80 lg:grid-cols-1">
              <div className="rounded-md bg-slate-50 p-3">
                <dt className="text-slate-500">Sources</dt>
                <dd className="mt-1 font-semibold text-slate-950">
                  {category.sourceLabels.length}
                </dd>
              </div>
              <div className="rounded-md bg-slate-50 p-3">
                <dt className="text-slate-500">Period covered</dt>
                <dd className="mt-1 font-semibold text-slate-950">
                  {category.period}
                </dd>
              </div>
              <div className="rounded-md bg-slate-50 p-3">
                <dt className="text-slate-500">Metrics</dt>
                <dd className="mt-1 font-semibold text-slate-950">
                  {category.metricCount}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {kpiRows.length > 0 ? (
            kpiRows.map((row) => (
              <KpiCard
                key={`${row.category}-${row.metric}`}
                label={row.metric}
                before={row.manmohanValue}
                after={row.modiValue}
                unit={row.unit}
              />
            ))
          ) : (
            <KpiCard
              label={category.headlineMetric.label}
              before={category.headlineMetric.before}
              after={category.headlineMetric.after}
            />
          )}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          <MetricChart
            label={category.headlineMetric.label}
            before={category.headlineMetric.before}
            after={category.headlineMetric.after}
          />
          <SourceList
            sources={category.sourceLabels}
            sourceReferences={categorySources}
          />
        </div>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-950">
              Main Comparison Table
            </h3>
          </div>
          <ComparisonTable rows={rows} />
        </section>

        <div className="mt-6">
          <ContextBox title="Methodology Context">
            This category view keeps measurable outcomes grouped together. Some
            figures use endpoint comparisons while others use completed work
            counts, so each metric should be read with its source note and
            period label.
          </ContextBox>
        </div>

        {categorySources.length > 0 ? (
          <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-teal-700">
                  Verification
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-950">
                  Sources Used
                </h3>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {categorySources.map((source) => (
                <article
                  key={source.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {source.organization}
                  </p>
                  <h4 className="mt-2 text-base font-semibold text-slate-950">
                    {source.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {source.description}
                  </p>
                  {source.periodBadges && source.periodBadges.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {source.periodBadges.map((period) => (
                        <span
                          key={`${source.id}-${period}`}
                          className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800"
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                  >
                    Visit Source
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={onPrevious}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          >
            Previous Category
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          >
            Next Category
          </button>
        </div>
      </div>

      {EvidenceSection ? (
        <div className="border-t border-slate-200">
          <EvidenceSection />
        </div>
      ) : null}
    </section>
  );
}
