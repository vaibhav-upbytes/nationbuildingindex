"use client";

import { useEffect, useRef, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { nationalDashboardMetrics } from "@/data/nationalDashboardMetrics";

export function AnimatedNationalDashboard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-50" aria-labelledby="national-dashboard-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            National Development Dashboard
          </p>
          <h2
            id="national-dashboard-heading"
            className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl"
          >
            India&apos;s Progress at a Glance
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
            A quick view of measurable progress across infrastructure, welfare,
            connectivity, and human development indicators.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {nationalDashboardMetrics.map((metric, index) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-600">
          All numbers are backed by public sources. Open any category to view
          methodology and source documents.
        </p>
      </div>
    </section>
  );
}
