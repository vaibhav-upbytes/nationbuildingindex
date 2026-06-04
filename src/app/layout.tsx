import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NamoVsMMS | Modi Government vs Manmohan Singh Government",
    template: "%s | NamoVsMMS",
  },
  description:
    "A neutral, static comparison of completed work and measurable outcomes from the Manmohan Singh and Narendra Modi governments.",
  keywords: [
    "NamoVsMMS",
    "Narendra Modi government",
    "Manmohan Singh government",
    "India development comparison",
    "public datasets",
    "highway development india",
    "expressway growth india",
    "bharatmala project",
    "national highways comparison",
    "road infrastructure india",
    "expressway network india",
    "education development india",
    "higher education institutions india",
    "universities growth india",
    "PM SHRI schools",
    "india gdp comparison",
    "india economic growth",
    "exports growth india",
    "services sector india",
    "india inflation comparison",
    "retail inflation india",
    "CPI inflation india",
    "food inflation india",
    "direct income tax comparison",
    "income tax salaried employees India",
    "20 lakh salary tax comparison",
    "new tax regime India",
    "fuel prices India comparison",
    "petrol diesel price Delhi",
    "LPG cylinder price India",
    "USD INR exchange rate",
    "currency movement India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
