import type { Metadata } from "next";
import { EmploymentWorkforceSection } from "@/components/EmploymentWorkforceSection";
import { employmentWorkforce } from "@/data/employmentWorkforce";

export const metadata: Metadata = {
  title: employmentWorkforce.seo.title,
  description: employmentWorkforce.seo.description,
  keywords: employmentWorkforce.seo.keywords,
};

export default function EmploymentWorkforcePage() {
  return <EmploymentWorkforceSection />;
}
