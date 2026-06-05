import type { Metadata } from "next";
import { MethodologySection } from "@/components/MethodologySection";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How Nation Building Index compares completed work and measurable outcomes using source-backed claims.",
};

export default function MethodologyPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Methodology
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Measuring outcomes, not political claims
        </h1>
        <p className="mt-5 leading-7 text-slate-700">
          This project compares completed work and measurable outcomes. It does
          not compare government spending or political claims.
        </p>
        <p className="mt-4 leading-7 text-slate-700">
          Each category should use comparable metrics across the Manmohan Singh
          government period of 2004–2014 and the Narendra Modi government period
          of 2014–Present. Any claim should be added only after the number is
          backed by a clearly cited official source.
        </p>
      </div>
      <div className="mt-10">
        <MethodologySection />
      </div>
    </section>
  );
}
