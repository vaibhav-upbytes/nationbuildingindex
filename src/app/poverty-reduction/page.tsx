import type { Metadata } from "next";
import { PovertyReductionSection } from "@/components/PovertyReductionSection";
import { povertyReduction } from "@/data/povertyReduction";

export const metadata: Metadata = {
  title: povertyReduction.seo.title,
  description: povertyReduction.seo.description,
  keywords: povertyReduction.seo.keywords,
};

export default function PovertyReductionPage() {
  return <PovertyReductionSection />;
}
