export function MethodologySection() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      <article className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-950">
          Compare completed work
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Metrics should describe assets completed, services started, networks
          commissioned, or households reached during each comparison period.
        </p>
      </article>
      <article className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-950">
          Avoid spending comparisons
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Budget allocation and expenditure are excluded unless they are needed
          only to identify the official scheme or report behind an outcome.
        </p>
      </article>
      <article className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-950">
          Require source-backed claims
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Values remain pending until supported by official reports, ministry
          websites, annual reports, or public datasets.
        </p>
      </article>
    </section>
  );
}
