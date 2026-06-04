import type { Metadata } from "next";
import { HighwayExpresswayDevelopmentSection } from "@/components/HighwayExpresswayDevelopmentSection";
import { highwayExpresswayDevelopment } from "@/data/highwayExpresswayDevelopment";

export const metadata: Metadata = {
  title: "Highway & Expressway Development in India (2014–2025)",
  description:
    "Compare National Highway expansion, expressway construction, Bharatmala progress, North-East road connectivity, and highway infrastructure growth in India.",
  keywords: highwayExpresswayDevelopment.seo.keywords,
};

export default function HighwayExpresswayDevelopmentPage() {
  return <HighwayExpresswayDevelopmentSection />;
}
