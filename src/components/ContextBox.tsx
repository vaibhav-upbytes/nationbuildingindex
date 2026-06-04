import type { ReactNode } from "react";

type ContextBoxProps = {
  title?: string;
  children: ReactNode;
};

export function ContextBox({ title = "Context", children }: ContextBoxProps) {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-slate-700">{children}</div>
    </section>
  );
}
