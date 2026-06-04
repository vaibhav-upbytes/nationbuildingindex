import { powerElectricity } from "@/data/powerElectricity";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      {note ? <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p> : null}
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
    tone?: "good" | "bad";
    after2014?: boolean;
  }[];
}) {
  const maxValue = Math.max(...rows.map((row) => Math.abs(row.value)));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((row) => {
          const width =
            maxValue > 0 ? `${(Math.abs(row.value) / maxValue) * 100}%` : "0%";
          const color =
            row.after2014
              ? "bg-[#ff9933]"
              : row.tone === "bad" || row.value < 0
                ? "bg-rose-600"
                : "bg-teal-700";

          return (
            <div key={row.label}>
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

function CapacityAdditionChart() {
  const { capacityAddition } = powerElectricity;
  const rows = [
    {
      label: "Total",
      value: capacityAddition.totalAddedMw,
      display: `${formatNumber(capacityAddition.totalAddedMw)} MW`,
      after2014: true,
    },
    {
      label: "Renewable",
      value: capacityAddition.renewableAddedMw,
      display: `${formatNumber(capacityAddition.renewableAddedMw)} MW`,
      after2014: true,
    },
    {
      label: "Solar",
      value: capacityAddition.solarAddedMw,
      display: `${formatNumber(capacityAddition.solarAddedMw)} MW`,
      after2014: true,
    },
    {
      label: "Wind",
      value: capacityAddition.windAddedMw,
      display: `${formatNumber(capacityAddition.windAddedMw)} MW`,
      after2014: true,
    },
  ];

  return (
    <BarChart
      title={`${capacityAddition.title}: ${capacityAddition.period}`}
      rows={rows}
    />
  );
}

export function PowerElectricitySection() {
  const shortageRows = powerElectricity.powerShortage.data.map((item, index) => ({
    label: item.year,
    value: item.value,
    display: `${formatNumber(item.value)}%${"note" in item ? ` (${item.note})` : ""}`,
    tone: item.value > 1 ? ("bad" as const) : ("good" as const),
    after2014: index > 0,
  }));
  const supplyRows = powerElectricity.dailySupply.data.flatMap((item) => [
    {
      label: `${item.area} FY14`,
      value: item.fy14,
      display: `${formatNumber(item.fy14)} hours/day`,
      after2014: false,
    },
    {
      label: `${item.area} FY25`,
      value: item.fy25,
      display: `${formatNumber(item.fy25)} hours/day`,
      after2014: true,
    },
  ]);
  const consumptionRows = powerElectricity.perCapitaConsumption.data.map(
    (item, index) => ({
      label: item.year,
      value: item.value,
      display: `${formatNumber(item.value)} kWh`,
      after2014: index > 0,
    }),
  );
  const solarRows = powerElectricity.renewableEnergy.solarCapacity.map(
    (item, index) => ({
      label: item.year,
      value: item.valueGw,
      display: `${formatNumber(item.valueGw)} GW`,
      after2014: index > 0,
    }),
  );
  const discomProfitRows = powerElectricity.discoms.profitLoss.map((item, index) => ({
    label: item.year,
    value: item.valueCrore,
    display: item.label,
    tone: item.valueCrore < 0 ? ("bad" as const) : ("good" as const),
    after2014: index > 0,
  }));
  const atcRows = powerElectricity.discoms.atcLosses.map((item, index) => ({
    label: item.year,
    value: item.percent,
    display: `${formatNumber(item.percent)}%`,
    tone: item.percent > 20 ? ("bad" as const) : ("good" as const),
    after2014: index > 0,
  }));

  return (
    <section id="power-electricity" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Power & Electricity
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {powerElectricity.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Outcome-focused comparison of power adequacy, access, capacity,
            transmission, renewable energy, and distribution performance.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Power shortage"
            value="4.2% to 0.03%"
            note="FY14 compared with FY 2025–26 till Dec 2025"
          />
          <MetricCard
            label={powerElectricity.installedCapacity.title}
            value={`${formatNumber(powerElectricity.installedCapacity.valueGw)} GW`}
            note={powerElectricity.installedCapacity.asOf}
          />
          <MetricCard
            label={powerElectricity.peakDemand.title}
            value={`${formatNumber(powerElectricity.peakDemand.valueGw)} GW`}
            note={powerElectricity.peakDemand.period}
          />
          <MetricCard
            label="Rural supply"
            value="12.5 to 22.6 hours/day"
            note="FY14 compared with FY25"
          />
          <MetricCard
            label="Household electrification"
            value={powerElectricity.electrificationAccess.displayHouseholds}
            note={`${formatNumber(
              powerElectricity.electrificationAccess.villagesElectrified,
            )} villages electrified`}
          />
          <MetricCard
            label={powerElectricity.perCapitaConsumption.title}
            value="957 to 1,460 kWh"
            note={`Increase: ${formatNumber(
              powerElectricity.perCapitaConsumption.increaseKwh,
            )} kWh (${formatNumber(
              powerElectricity.perCapitaConsumption.growthPercent,
            )}%)`}
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <BarChart title={powerElectricity.powerShortage.title} rows={shortageRows} />
          <BarChart title={powerElectricity.dailySupply.title} rows={supplyRows} />
          <BarChart
            title={powerElectricity.perCapitaConsumption.title}
            rows={consumptionRows}
          />
          <BarChart title="Solar Capacity Growth" rows={solarRows} />
          <BarChart title="DISCOM Profit / Loss" rows={discomProfitRows} />
          <BarChart title="AT&C Losses" rows={atcRows} />
          <CapacityAdditionChart />
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">
              Source-wise Electricity Generation Trends
            </h3>
            <div className="mt-5 rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-700">
              Source-wise generation trend data to be added from official
              dashboard export.
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <MetricCard
            label={powerElectricity.transmission.title}
            value={powerElectricity.transmission.displayNetwork}
            note={`${formatNumber(
              powerElectricity.transmission.transformationCapacityGva,
            )} GVA transformation capacity`}
          />
          <MetricCard
            label={powerElectricity.electrificationAccess.title}
            value={powerElectricity.electrificationAccess.investment}
            note={powerElectricity.electrificationAccess.schemes.join(", ")}
          />
          <MetricCard
            label="PM Surya Ghar rooftop solar"
            value={powerElectricity.renewableEnergy.pmSuryaGhar.displayHouseholds}
            note={`Households benefited by ${powerElectricity.renewableEnergy.pmSuryaGhar.asOf}`}
          />
          <MetricCard
            label="Wind capacity"
            value={`${formatNumber(powerElectricity.renewableEnergy.windCapacityGw)} GW`}
            note="January 2026"
          />
          <MetricCard
            label="Highest renewable energy share"
            value={`${formatNumber(
              powerElectricity.renewableEnergy.highestRenewableShare.sharePercent,
            )}%`}
            note={powerElectricity.renewableEnergy.highestRenewableShare.date}
          />
          <MetricCard
            label="Smart meters installed"
            value={powerElectricity.discoms.smartMeters.displayTotal}
            note={`${powerElectricity.discoms.smartMeters.displayRdss} under RDSS by ${powerElectricity.discoms.smartMeters.asOf}`}
          />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            DISCOM Cost Recovery Indicators
          </h3>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <BarChart
              title="ACS-ARR Gap"
              rows={powerElectricity.discoms.acsArrGap.map((item, index) => ({
                label: item.year,
                value: item.rupeesPerUnit,
                display: `Rs ${formatNumber(item.rupeesPerUnit)}/unit`,
                tone: item.rupeesPerUnit > 0.5 ? "bad" : "good",
                after2014: index > 0,
              }))}
            />
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h4 className="text-base font-semibold text-slate-950">
                Renewable peak-day mix
              </h4>
              <dl className="mt-4 grid gap-3 text-sm text-slate-700">
                <div className="flex justify-between gap-4">
                  <dt>Demand met by renewables</dt>
                  <dd className="font-semibold text-slate-950">
                    {formatNumber(
                      powerElectricity.renewableEnergy.highestRenewableShare
                        .sharePercent,
                    )}
                    %
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Solar</dt>
                  <dd className="font-semibold text-slate-950">
                    {formatNumber(
                      powerElectricity.renewableEnergy.highestRenewableShare.solarGw,
                    )}{" "}
                    GW
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Wind</dt>
                  <dd className="font-semibold text-slate-950">
                    {formatNumber(
                      powerElectricity.renewableEnergy.highestRenewableShare.windGw,
                    )}{" "}
                    GW
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Hydro</dt>
                  <dd className="font-semibold text-slate-950">
                    {formatNumber(
                      powerElectricity.renewableEnergy.highestRenewableShare.hydroGw,
                    )}{" "}
                    GW
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <p className="mt-6 text-sm font-medium text-slate-600">
          Source:{" "}
          <a
            href={powerElectricity.sourceUrl}
            className="text-teal-700 underline underline-offset-4 hover:text-teal-900"
          >
            {powerElectricity.source}
          </a>
        </p>
      </div>
    </section>
  );
}
