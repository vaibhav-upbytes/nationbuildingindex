import type { Metadata } from "next";
import { NBIHomeDashboard } from "@/components/NBIHomeDashboard";

export const metadata: Metadata = {
  title: "Nation Building Index – Compare Development Outcomes Through Data",
  description:
    "Nation Building Index helps citizens compare governance outcomes across infrastructure, economy, education, energy, taxation, inflation and public services using official data sources and long-term development trends.",
};

export default function HomePage() {
  return <NBIHomeDashboard />;
}
