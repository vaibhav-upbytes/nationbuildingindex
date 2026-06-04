import type { CategorySummary } from "@/data/categories";

type CategoryCardProps = {
  category: CategorySummary;
  isActive?: boolean;
  onSelect: (id: string) => void;
};

export function CategoryCard({
  category,
  isActive = false,
  onSelect,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={isActive}
      className={`group flex h-full min-h-52 flex-col rounded-lg border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
        isActive
          ? "border-teal-500 bg-teal-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <span className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">
          {category.icon}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {category.metricCount} metrics
        </span>
      </span>
      <span className="mt-4 text-base font-semibold text-slate-950">
        {category.shortTitle ?? category.title}
      </span>
      <span className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
        {category.description}
      </span>
      <span className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        <span className="font-medium text-slate-950">
          {category.headlineMetric.label}:
        </span>{" "}
        {category.headlineMetric.before} → {category.headlineMetric.after}
      </span>
      <span className="mt-auto pt-4 text-sm font-semibold text-teal-700 group-hover:text-teal-900">
        View Details
      </span>
    </button>
  );
}
