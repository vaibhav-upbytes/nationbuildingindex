import type { Metadata } from "next";
import { DirectIncomeTaxSection } from "@/components/DirectIncomeTaxSection";
import { directIncomeTax } from "@/data/directIncomeTax";

export const metadata: Metadata = {
  title: directIncomeTax.seo.title,
  description: directIncomeTax.seo.description,
  keywords: directIncomeTax.seo.keywords,
};

export default function DirectIncomeTaxPage() {
  return <DirectIncomeTaxSection />;
}
