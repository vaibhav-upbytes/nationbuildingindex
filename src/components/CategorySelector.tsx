import type { CategorySummary } from "@/data/categories";

type CategorySelectorProps = {
  categories: CategorySummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOverview: () => void;
};

export function CategorySelector({
  categories,
  selectedId,
  onSelect,
  onOverview,
}: CategorySelectorProps) {
  return (
    <nav
      aria-label="Category selector"
      className="sticky top-0 z-20 border-y border-slate-200 bg-white/95 shadow-sm backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
        <button
          type="button"
          onClick={onOverview}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
            selectedId === null
              ? "bg-slate-950 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Overview
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
              selectedId === category.id
                ? "bg-teal-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span className="text-xs">{category.icon}</span>
            {category.shortTitle ?? category.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
