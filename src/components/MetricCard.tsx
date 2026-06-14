"use client";

import { AnimatedCounter } from "@/components/AnimatedCounter";
import type { NationalDashboardMetric } from "@/data/nationalDashboardMetrics";

const accentStyles: Record<
  NationalDashboardMetric["accentColor"],
  {
    ring: string;
    icon: string;
    bar: string;
    pill: string;
  }
> = {
  saffron: {
    ring: "hover:border-orange-300",
    icon: "bg-orange-50 text-orange-700 ring-orange-100",
    bar: "bg-[#ff9933]",
    pill: "bg-orange-50 text-orange-800",
  },
  green: {
    ring: "hover:border-emerald-300",
    icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    bar: "bg-emerald-600",
    pill: "bg-emerald-50 text-emerald-800",
  },
  blue: {
    ring: "hover:border-sky-300",
    icon: "bg-sky-50 text-sky-700 ring-sky-100",
    bar: "bg-sky-600",
    pill: "bg-sky-50 text-sky-800",
  },
  slate: {
    ring: "hover:border-slate-300",
    icon: "bg-slate-100 text-slate-800 ring-slate-200",
    bar: "bg-slate-700",
    pill: "bg-slate-100 text-slate-700",
  },
};

function scaledValue(metric: NationalDashboardMetric) {
  if (metric.valueScale === "crore") {
    return metric.value / 10000000;
  }

  if (metric.valueScale === "lakh") {
    return metric.value / 100000;
  }

  if (metric.valueScale === "million") {
    return metric.value / 1000000;
  }

  return metric.value;
}

export function MetricCard({
  metric,
  isVisible,
  index,
}: {
  metric: NationalDashboardMetric;
  isVisible: boolean;
  index: number;
}) {
  const styles = accentStyles[metric.accentColor];
  const progress = Math.max(8, Math.min(metric.progressPercent, 100));
  const value = scaledValue(metric);
  const useCompact = metric.valueScale === undefined && metric.value >= 1000000;

  return (
    <article
      className={`group flex min-h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none ${styles.ring}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(18px)",
        transitionDelay: `${Math.min(index * 80, 480)}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex size-12 items-center justify-center rounded-lg text-sm font-bold ring-1 ${styles.icon}`}
          aria-hidden="true"
        >
          {metric.icon}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.pill}`}>
          {metric.category}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <h3 className="text-base font-semibold text-slate-950">
          {metric.title}
        </h3>
        <p className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          <AnimatedCounter
            value={value}
            prefix={metric.valuePrefix}
            compact={useCompact}
            isActive={isVisible}
          />
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          {metric.suffix}
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {metric.shortDescription}
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-slate-500">
          <span>{metric.startYear}</span>
          <span>{metric.endYear}</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-slate-100">
          <div
            className={`h-2.5 rounded-full ${styles.bar}`}
            style={{ width: isVisible ? `${progress}%` : "0%" }}
            aria-hidden="true"
          />
        </div>
      </div>

      <a
        href={metric.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-fit rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 underline-offset-4 hover:border-slate-300 hover:text-slate-950 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
      >
        View source: {metric.sourceName}
      </a>
    </article>
  );
}
