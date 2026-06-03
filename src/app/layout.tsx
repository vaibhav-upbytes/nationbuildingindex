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
