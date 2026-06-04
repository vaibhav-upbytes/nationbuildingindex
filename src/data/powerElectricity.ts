export const powerElectricity = {
  title: "Power & Electricity",
  source:
    "PIB, India's Power Sector: Progress, Reform, and the Road Ahead, 18 Mar 2026",
  sourceUrl:
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241822&reg=3&lang=2",

  powerShortage: {
    title: "Power Shortage",
    unit: "%",
    data: [
      { year: "FY 2013–14", value: 4.2 },
      { year: "FY 2025–26", value: 0.03, note: "Till Dec 2025" },
    ],
  },

  installedCapacity: {
    title: "Installed Power Capacity",
    valueGw: 520.51,
    asOf: "January 2026",
  },

  capacityAddition: {
    title: "Record Capacity Addition",
    period: "FY 2025–26 up to 31 January 2026",
    totalAddedMw: 52537,
    renewableAddedMw: 39657,
    solarAddedMw: 34955,
    windAddedMw: 4613,
  },

  peakDemand: {
    title: "Peak Power Demand Met",
    valueGw: 242.49,
    period: "FY 2025–26",
  },

  transmission: {
    title: "Transmission Infrastructure",
    networkCkm: 500000,
    displayNetwork: "5 lakh+ circuit km",
    transformationCapacityGva: 1407,
  },

  electrificationAccess: {
    title: "Electricity Access",
    villagesElectrified: 18374,
    householdsElectrified: 28600000,
    displayHouseholds: "2.86 crore",
    investment: "Rs 1.85 lakh crore",
    schemes: ["DDUGJY", "IPDS", "Saubhagya"],
  },

  dailySupply: {
    title: "Daily Power Supply",
    unit: "hours/day",
    data: [
      { area: "Rural", fy14: 12.5, fy25: 22.6 },
      { area: "Urban", fy14: 22.1, fy25: 23.4 },
    ],
  },

  perCapitaConsumption: {
    title: "Per Capita Electricity Consumption",
    unit: "kWh",
    data: [
      { year: "FY 2013–14", value: 957 },
      { year: "FY 2024–25", value: 1460 },
    ],
    increaseKwh: 503,
    growthPercent: 52.6,
  },

  renewableEnergy: {
    title: "Renewable Energy Growth",
    solarCapacity: [
      { year: "2014", valueGw: 3 },
      { year: "January 2026", valueGw: 140 },
    ],
    windCapacityGw: 54.65,
    highestRenewableShare: {
      date: "29 July 2025",
      sharePercent: 51.5,
      totalDemandGw: 203,
      solarGw: 44.5,
      windGw: 29.89,
      hydroGw: 30.29,
    },
    pmSuryaGhar: {
      householdsBenefited: 3104000,
      displayHouseholds: "31.04 lakh",
      asOf: "February 2026",
    },
  },

  discoms: {
    title: "DISCOM Improvements",
    profitLoss: [
      { year: "FY 2013–14", valueCrore: -67962, label: "Rs 67,962 crore loss" },
      { year: "FY 2024–25", valueCrore: 2701, label: "Rs 2,701 crore profit" },
    ],
    atcLosses: [
      { year: "FY 2013–14", percent: 22.62 },
      { year: "FY 2024–25", percent: 15.04 },
    ],
    acsArrGap: [
      { year: "FY 2013–14", rupeesPerUnit: 0.78 },
      { year: "FY 2024–25", rupeesPerUnit: 0.06 },
    ],
    smartMeters: {
      totalInstalled: 56200000,
      displayTotal: "5.62 crore",
      rdssInstalled: 40500000,
      displayRdss: "4.05 crore",
      asOf: "January 2026",
    },
  },
};
