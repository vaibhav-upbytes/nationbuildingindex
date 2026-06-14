"use client";

import { useEffect, useMemo, useState } from "react";

const indianFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatValue(value: number, compact: boolean) {
  if (!compact) {
    return indianFormatter.format(value);
  }

  if (Math.abs(value) >= 10000000) {
    return `${indianFormatter.format(value / 10000000)}Cr`;
  }

  if (Math.abs(value) >= 100000) {
    return `${indianFormatter.format(value / 100000)}L`;
  }

  if (Math.abs(value) >= 1000) {
    return `${indianFormatter.format(value / 1000)}K`;
  }

  return indianFormatter.format(value);
}

export function AnimatedCounter({
  value,
  prefix = "",
  compact = false,
  isActive = true,
  durationMs = 1800,
}: {
  value: number;
  prefix?: string;
  compact?: boolean;
  isActive?: boolean;
  durationMs?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [durationMs, isActive, prefersReducedMotion, value]);

  return <span>{prefix}{formatValue(displayValue, compact)}</span>;
}
