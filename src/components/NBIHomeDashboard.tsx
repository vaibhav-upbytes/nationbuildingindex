"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  BookOpenCheck,
  Database,
  Droplets,
  Factory,
  FileSearch,
  Filter,
  Gauge,
  Home,
  LineChart as LineChartIcon,
  MapPinned,
  Network,
  Search,
  ShieldCheck,
  Train,
  TrendingUp,
  Zap,
} from "lucide-react";
import { CategoryDetail } from "@/components/CategoryDetail";
import { categories, type CategorySummary } from "@/data/categories";
import { comparisonData } from "@/data/comparison-data";
import { employmentWorkforce } from "@/data/employmentWorkforce";
import { metroRailDevelopment } from "@/data/metroRailDevelopment";
import { povertyReduction } from "@/data/povertyReduction";
import { railwayDevelopment } from "@/data/railwayDevelopment";
import { ruralRoadDevelopment } from "@/data/ruralDevelopment";
import { ruralElectrification } from "@/data/ruralElectrification";
import { urbanHousingDevelopment } from "@/data/urbanDevelopment";
import { waterDevelopment } from "@/data/waterDevelopment";

type FilterValue =
  | "All"
  | "Infrastructure"
  | "Welfare"
  | "Employment"
  | "Education"
  | "Energy";

type SourceFilter = "All" | "PIB" | "RBI" | "PLFS" | "MoSPI" | "NHAI";
type PeriodFilter = "Full Timeline" | "2004-2014" | "2014-2024";

type KpiMetric = {
  id: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  sourceBadge: string;
  iconNode: React.ReactNode;
  kind: "percent" | "absolute";
  start: {
    label: string;
    value: number;
  };
  end: {
    label: string;
    value: number;
  };
  unit: string;
  growthLabel: string;
  deltaTone: "positive" | "reduction";
  summary: string;
};

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const rowCategoryMap: Record<string, string[]> = {
  "rural-development": [
    "Rural Development",
    "Urban Development",
    "Housing Projects",
    "Drinking Water to Households",
    "Metro Rail Construction",
  ],
  railways: ["Railway Development", "Metro Rail Construction"],
  "rural-electrification": ["Rural Electrification"],
  "power-electricity": ["Power & Electricity"],
  "highway-expressway": ["Highway & Expressway Development"],
  "education-development": ["Education Development"],
  "employment-workforce": ["Employment and Workforce"],
  "economic-growth": ["Economic Growth & Structural Transformation"],
  inflation: ["Inflation & Price Stability"],
  "poverty-reduction": ["Poverty Reduction & Living Standards"],
  "direct-income-tax": ["Direct Income Tax Comparison"],
  miscellaneous: ["Miscellaneous: Fuel Prices & Currency Movement"],
};

const dashboardCategoryFilters: FilterValue[] = [
  "All",
  "Infrastructure",
  "Welfare",
  "Employment",
  "Education",
  "Energy",
];
const periodFilters: PeriodFilter[] = ["Full Timeline", "2004-2014", "2014-2024"];
const sourceFilters: SourceFilter[] = ["All", "PIB", "RBI", "PLFS", "MoSPI", "NHAI"];
const chartMetricOptions = [
  "Poverty",
  "Employment",
  "Housing",
  "Water",
  "Roads",
  "Railways",
] as const;

const indianFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});
const KPI_HORIZONTAL_BAR_SIZE = 12;
const KPI_VERTICAL_BAR_SIZE = 22;
const CATEGORY_MINI_BAR_SIZE = 12;
const PERIOD_BAR_SIZE = 42;

function useHydrated() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

function rowsForCategory(categoryId: string) {
  const categoryNames = rowCategoryMap[categoryId] ?? [];

  return comparisonData.filter((row) => categoryNames.includes(row.category));
}

function numericValue(value: string) {
  if (value.toLowerCase().includes("not")) {
    return null;
  }

  const numeric = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numeric) ? Math.abs(numeric) : null;
}

function categoryGroup(categoryId: string): FilterValue {
  if (
    [
      "rural-development",
      "highway-expressway",
      "railways",
      "economic-growth",
      "miscellaneous",
    ].includes(categoryId)
  ) {
    return "Infrastructure";
  }

  if (["poverty-reduction", "direct-income-tax", "inflation"].includes(categoryId)) {
    return "Welfare";
  }

  if (categoryId === "employment-workforce") {
    return "Employment";
  }

  if (categoryId === "education-development") {
    return "Education";
  }

  if (["power-electricity", "rural-electrification"].includes(categoryId)) {
    return "Energy";
  }

  return "Infrastructure";
}

function lineDataForMetric(metric: (typeof chartMetricOptions)[number]) {
  const selected = analyticsMetricMap[metric];
  const latest = selected.latest;
  const start = selected.start;

  return ["2004", "2009", "2014", "2019", "2024"].map((year, index) => {
    const ratio = index / 4;
    const value = start + (latest - start) * ratio;

    return {
      year,
      value: Math.round(value * 100) / 100,
    };
  });
}

function categoryMatchesSource(category: CategorySummary, source: SourceFilter) {
  if (source === "All") {
    return true;
  }

  const sourceText = [
    ...category.sourceLabels,
    ...rowsForCategory(category.id).map((row) => row.sourceNote),
  ]
    .join(" ")
    .toLowerCase();

  if (source === "NHAI") {
    return /nhai|morth|road transport|highway/.test(sourceText);
  }

  return sourceText.includes(source.toLowerCase());
}

function categoryMatchesPeriod(category: CategorySummary, period: PeriodFilter) {
  if (period === "Full Timeline") {
    return true;
  }

  const periodText = [
    category.period,
    ...rowsForCategory(category.id).flatMap((row) => [
      row.manmohanPeriod,
      row.modiPeriod,
    ]),
  ].join(" ");

  if (period === "2004-2014") {
    return /2004|2013|2014/.test(periodText);
  }

  return /2014|2024|2025|2026/.test(periodText);
}

function categoryMatchesSearch(category: CategorySummary, query: string) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return true;
  }

  const rows = rowsForCategory(category.id);
  const searchable = [
    category.title,
    category.shortTitle ?? "",
    category.description,
    category.headlineMetric.label,
    ...category.keywords,
    ...category.sourceLabels,
    ...rows.map((row) => row.metric),
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(trimmed);
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

const iconByMetricId: Record<string, React.ReactNode> = {
  "multidimensional-poverty": <TrendingUp className="size-4" />,
  "rural-roads": <MapPinned className="size-4" />,
  "tap-water": <Droplets className="size-4" />,
  "household-electrification": <Zap className="size-4" />,
  "urban-housing": <Home className="size-4" />,
  "railway-electrification": <Train className="size-4" />,
  "metro-network": <Network className="size-4" />,
  "employment-growth": <Factory className="size-4" />,
};

const multidimensionalPoverty =
  povertyReduction.detailedMetrics.multidimensionalPoverty;
const jjm = waterDevelopment.jalJeevanMission;
const ruralRoadEarlier = ruralRoadDevelopment.periods[0];
const ruralRoadLatest = ruralRoadDevelopment.periods[1];
const earlierUrbanHouses = urbanHousingDevelopment.periods[0].metrics.find(
  (metric) => metric.label === "Houses completed",
);
const latestUrbanHouses = urbanHousingDevelopment.periods[1].metrics.find(
  (metric) => metric.label === "Houses completed",
);
const railElectrification = railwayDevelopment.electrification.post2014CoreRecord;
const metroEarlier = metroRailDevelopment.periods[0];
const metroLatest = metroRailDevelopment.periods[1];

const kpiMetrics: KpiMetric[] = [
  {
    id: "multidimensional-poverty",
    title: "Poverty rate",
    sourceName: "PIB / Poverty references",
    sourceUrl: povertyReduction.sources[2].url,
    sourceBadge: "PIB",
    iconNode: iconByMetricId["multidimensional-poverty"],
    kind: "percent",
    start: {
      label: multidimensionalPoverty.startYear,
      value: multidimensionalPoverty.startRate,
    },
    end: {
      label: multidimensionalPoverty.latestYear,
      value: multidimensionalPoverty.latestRate,
    },
    unit: "%",
    growthLabel: `${indianFormatter.format(
      multidimensionalPoverty.startRate - multidimensionalPoverty.latestRate,
    )} pp reduction`,
    deltaTone: "reduction",
    summary: "Multidimensional poverty rate",
  },
  {
    id: "employment-growth",
    title: "Employment added",
    sourceName: "RBI KLEMS / PIB",
    sourceUrl: employmentWorkforce.sources[0].url,
    sourceBadge: "RBI KLEMS",
    iconNode: iconByMetricId["employment-growth"],
    kind: "absolute",
    start: {
      label: "2004-2014",
      value: employmentWorkforce.keyMetrics.totalEmploymentAdded.earlier.valueCrore,
    },
    end: {
      label: "2014-2024",
      value: employmentWorkforce.keyMetrics.totalEmploymentAdded.later.valueCrore,
    },
    unit: "crore",
    growthLabel: `+${indianFormatter.format(
      employmentWorkforce.keyMetrics.totalEmploymentAdded.later.valueCrore -
        employmentWorkforce.keyMetrics.totalEmploymentAdded.earlier.valueCrore,
    )} crore`,
    deltaTone: "positive",
    summary: "Broad total-employment estimate",
  },
  {
    id: "tap-water",
    title: "Tap water coverage",
    sourceName: waterDevelopment.source,
    sourceUrl: waterDevelopment.sourceUrl,
    sourceBadge: "PIB",
    iconNode: iconByMetricId["tap-water"],
    kind: "percent",
    start: {
      label: "2019",
      value: jjm.baseline.coveragePercent,
    },
    end: {
      label: "2025",
      value: jjm.totalCoveragePercent,
    },
    unit: "%",
    growthLabel: `+${indianFormatter.format(
      jjm.totalCoveragePercent - jjm.baseline.coveragePercent,
    )} pp`,
    deltaTone: "positive",
    summary: "Rural household tap water coverage",
  },
  {
    id: "rural-roads",
    title: "Rural roads",
    sourceName: ruralRoadDevelopment.source,
    sourceUrl: ruralRoadLatest.sourceSnapshot.htmlSnapshotPath,
    sourceBadge: "OMMAS",
    iconNode: iconByMetricId["rural-roads"],
    kind: "absolute",
    start: {
      label: ruralRoadEarlier.period,
      value: ruralRoadEarlier.totalRoadLengthKm,
    },
    end: {
      label: ruralRoadLatest.period,
      value: ruralRoadLatest.totalRoadLengthKm,
    },
    unit: "km",
    growthLabel: `+${indianFormatter.format(
      ruralRoadLatest.totalRoadLengthKm - ruralRoadEarlier.totalRoadLengthKm,
    )} km`,
    deltaTone: "positive",
    summary: "Completed PMGSY road length",
  },
  {
    id: "urban-housing",
    title: "Urban houses built",
    sourceName: urbanHousingDevelopment.source,
    sourceUrl: urbanHousingDevelopment.sourceUrl,
    sourceBadge: "PIB",
    iconNode: iconByMetricId["urban-housing"],
    kind: "absolute",
    start: {
      label: "2004-2014",
      value: earlierUrbanHouses?.valueLakh ?? 8.04,
    },
    end: {
      label: "2015-2024",
      value: latestUrbanHouses?.valueLakh ?? 88.32,
    },
    unit: "lakh",
    growthLabel: `+${indianFormatter.format(
      (latestUrbanHouses?.valueLakh ?? 88.32) -
        (earlierUrbanHouses?.valueLakh ?? 8.04),
    )} lakh`,
    deltaTone: "positive",
    summary: "Completed urban houses",
  },
  {
    id: "railway-electrification",
    title: "Rail electrification",
    sourceName: railwayDevelopment.source,
    sourceUrl: railwayDevelopment.sourceUrl,
    sourceBadge: "CORE",
    iconNode: iconByMetricId["railway-electrification"],
    kind: "absolute",
    start: {
      label: "Previous period",
      value: railElectrification.previousPeriodRouteKm,
    },
    end: {
      label: "Since 2014",
      value: railElectrification.electrifiedRouteKmSince2014,
    },
    unit: "RKM",
    growthLabel: `+${indianFormatter.format(
      railElectrification.electrifiedRouteKmSince2014 -
        railElectrification.previousPeriodRouteKm,
    )} RKM`,
    deltaTone: "positive",
    summary: "Route km electrified",
  },
  {
    id: "metro-network",
    title: "Metro network",
    sourceName: metroRailDevelopment.source,
    sourceUrl: metroRailDevelopment.sourceUrl,
    sourceBadge: "PIB",
    iconNode: iconByMetricId["metro-network"],
    kind: "absolute",
    start: {
      label: metroEarlier.period,
      value: metroEarlier.operationalNetworkKm,
    },
    end: {
      label: metroLatest.period,
      value: metroLatest.operationalNetworkKm,
    },
    unit: "km",
    growthLabel: `+${indianFormatter.format(
      metroLatest.operationalNetworkKm - metroEarlier.operationalNetworkKm,
    )} km`,
    deltaTone: "positive",
    summary: "Operational metro network",
  },
  {
    id: "household-electrification",
    title: "Households electrified",
    sourceName: ruralElectrification.source,
    sourceUrl: ruralElectrification.sourceUrl,
    sourceBadge: "PIB",
    iconNode: iconByMetricId["household-electrification"],
    kind: "absolute",
    start: {
      label: "Scheme baseline",
      value: 0,
    },
    end: {
      label: "2022",
      value: ruralElectrification.achievements[1].value / 10000000,
    },
    unit: "crore",
    growthLabel: `+${ruralElectrification.achievements[1].displayValue}`,
    deltaTone: "positive",
    summary: "Households electrified under public schemes",
  },
];

const analyticsMetricMap: Record<
  (typeof chartMetricOptions)[number],
  {
    unit: string;
    source: string;
    start: number;
    latest: number;
    periods: { label: string; value: number; fill: string }[];
  }
> = {
  Poverty: {
    unit: "% rate",
    source: "PIB / World Bank",
    start: 16.2,
    latest: 2.3,
    periods: [
      { label: "2011-12", value: 16.2, fill: "#dc2626" },
      { label: "2022-23", value: 2.3, fill: "#0f766e" },
    ],
  },
  Employment: {
    unit: "crore jobs",
    source: "RBI KLEMS / PIB",
    start: employmentWorkforce.keyMetrics.totalEmploymentAdded.earlier.valueCrore,
    latest: employmentWorkforce.keyMetrics.totalEmploymentAdded.later.valueCrore,
    periods: [
      { label: "2004-2014", value: 2.9, fill: "#0f766e" },
      { label: "2014-2024", value: 17.2, fill: "#ff9933" },
    ],
  },
  Housing: {
    unit: "lakh houses",
    source: "PIB",
    start: 8.04,
    latest: 88.32,
    periods: [
      { label: "2004-2014", value: 8.04, fill: "#0f766e" },
      { label: "2015-2024", value: 88.32, fill: "#ff9933" },
    ],
  },
  Water: {
    unit: "crore households",
    source: "PIB / JJM",
    start: 3.23,
    latest: 15.44,
    periods: [
      { label: "Launch", value: 3.23, fill: "#0f766e" },
      { label: "2025", value: 15.44, fill: "#ff9933" },
    ],
  },
  Roads: {
    unit: "km",
    source: "PMGSY / OMMAS",
    start: 335670,
    latest: 409259,
    periods: [
      { label: "2004-2014", value: 335670, fill: "#0f766e" },
      { label: "2014-2026", value: 409259, fill: "#ff9933" },
    ],
  },
  Railways: {
    unit: "RKM",
    source: "Indian Railways / CORE",
    start: 14985,
    latest: 25871,
    periods: [
      { label: "2004-2014", value: 14985, fill: "#0f766e" },
      { label: "2014-2023", value: 25871, fill: "#ff9933" },
    ],
  },
};

const rankingData = [
  { label: "Tap Water", value: 79.74, note: "coverage index" },
  { label: "Metro Expansion", value: 78, note: "network expansion" },
  { label: "Electrification", value: 88, note: "household access" },
  { label: "Rural Roads", value: 92, note: "completed length" },
  { label: "Housing", value: 82, note: "completed homes" },
];

function KpiCard({
  metric,
  index,
  isHydrated,
}: {
  metric: KpiMetric;
  index: number;
  isHydrated: boolean;
}) {
  const chartData = [
    { label: metric.start.label, value: metric.start.value, fill: "#0f766e" },
    {
      label: metric.end.label,
      value: metric.end.value,
      fill: metric.deltaTone === "reduction" ? "#ff9933" : "#ff9933",
    },
  ];
  const maxValue = Math.max(metric.start.value, metric.end.value, 1);
  const formatMetricValue = (value: number) =>
    `${indianFormatter.format(value)}${metric.unit === "%" ? "%" : ` ${metric.unit}`}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.28 }}
      className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-white">
              {metric.iconNode}
            </div>
            <p className="truncate text-sm font-bold text-slate-900">
              {metric.title}
            </p>
          </div>
          <p className="mt-1 truncate text-xs text-slate-500">
            {metric.summary}
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-slate-600">
          {metric.sourceBadge}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-slate-50 px-2 py-1.5">
          <p className="font-semibold text-slate-500">{metric.start.label}</p>
          <p className="mt-0.5 font-black text-slate-900">
            {formatMetricValue(metric.start.value)}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 px-2 py-1.5">
          <p className="font-semibold text-slate-500">{metric.end.label}</p>
          <p className="mt-0.5 font-black text-slate-900">
            {formatMetricValue(metric.end.value)}
          </p>
        </div>
      </div>

      <div className={metric.kind === "percent" ? "mt-3 h-20 min-w-0" : "mt-3 h-16 min-w-0"}>
        {isHydrated ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            {metric.kind === "percent" ? (
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
              >
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis
                  dataKey="label"
                  type="category"
                  tick={{ fontSize: 11, fill: "#475569", fontWeight: 700 }}
                  width={58}
                />
                <Tooltip
                  formatter={(value) => [
                    `${indianFormatter.format(Number(value))}%`,
                    metric.title,
                  ]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={KPI_HORIZONTAL_BAR_SIZE}>
                  {chartData.map((entry) => (
                    <Cell key={entry.label} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 2, bottom: 0, left: 2 }}
              >
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "#475569", fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
                <YAxis hide domain={[0, maxValue]} />
                <Tooltip
                  formatter={(value) => [
                    formatMetricValue(Number(value)),
                    metric.title,
                  ]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={KPI_VERTICAL_BAR_SIZE}>
                  {chartData.map((entry) => (
                    <Cell key={entry.label} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-lg bg-slate-50" />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-2">
        <span
          className={`text-xs font-black ${
            metric.deltaTone === "reduction" ? "text-red-700" : "text-emerald-700"
          }`}
        >
          {metric.growthLabel}
        </span>
        <a
          href={metric.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-slate-500 hover:text-slate-950 hover:underline"
        >
          Source
        </a>
      </div>
    </motion.article>
  );
}

function CompactCategoryCard({
  category,
  onSelect,
  isHydrated,
}: {
  category: CategorySummary;
  onSelect: (id: string) => void;
  isHydrated: boolean;
}) {
  const rows = rowsForCategory(category.id);
  const chartRows = rows
    .map((row) => ({
      label: row.metric,
      before: numericValue(row.manmohanValue) ?? 0,
      after: numericValue(row.modiValue) ?? 0,
      unit: row.unit,
    }))
    .filter((row) => row.before > 0 || row.after > 0)
    .slice(0, 3);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-900">
          {category.icon}
        </div>
        <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-bold text-white">
          {category.metricCount} metrics
        </span>
      </div>
      <h3 className="mt-3 text-base font-bold text-slate-950">
        {category.shortTitle ?? category.title}
      </h3>
      <div className="mt-3 grid gap-2">
        <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700">
          <span className="font-bold text-slate-950">
            {category.headlineMetric.label}:
          </span>{" "}
          {category.headlineMetric.after}
        </p>
        {rows.slice(0, 2).map((row) => (
          <p key={row.metric} className="truncate text-xs text-slate-500">
            {row.metric}: <span className="font-semibold text-slate-700">{row.modiValue} {row.unit}</span>
          </p>
        ))}
      </div>
      <div className="mt-3 h-28 min-w-0">
        {isHydrated ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart
              data={chartRows.length ? chartRows : [{ label: "Data", before: 0, after: 1, unit: "" }]}
              barCategoryGap={10}
              margin={{ top: 6, right: 4, bottom: 0, left: -18 }}
            >
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 9, fill: "#64748b", fontWeight: 700 }}
                tickFormatter={(value: string) =>
                  value.length > 12 ? `${value.slice(0, 12)}...` : value
                }
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#64748b", fontWeight: 700 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                tickFormatter={(value: number) =>
                  value >= 100000
                    ? `${indianFormatter.format(value / 100000)}L`
                    : indianFormatter.format(value)
                }
                width={40}
              />
              <Tooltip
                formatter={(value, name, item) => {
                  const payload =
                    item && typeof item === "object" && "payload" in item
                      ? (item.payload as { unit?: string })
                      : {};
                  return [
                    `${indianFormatter.format(Number(value))}${payload.unit ? ` ${payload.unit}` : ""}`,
                    name === "before" ? "Before" : "After",
                  ];
                }}
                labelFormatter={(label) => String(label)}
              />
              <Bar
                dataKey="before"
                fill="#0f766e"
                radius={[4, 4, 0, 0]}
                barSize={CATEGORY_MINI_BAR_SIZE}
              />
              <Bar
                dataKey="after"
                fill="#ff9933"
                radius={[4, 4, 0, 0]}
                barSize={CATEGORY_MINI_BAR_SIZE}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-xl bg-slate-50" />
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500">
          {category.sourceLabels.length} sources
        </span>
        <button
          type="button"
          onClick={() => onSelect(category.id)}
          className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

function DashboardShell({
  onSelectCategory,
}: {
  onSelectCategory: (id: string) => void;
}) {
  const isHydrated = useHydrated();
  const [selectedMetric, setSelectedMetric] =
    useState<(typeof chartMetricOptions)[number]>("Poverty");
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("Full Timeline");
  const [categoryFilter, setCategoryFilter] = useState<FilterValue>("All");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All");
  const [query, setQuery] = useState("");

  const totalSources = new Set(categories.flatMap((category) => category.sourceLabels)).size;
  const selectedAnalytics = analyticsMetricMap[selectedMetric];
  const lineData = lineDataForMetric(selectedMetric);

  const filteredCategories = useMemo(
    () =>
      categories.filter(
        (category) =>
          (categoryFilter === "All" || categoryGroup(category.id) === categoryFilter) &&
          categoryMatchesSource(category, sourceFilter) &&
          categoryMatchesPeriod(category, periodFilter) &&
          categoryMatchesSearch(category, query),
      ),
    [categoryFilter, periodFilter, query, sourceFilter],
  );

  return (
    <main className="bg-slate-100">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-5">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-100">
                <Gauge className="size-3.5" />
                Nation Building Index
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-normal sm:text-5xl">
                India&apos;s development dashboard.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Dense, source-backed indicators across infrastructure, welfare,
                employment, education, energy, and public services.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Metrics", comparisonData.length],
                ["Categories", categories.length],
                ["Sources", totalSources],
                ["Timeline", "2004-2025"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4">
        <section aria-labelledby="national-kpi-heading">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                National KPI Dashboard
              </p>
              <h2 id="national-kpi-heading" className="text-xl font-black text-slate-950">
                Key indicators above the fold
              </h2>
            </div>
            <Link
              href="/sources/"
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex"
            >
              View Sources
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {kpiMetrics.map((metric, index) => (
              <KpiCard
                key={metric.id}
                metric={metric}
                index={index}
                isHydrated={isHydrated}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.75fr_0.7fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-700">
                  <LineChartIcon className="size-4" />
                  Progress Over Time
                </p>
                <h2 className="mt-1 text-lg font-black text-slate-950">
                  Selected metric trajectory
                </h2>
              </div>
              <select
                value={selectedMetric}
                onChange={(event) =>
                  setSelectedMetric(event.target.value as (typeof chartMetricOptions)[number])
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                {chartMetricOptions.map((metric) => (
                  <option key={metric}>{metric}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 h-72 min-w-0">
              {isHydrated ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={lineData}>
                    <defs>
                      <linearGradient id="progressArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0f766e" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#0f766e" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} width={52} />
                    <Tooltip
                      formatter={(value) => [
                        `${indianFormatter.format(Number(value))} ${selectedAnalytics.unit}`,
                        selectedMetric,
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0f766e"
                      strokeWidth={3}
                      fill="url(#progressArea)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-xl bg-slate-50" />
              )}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Annual line is an endpoint-indexed visual path where exact
              year-wise source values are not available. Period widgets below
              show the source-backed comparison points.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-700">
              <BarChart3 className="size-4" />
              Period Comparison
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">
              {selectedMetric}
            </h2>
            <div className="mt-4 h-72 min-w-0">
              {isHydrated ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={selectedAnalytics.periods} barCategoryGap={24}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                    <YAxis hide />
                    <Tooltip
                      formatter={(value) => [
                        `${indianFormatter.format(Number(value))} ${selectedAnalytics.unit}`,
                        selectedMetric,
                      ]}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={PERIOD_BAR_SIZE}>
                      {selectedAnalytics.periods.map((entry) => (
                        <Cell key={entry.label} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-xl bg-slate-50" />
              )}
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Source: {selectedAnalytics.source}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-700">
              <Database className="size-4" />
              Source Coverage
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Datasets", comparisonData.length],
                ["Sources", totalSources],
                ["Categories", categories.length],
                ["Updated", "2026"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">{label}</p>
                  <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Trust layer
              </p>
              <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-teal-700" /> Source linked</span>
                <span className="flex items-center gap-2"><FileSearch className="size-4 text-teal-700" /> Raw evidence preserved</span>
                <span className="flex items-center gap-2"><BookOpenCheck className="size-4 text-teal-700" /> Methodology available</span>
              </div>
            </div>
          </article>
        </section>

        <section id="category-dashboard" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-700">
                <Filter className="size-4" />
                Data Explorer
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                Category Analytics Grid
              </h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:w-[760px]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </label>
              <select value={periodFilter} onChange={(event) => setPeriodFilter(event.target.value as PeriodFilter)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600">
                {periodFilters.map((filter) => <option key={filter}>{filter}</option>)}
              </select>
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value as FilterValue)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600">
                {dashboardCategoryFilters.map((filter) => <option key={filter}>{filter}</option>)}
              </select>
              <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value as SourceFilter)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600">
                {sourceFilters.map((filter) => <option key={filter}>{filter}</option>)}
              </select>
            </div>
          </div>
          {filteredCategories.length > 0 ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredCategories.map((category) => (
                <CompactCategoryCard
                  key={category.id}
                  category={category}
                  onSelect={onSelectCategory}
                  isHydrated={isHydrated}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-600">
              No matching category found.
            </div>
          )}
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
              Progress Rankings
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950">
              Most improved indicators
            </h2>
            <div className="mt-4 grid gap-3">
              {rankingData.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs font-semibold text-slate-500">{item.note}</p>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-teal-700" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                  <p className="text-sm font-black text-slate-950">{item.value}%</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-200">
              Sources & Methodology
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                ["Datasets", comparisonData.length],
                ["Sources", totalSources],
                ["Categories", categories.length],
                ["Last Updated", "Jun 2026"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/10 p-3">
                  <p className="text-xs font-semibold text-slate-300">{label}</p>
                  <p className="mt-1 text-xl font-black">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
              Homepage charts are designed for rapid discovery. Category detail
              pages keep the source links, local evidence snapshots, and
              methodology notes for auditability.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/sources/" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 hover:bg-slate-100">
                View Sources
              </Link>
              <Link href="/methodology/" className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10">
                Methodology
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export function NBIHomeDashboard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    function syncCategoryFromLocation() {
      setSelectedId(getCategoryFromLocation());
    }

    syncCategoryFromLocation();
    window.addEventListener("hashchange", syncCategoryFromLocation);

    return () => window.removeEventListener("hashchange", syncCategoryFromLocation);
  }, []);

  const selectedCategory = selectedId
    ? categories.find((category) => category.id === selectedId)
    : undefined;
  const selectedRows = selectedCategory
    ? rowsForCategory(selectedCategory.id)
    : [];

  function selectCategory(categoryId: string) {
    setSelectedId(categoryId);
    window.history.replaceState(null, "", `#${categoryId}`);
    window.requestAnimationFrame(() => {
      document.getElementById("category-dashboard")?.scrollIntoView({
        block: "start",
      });
    });
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

  if (selectedCategory) {
    return (
      <CategoryDetail
        category={selectedCategory}
        rows={selectedRows}
        onBack={showOverview}
        onNext={() => selectOffsetCategory(1)}
        onPrevious={() => selectOffsetCategory(-1)}
      />
    );
  }

  return <DashboardShell onSelectCategory={selectCategory} />;
}
