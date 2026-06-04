import type { Metadata } from "next";
import { EducationDevelopmentSection } from "@/components/EducationDevelopmentSection";
import { educationDevelopment } from "@/data/educationDevelopment";

export const metadata: Metadata = {
  title: educationDevelopment.seo.title,
  description: educationDevelopment.seo.description,
  keywords: educationDevelopment.seo.keywords,
};

export default function EducationDevelopmentPage() {
  return <EducationDevelopmentSection />;
}
