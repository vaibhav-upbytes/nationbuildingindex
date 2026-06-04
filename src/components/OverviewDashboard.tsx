import { CategoryCard } from "@/components/CategoryCard";
import { KpiCard } from "@/components/KpiCard";
import { SearchBox } from "@/components/SearchBox";
import type { CategorySummary } from "@/data/categories";

type OverviewDashboardProps = {
  categories: CategorySummary[];
  filteredCategories: CategorySummary[];
  totalMetrics: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectCategory: (id: string) => void;
};

function SummaryCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
    </article>
  );
}

const topInsights = [
  {
    label: "Rural roads completed",
    before: "3,35,670 km",
    after: "4,09,259 km",
  },
  {
    label: "Railway track work",
    before: "14,985 RKM",
    after: "25,871 RKM",
  },
  {
    label: "Power shortage",
    before: "4.2%",
    after: "0.03%",
  },
  {
    label: "NH network",
    before: "91,287 km",
    after: "1,46,560 km",
  },
  {
    label: "Universities",
    before: "760",
    after: "1,338",
  },
  {
    label: "Inflation average",
    before: "8.2%",
    after: "5.0%",
  },
  {
    label: "Direct tax on ₹20 LPA",
    before: "₹4.02 lakh",
    after: "₹2.34 lakh",
  },
  {
    label: "Household electrification",
    before: "Universal access not achieved",
    after: "2.86 crore households",
  },
];

export function OverviewDashboard({
  categories,
  filteredCategories,
  totalMetrics,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}: OverviewDashboardProps) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total categories"
            value={String(categories.length)}
            note="Dashboard category groups"
          />
          <SummaryCard
            label="Total metrics compared"
            value={String(totalMetrics)}
            note="Static source-backed metric count"
          />
          <SummaryCard
            label="Period covered"
            value="2004–2025"
            note="Endpoint and period comparisons"
          />
          <SummaryCard
            label="Data sources"
            value="Official records"
            note="PIB / RBI / PPAC / Indian Railways"
          />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-teal-700">
                Category Explorer
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Select one category to inspect the data
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Search by sector, metric, or keyword. The page keeps context by
                showing only one selected category instead of expanding every
                dataset at once.
              </p>
            </div>
            <div className="w-full lg:max-w-sm">
              <SearchBox value={searchQuery} onChange={onSearchChange} />
            </div>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={onSelectCategory}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm font-medium text-slate-600">
              No matching category found
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Top Insights
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              High-level comparisons across sectors
            </h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topInsights.map((insight) => (
              <KpiCard key={insight.label} {...insight} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Source Credibility
          </h2>
          <p className="mt-3 leading-7 text-slate-700">
            The dashboard prioritizes official government, PIB, RBI, PPAC,
            Indian Railways, ministry records, annual reports, and public
            datasets. Category details show source labels and preserve source
            links in the detailed evidence section.
          </p>
        </section>
      </div>
    </section>
  );
}
