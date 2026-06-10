import type { MiscellaneousSourceEvidence } from "@/data/miscellaneous";
import { miscellaneous } from "@/data/miscellaneous";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatPrice(value: number, unit: string) {
  return `₹${formatNumber(value)}${unit.replace("₹", "")}`;
}

function formatChange(value: number, unit: string) {
  const sign = value > 0 ? "+" : "";
  return `${sign}₹${formatNumber(value)}${unit.replace("₹", "")}`;
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

function VerificationEvidence({
  evidence,
}: {
  evidence: MiscellaneousSourceEvidence[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Verification evidence
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          Public fuel and currency source references
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Fuel, LPG and currency indicators are linked directly to public PPAC,
          IndianOil and RBI pages. Screenshots are provided as secondary visual
          evidence for the same public sources.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {evidence.map((item) => (
          <article
            key={`${item.sourceType}-${item.period}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.sourceType} source
                </p>
                <h4 className="mt-2 text-base font-semibold text-slate-950">
                  {item.label}
                </h4>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Public source
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-teal-700">
              {item.period}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Source URL</dt>
                <dd className="mt-1 break-all font-medium text-slate-950">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 underline underline-offset-2 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                  >
                    {item.sourceUrl}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold !text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                Open public source
              </a>
              <a
                href={item.imagePath}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              >
                View screenshot
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MiscellaneousSection() {
  const data = miscellaneous;
  const { petrol, diesel, lpg } = data.fuelPrices;
  const [petrolPre2014, petrolPost2014] = petrol.data;
  const [dieselPre2014, dieselPost2014] = diesel.data;
  const [lpgPre2014, lpgPost2014] = lpg.data;
  const [currencyPre2014, currencyPost2014] = data.currency.data;
  const tableRows = [
    {
      metric: "Petrol",
      value2004: formatPrice(petrolPre2014.startPrice, petrol.unit),
      value2014: formatPrice(petrolPre2014.endPrice, petrol.unit),
      value2025: formatPrice(petrolPost2014.endPrice, petrol.unit),
      changePre2014: formatChange(petrolPre2014.increase, petrol.unit),
      changePost2014: formatChange(petrolPost2014.increase, petrol.unit),
      unit: petrol.unit,
      notes: `${petrolPre2014.note} ${petrolPost2014.note}`,
    },
    {
      metric: "Diesel",
      value2004: `${formatPrice(dieselPre2014.startPrice, diesel.unit)} approx`,
      value2014: formatPrice(dieselPre2014.endPrice, diesel.unit),
      value2025: formatPrice(dieselPost2014.endPrice, diesel.unit),
      changePre2014: `${formatChange(dieselPre2014.increase, diesel.unit)} approx`,
      changePost2014: formatChange(dieselPost2014.increase, diesel.unit),
      unit: diesel.unit,
      notes: `${dieselPre2014.note} ${dieselPost2014.note}`,
    },
    {
      metric: "Domestic LPG",
      value2004: `${formatPrice(lpgPre2014.startPrice, lpg.unit)} approx`,
      value2014: formatPrice(lpgPre2014.endPrice, lpg.unit),
      value2025: formatPrice(lpgPost2014.endPrice, lpg.unit),
      changePre2014: `${formatChange(lpgPre2014.increase, lpg.unit)} approx`,
      changePost2014: formatChange(lpgPost2014.increase, lpg.unit),
      unit: lpg.unit,
      notes: `${lpg.comparisonType}. ${lpgPre2014.note} ${lpgPost2014.note}`,
    },
    {
      metric: "USD-INR exchange rate",
      value2004: formatPrice(currencyPre2014.startRate, data.currency.unit),
      value2014: formatPrice(currencyPre2014.endRate, data.currency.unit),
      value2025: formatPrice(currencyPost2014.endRate, data.currency.unit),
      changePre2014: formatChange(
        currencyPre2014.depreciation,
        data.currency.unit,
      ),
      changePost2014: formatChange(
        currencyPost2014.depreciation,
        data.currency.unit,
      ),
      unit: data.currency.unit,
      notes: data.currency.note,
    },
  ];

  return (
    <section id="miscellaneous" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Miscellaneous
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {data.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">{data.note}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Petrol price movement"
            value={formatChange(petrolPost2014.increase, petrol.unit)}
            note="2014–2025 Delhi benchmark"
          />
          <SummaryCard
            label="Diesel price movement"
            value={formatChange(dieselPost2014.increase, diesel.unit)}
            note="2014–2025 Delhi benchmark"
          />
          <SummaryCard
            label="LPG cylinder price movement"
            value={formatChange(lpgPost2014.increase, lpg.unit)}
            note="2014–2025 non-subsidised 14.2 kg"
          />
          <SummaryCard
            label="USD-INR movement"
            value={formatChange(
              currencyPost2014.depreciation,
              data.currency.unit,
            )}
            note="2014–2025 endpoint movement"
          />
        </div>

        <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">
            Important Context
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {data.context}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {data.lpgDisclaimer}
          </p>
        </section>

        <section className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  {[
                    "Metric",
                    "2004 value",
                    "2014 value",
                    "2025 value",
                    "Change 2004–2014",
                    "Change 2014–2025",
                    "Unit",
                    "Notes",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableRows.map((row) => (
                  <tr key={row.metric}>
                    <td className="px-4 py-3 font-semibold text-slate-950">
                      {row.metric}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.value2004}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.value2014}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.value2025}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.changePre2014}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.changePost2014}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.unit}</td>
                    <td className="max-w-md px-4 py-3 leading-6 text-slate-600">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8">
          <VerificationEvidence evidence={data.verificationEvidence} />
        </div>

        <div className="mt-6 text-sm font-medium text-slate-600">
          <p>Sources</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {data.sources.map((source) => (
              <li key={source.label}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
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
