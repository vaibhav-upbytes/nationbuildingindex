export type HighwayMetric = {
  label: string;
  valueKm: number;
};

export type HighwayGrowthMetric = {
  title: string;
  unit: "km";
  data: HighwayMetric[];
  increaseKm: number;
  growthPercent: number;
};

export type YearlyHighwayConstruction = {
  year: string;
  constructedKm: number;
  kmPerDay: number;
};

export type CompletionProgramme = {
  title: string;
  plannedKm: number;
  completedKm: number;
  completionPercent: number;
};

export type HighwaySourceEvidence = {
  label: string;
  period: string;
  sourceUrl: string;
  pdfPath?: string;
  sourceType: "PIB";
  note: string;
};

export const highwayExpresswayDevelopment = {
  title: "Highway & Expressway Development",
  source: "PIB - Ministry of Road Transport & Highways - Year End Review 2025",
  sourceUrl:
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209837&reg=3&lang=2",
  seo: {
    title: "Highway & Expressway Development in India (2014–2025)",
    description:
      "Compare National Highway expansion, expressway construction, Bharatmala progress, North-East road connectivity, and highway infrastructure growth in India.",
    keywords: [
      "highway development india",
      "expressway growth india",
      "bharatmala project",
      "national highways comparison",
      "road infrastructure india",
      "expressway network india",
    ],
  },
  nationalHighways: {
    title: "National Highway Network",
    unit: "km",
    data: [
      { label: "2014", valueKm: 91287 },
      { label: "2025", valueKm: 146560 },
    ],
    increaseKm: 55273,
    growthPercent: 61,
  } satisfies HighwayGrowthMetric,
  expressways: {
    title: "Expressways & High-Speed Corridors",
    unit: "km",
    data: [
      { label: "2014", valueKm: 93 },
      { label: "2025", valueKm: 3052 },
    ],
    increaseKm: 2959,
    growthPercent: 3180,
  } satisfies HighwayGrowthMetric,
  fourLaneHighways: {
    title: "4-Lane and Above National Highways",
    unit: "km",
    data: [
      { label: "2014", valueKm: 18371 },
      { label: "2025", valueKm: 43512 },
    ],
    increaseKm: 25141,
    growthPercent: 137,
  } satisfies HighwayGrowthMetric,
  yearlyConstruction: {
    title: "National Highway Construction Speed",
    unit: "km",
    highlight: "Highest construction achieved: 13,327 km in FY 2020-21.",
    paceHighlight: "Highest pace achieved: 36.5 km/day.",
    data: [
      { year: "2014-15", constructedKm: 4410, kmPerDay: 12.1 },
      { year: "2015-16", constructedKm: 6061, kmPerDay: 16.6 },
      { year: "2016-17", constructedKm: 8231, kmPerDay: 22.6 },
      { year: "2017-18", constructedKm: 9829, kmPerDay: 26.9 },
      { year: "2018-19", constructedKm: 10855, kmPerDay: 29.7 },
      { year: "2019-20", constructedKm: 10237, kmPerDay: 28.1 },
      { year: "2020-21", constructedKm: 13327, kmPerDay: 36.5 },
      { year: "2021-22", constructedKm: 10457, kmPerDay: 28.6 },
      { year: "2022-23", constructedKm: 10331, kmPerDay: 28.3 },
      { year: "2023-24", constructedKm: 12349, kmPerDay: 33.8 },
      { year: "2024-25", constructedKm: 10660, kmPerDay: 29.2 },
    ] satisfies YearlyHighwayConstruction[],
  },
  bharatmala: {
    title: "Bharatmala Pariyojana",
    approvedLengthKm: 26425,
    completedTill: "November 2025",
    completedKm: 21597,
    completionPercent: 81.7,
    components: [
      { component: "Economic Corridors", completedKm: 6896 },
      { component: "Inter Corridors", completedKm: 2397 },
      { component: "Feeder Roads", completedKm: 702 },
      { component: "National Corridors", completedKm: 1516 },
      { component: "Corridor Efficiency Improvement", completedKm: 767 },
      { component: "Expressways", completedKm: 1994 },
      { component: "Border Roads", completedKm: 1466 },
      { component: "Coastal Roads", completedKm: 72 },
      { component: "Port Connectivity Roads", completedKm: 154 },
      { component: "NHDP Balance Works", completedKm: 5633 },
    ],
  },
  sardpNe: {
    title: "SARDP-NE",
    plannedKm: 5998,
    completedKm: 5859,
    completionPercent: 97.7,
  } satisfies CompletionProgramme,
  lweRoadProgramme: {
    title: "Left Wing Extremism Road Programme",
    plannedKm: 6014,
    completedKm: 5825,
    completionPercent: 96.9,
  } satisfies CompletionProgramme,
  externallyAidedProjects: {
    title: "Externally Aided Road Projects",
    plannedKm: 2978,
    completedKm: 2604,
    completionPercent: 87.4,
  } satisfies CompletionProgramme,
  logisticsParks: {
    title: "Multimodal Logistics Parks",
    planned: 35,
    investmentCrore: 46000,
    cargoHandlingCapacityMmt: 700,
  },
  waysideAmenities: {
    title: "Wayside Amenities",
    awarded: 510,
    operational: 110,
  },
  timeline: [
    {
      year: "2017",
      title: "Bharatmala Phase-I approved",
      text: "CCEA approved Bharatmala Phase-I in October 2017.",
    },
    {
      year: "2020-21",
      title: "Highest annual NH construction",
      text: "13,327 km constructed at 36.5 km/day.",
    },
    {
      year: "2025",
      title: "Expressway network expanded",
      text: "Operational expressways and high-speed corridors reached 3,052 km.",
    },
    {
      year: "Nov 2025",
      title: "Regional road programmes near completion",
      text: "SARDP-NE reached 97.7% completion and LWE road programme reached 96.9%.",
    },
  ],
  verificationEvidence: [
    {
      label: "Highway and expressway development source",
      period: "2014-2025",
      sourceUrl:
        "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209837&reg=3&lang=2",
      pdfPath:
        "/source-snapshot/highway-expressway/source-pdf/road-highway-pib-2026.pdf",
      sourceType: "PIB",
      note: "Public PIB source used for National Highway network expansion, expressway growth, construction pace, Bharatmala, SARDP-NE, LWE road programme and logistics infrastructure indicators.",
    },
  ] satisfies HighwaySourceEvidence[],
};
