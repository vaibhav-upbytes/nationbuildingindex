import type { Metadata } from "next";

const sourceCategories = [
  {
    title: "Government reports",
    text: "Official reports from central government departments, statutory bodies, and parliamentary materials.",
  },
  {
    title: "Ministry websites",
    text: "Current and archived ministry pages that publish scheme progress, completion data, and official releases.",
  },
  {
    title: "Annual reports",
    text: "Year-wise annual reports from ministries, public authorities, and implementing agencies.",
  },
  {
    title: "Public datasets",
    text: "Open government datasets and dashboards with downloadable or auditable records.",
  },
];

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Official source categories used for future verified NamoVsMMS comparison data.",
};

export default function SourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Sources
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Official source categories
        </h1>
        <p className="mt-5 leading-7 text-slate-700">
          Values should be marked verified only when they can be traced to
          official source material. Placeholder data remains pending until that
          verification is complete.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {sourceCategories.map((source) => (
          <article
            key={source.title}
            className="rounded-lg border border-slate-200 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {source.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {source.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
