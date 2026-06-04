import { directIncomeTax } from "@/data/directIncomeTax";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatCurrency(value: number) {
  if (value >= 100000) {
    return `₹${currencyFormatter.format(value / 100000)} lakh`;
  }

  return `₹${currencyFormatter.format(value)}`;
}

function formatPercent(value: number) {
  return `${currencyFormatter.format(value)}%`;
}

function SummaryCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
    </article>
  );
}

function BarChart({
  title,
  rows,
}: {
  title: string;
  rows: {
    label: string;
    value: number;
    display: string;
    after2014?: boolean;
    warning?: boolean;
  }[];
}) {
  const maxValue = Math.max(...rows.map((row) => row.value));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((row) => {
          const width = maxValue > 0 ? `${(row.value / maxValue) * 100}%` : "0%";
          const color = row.warning
            ? "bg-red-600"
            : row.after2014
              ? "bg-[#ff9933]"
              : "bg-teal-700";

          return (
            <div key={`${title}-${row.label}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{row.label}</span>
                <span className="font-semibold text-slate-950">
                  {row.display}
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${color}`}
                  style={{ width }}
                  aria-label={`${row.label}: ${row.display}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TaxRulesCard({
  period,
}: {
  period: (typeof directIncomeTax.comparison)[number];
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">
            {period.period}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {period.government}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            period.period === "FY 2025-26"
              ? "bg-orange-100 text-orange-800"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {formatPercent(period.effectiveTaxRate)}
        </span>
      </div>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-slate-500">Tax paid</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {formatCurrency(period.taxPaid)}
          </dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-slate-500">Take home</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {formatCurrency(period.takeHomeIncome)}
          </dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-slate-500">Gross salary</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {formatCurrency(period.grossSalary)}
          </dd>
        </div>
      </dl>
      <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
        {period.rules.map((rule) => (
          <li key={`${period.period}-${rule}`} className="rounded-md bg-slate-50 px-3 py-2">
            {rule}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function DirectIncomeTaxSection() {
  const data = directIncomeTax;
  const [fy2014, fy2026] = data.comparison;
  const rateDifference = fy2014.effectiveTaxRate - fy2026.effectiveTaxRate;
  const taxRows = data.comparison.map((item) => ({
    label: item.period,
    value: item.taxPaid,
    display: `${formatCurrency(item.taxPaid)} (${item.government})`,
    after2014: item.period === "FY 2025-26",
    warning: item.period === "FY 2013-14",
  }));
  const takeHomeRows = data.comparison.map((item) => ({
    label: item.period,
    value: item.takeHomeIncome,
    display: `${formatCurrency(item.takeHomeIncome)} (${item.government})`,
    after2014: item.period === "FY 2025-26",
  }));
  const rateRows = data.comparison.map((item) => ({
    label: item.period,
    value: item.effectiveTaxRate,
    display: `${formatPercent(item.effectiveTaxRate)} (${item.government})`,
    after2014: item.period === "FY 2025-26",
    warning: item.period === "FY 2013-14",
  }));

  return (
    <section id="direct-income-tax" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Direct Income Tax
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            This simplified comparison uses a salaried employee earning ₹20 lakh
            per year with no tax planning deductions, so the visible comparison
            is limited to tax paid, effective rate, and take-home income.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <SummaryCard
            label="Annual salary"
            value={formatCurrency(data.scenario.salary)}
            note="Pure salary income scenario"
          />
          <SummaryCard
            label="Tax paid FY2013-14"
            value={formatCurrency(fy2014.taxPaid)}
            note={formatPercent(fy2014.effectiveTaxRate)}
          />
          <SummaryCard
            label="Tax paid FY2025-26"
            value={formatCurrency(fy2026.taxPaid)}
            note={formatPercent(fy2026.effectiveTaxRate)}
          />
          <SummaryCard
            label="Annual tax saving"
            value={formatCurrency(data.benefit.annualTaxSaving)}
            note={`${formatPercent(data.benefit.reductionPercent)} reduction`}
          />
          <SummaryCard
            label="Effective rate difference"
            value={formatPercent(rateDifference)}
            note={`${formatPercent(fy2014.effectiveTaxRate)} to ${formatPercent(
              fy2026.effectiveTaxRate,
            )}`}
          />
          <SummaryCard
            label="Additional take home"
            value={formatCurrency(data.benefit.additionalTakeHomeIncome)}
            note="Annual increase in this scenario"
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {data.comparison.map((period) => (
            <TaxRulesCard key={period.period} period={period} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <BarChart title="Tax Paid Comparison" rows={taxRows} />
          <BarChart title="Take Home Salary Comparison" rows={takeHomeRows} />
          <BarChart title="Effective Tax Rate" rows={rateRows} />
        </div>

        <section className="mt-8 rounded-lg border border-orange-200 bg-orange-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">
            What Changed for a ₹20 LPA Salaried Employee?
          </h3>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
            <p className="rounded-md bg-white px-3 py-2 shadow-sm">
              Lower tax burden
            </p>
            <p className="rounded-md bg-white px-3 py-2 shadow-sm">
              Higher take-home salary
            </p>
            <p className="rounded-md bg-white px-3 py-2 shadow-sm">
              Lower effective tax rate
            </p>
            <p className="rounded-md bg-white px-3 py-2 shadow-sm">
              Approximate annual saving of ₹1.68 lakh
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Scenario Assumptions
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {data.scenario.description}
          </p>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
            {data.scenario.assumptions.map((assumption) => (
              <li key={assumption} className="rounded-md bg-slate-50 px-3 py-2">
                {assumption}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 text-sm font-medium text-slate-600">
          <p>Sources: {data.source}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {data.sourceReferences.map((source) => (
              <li key={source.label}>
                <a
                  href={source.url}
                  className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
