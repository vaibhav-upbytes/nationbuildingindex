import type { ComparisonRow } from "@/data/comparison-data";

type ComparisonTableProps = {
  rows: ComparisonRow[];
};

export function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-[960px] divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-100 text-xs uppercase text-slate-600">
          <tr>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Metric</th>
            <th className="px-4 py-3">2004–2014</th>
            <th className="px-4 py-3">2014–Present</th>
            <th className="px-4 py-3">Unit</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Source note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {rows.map((row) => (
            <tr key={row.category} className="align-top">
              <td className="px-4 py-4 font-semibold text-slate-950">
                {row.category}
              </td>
              <td className="px-4 py-4">{row.metric}</td>
              <td className="px-4 py-4">
                <span className="block text-xs text-slate-500">
                  {row.manmohanPeriod}
                </span>
                {row.manmohanValue}
              </td>
              <td className="px-4 py-4">
                <span className="block text-xs text-slate-500">
                  {row.modiPeriod}
                </span>
                {row.modiValue}
              </td>
              <td className="px-4 py-4">{row.unit}</td>
              <td className="px-4 py-4">
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-4">{row.sourceNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
