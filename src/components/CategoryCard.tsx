type CategoryCardProps = {
  category: string;
  metric: string;
  status: "verified";
};

export function CategoryCard({ category, metric, status }: CategoryCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-950">{category}</h3>
        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
          {status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{metric}</p>
    </article>
  );
}
