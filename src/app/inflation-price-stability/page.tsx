import type { Metadata } from "next";
import { InflationStabilitySection } from "@/components/InflationStabilitySection";
import { inflationStability } from "@/data/inflationStability";

export const metadata: Metadata = {
  title: inflationStability.seo.title,
  description: inflationStability.seo.description,
  keywords: inflationStability.seo.keywords,
};

export default function InflationPriceStabilityPage() {
  return <InflationStabilitySection />;
}
