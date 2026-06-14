"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryDetail } from "@/components/CategoryDetail";
import { OverviewDashboard } from "@/components/OverviewDashboard";
import { categories } from "@/data/categories";
import { comparisonData } from "@/data/comparison-data";

const rowCategoryMap: Record<string, string[]> = {
  "rural-development": ["Rural Development"],
  railways: ["Railway Development"],
  "rural-electrification": ["Rural Electrification"],
  "power-electricity": ["Power & Electricity"],
  "highway-expressway": ["Highway & Expressway Development"],
  "education-development": ["Education Development"],
  "employment-workforce": ["Employment & Workforce Growth"],
  "economic-growth": ["Economic Growth & Structural Transformation"],
  inflation: ["Inflation & Price Stability"],
  "poverty-reduction": ["Poverty Reduction & Living Standards"],
  "direct-income-tax": ["Direct Income Tax Comparison"],
  miscellaneous: ["Miscellaneous: Fuel Prices & Currency Movement"],
};

function rowsForCategory(categoryId: string) {
  const categoryNames = rowCategoryMap[categoryId] ?? [];

  return comparisonData.filter((row) => categoryNames.includes(row.category));
}

function categoryMatches(categoryId: string, query: string) {
  const category = categories.find((item) => item.id === categoryId);
  if (!category) {
    return false;
  }

  const rows = rowsForCategory(category.id);
  const searchable = [
    category.title,
    category.shortTitle ?? "",
    category.description,
    category.headlineMetric.label,
    category.headlineMetric.before,
    category.headlineMetric.after,
    ...category.keywords,
    ...rows.map((row) => row.metric),
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query.toLowerCase());
}

function getCategoryFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const queryCategory = params.get("category");
  const hashCategory = window.location.hash.replace("#", "");
  const requestedCategory = queryCategory || hashCategory;

  return categories.some((category) => category.id === requestedCategory)
    ? requestedCategory
    : null;
}

export function DashboardExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function syncCategoryFromLocation() {
      const nextCategory = getCategoryFromLocation();
      const requestedHash = window.location.hash.replace("#", "");

      setSelectedId(nextCategory);

      if (!nextCategory && requestedHash === "category-dashboard") {
        window.requestAnimationFrame(() => {
          document.getElementById("category-dashboard")?.scrollIntoView({
            block: "start",
          });
        });
      }
    }

    syncCategoryFromLocation();
    window.addEventListener("hashchange", syncCategoryFromLocation);

    return () => {
      window.removeEventListener("hashchange", syncCategoryFromLocation);
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      return categories;
    }

    return categories.filter((category) =>
      categoryMatches(category.id, trimmedQuery),
    );
  }, [searchQuery]);

  const selectedCategory = selectedId
    ? categories.find((category) => category.id === selectedId)
    : undefined;
  const selectedRows = selectedCategory
    ? rowsForCategory(selectedCategory.id)
    : [];
  const totalMetrics = categories.reduce(
    (total, category) => total + category.metricCount,
    0,
  );

  function selectCategory(categoryId: string) {
    setSelectedId(categoryId);
    window.history.replaceState(null, "", `#${categoryId}`);
  }

  function showOverview() {
    setSelectedId(null);
    window.history.replaceState(null, "", `#category-dashboard`);
    window.requestAnimationFrame(() => {
      document.getElementById("category-dashboard")?.scrollIntoView({
        block: "start",
      });
    });
  }

  function selectOffsetCategory(offset: number) {
    const currentIndex = selectedCategory
      ? categories.findIndex((category) => category.id === selectedCategory.id)
      : 0;
    const nextIndex =
      (currentIndex + offset + categories.length) % categories.length;

    selectCategory(categories[nextIndex].id);
  }

  return (
    <>
      {selectedCategory ? (
        <CategoryDetail
          category={selectedCategory}
          rows={selectedRows}
          onBack={showOverview}
          onNext={() => selectOffsetCategory(1)}
          onPrevious={() => selectOffsetCategory(-1)}
        />
      ) : (
        <OverviewDashboard
          categories={categories}
          filteredCategories={filteredCategories}
          totalMetrics={totalMetrics}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategory={selectCategory}
        />
      )}
    </>
  );
}
