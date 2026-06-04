import type { Metadata } from "next";
import { MiscellaneousSection } from "@/components/MiscellaneousSection";
import { miscellaneous } from "@/data/miscellaneous";

export const metadata: Metadata = {
  title: miscellaneous.seo.title,
  description: miscellaneous.seo.description,
  keywords: miscellaneous.seo.keywords,
};

export default function MiscellaneousFuelCurrencyPage() {
  return <MiscellaneousSection />;
}
