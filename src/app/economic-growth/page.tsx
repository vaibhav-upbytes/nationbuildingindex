import type { Metadata } from "next";
import { EconomicGrowthSection } from "@/components/EconomicGrowthSection";
import { economicGrowth } from "@/data/economicGrowth";

export const metadata: Metadata = {
  title: economicGrowth.seo.title,
  description: economicGrowth.seo.description,
  keywords: economicGrowth.seo.keywords,
};

export default function EconomicGrowthPage() {
  return <EconomicGrowthSection />;
}
