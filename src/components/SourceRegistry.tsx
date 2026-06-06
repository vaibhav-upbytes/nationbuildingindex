"use client";

import { useMemo, useState } from "react";
import type { SourceReference } from "@/data/sources";

type SourceRegistryProps = {
  sources: SourceReference[];
};

function sourceMatches(source: SourceReference, query: string) {
  const searchable = [
    source.category,
    source.title,
    source.organization,
    source.description,
    source.url,
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query.toLowerCase());
}

export function SourceRegistry({ sources }: SourceRegistryProps) {
  const [query, setQuery] = useState("");

  const groupedSources = useMemo(() => {
    const trimmedQuery = query.trim();
    const visibleSources = trimmedQuery
      ? sources.filter((source) => sourceMatches(source, trimmedQuery))
      : sources;

    return visibleSources.reduce<Record<string, SourceReference[]>>(
      (groups, source) => {
        groups[source.category] = groups[source.category] ?? [];
        groups[source.category].push(source);
        return groups;
      },
      {},
    );
  }, [query, sources]);

  const categories = Object.keys(groupedSources);

  return (
    <div className="mt-10">
      <label className="block max-w-xl">
        <span className="text-sm font-semibold text-slate-700">
          Search sources
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Railways, Power, PMGSY, Inflation, GDP, Tax, Education..."
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />
      </label>

      {categories.length > 0 ? (
        <div className="mt-8 space-y-8">
          {categories.map((category) => (
            <section
              key={category}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm font-semibold uppercase text-teal-700">
                  Category
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  {category}
                </h2>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {groupedSources[category].map((source) => (
                  <article
                    key={source.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {source.organization}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">
                      {source.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {source.description}
                    </p>
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
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-medium text-slate-600">
          No source references match this search.
        </div>
      )}
    </div>
  );
}
