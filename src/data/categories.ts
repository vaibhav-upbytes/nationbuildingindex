export type CategorySummary = {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  icon: string;
  metricCount: number;
  period: string;
  headlineMetric: {
    label: string;
    before: string;
    after: string;
  };
  keywords: string[];
  sourceLabels: string[];
};

export const categories: CategorySummary[] = [
  {
    id: "rural-development",
    title: "Rural Development",
    description:
      "Rural roads and PMGSY completed works compared through physical outcomes.",
    icon: "RD",
    metricCount: 1,
    period: "2004–2026",
    headlineMetric: {
      label: "Rural roads completed",
      before: "3,35,670 km",
      after: "4,09,259 km",
    },
    keywords: ["rural", "road", "pmgsy", "bridge", "village"],
    sourceLabels: ["PMGSY"],
  },
  {
    id: "railways",
    title: "Railway Development",
    shortTitle: "Railways",
    description:
      "Track work, electrification, coaches, passenger amenities and station safety infrastructure.",
    icon: "RY",
    metricCount: 8,
    period: "2004–2025",
    headlineMetric: {
      label: "Track work",
      before: "14,985 RKM",
      after: "25,871 RKM",
    },
    keywords: [
      "railway",
      "track",
      "train",
      "electrification",
      "lhb",
      "bio-toilet",
      "cctv",
    ],
    sourceLabels: ["Indian Railways", "CORE"],
  },
  {
    id: "rural-electrification",
    title: "Rural Electrification",
    description:
      "Village and household electricity access with scheme-level rural electrification context.",
    icon: "RE",
    metricCount: 4,
    period: "2013–2025",
    headlineMetric: {
      label: "Households electrified",
      before: "Universal access not achieved",
      after: "2.86 crore",
    },
    keywords: [
      "rural",
      "electricity",
      "electrification",
      "saubhagya",
      "households",
    ],
    sourceLabels: ["PIB", "Ministry of Power"],
  },
  {
    id: "power-electricity",
    title: "Power & Electricity",
    description:
      "Power shortage, daily supply, installed capacity, renewable capacity and distribution indicators.",
    icon: "PW",
    metricCount: 11,
    period: "2013–2026",
    headlineMetric: {
      label: "Power shortage",
      before: "4.2%",
      after: "0.03%",
    },
    keywords: [
      "power",
      "electricity",
      "solar",
      "shortage",
      "supply",
      "renewable",
      "discom",
    ],
    sourceLabels: ["PIB", "Ministry of Power"],
  },
  {
    id: "highway-expressway",
    title: "Highway & Expressway Development",
    shortTitle: "Highways",
    description:
      "National highway expansion, expressways, four-lane highways and Bharatmala progress.",
    icon: "HW",
    metricCount: 11,
    period: "2014–2025",
    headlineMetric: {
      label: "NH network",
      before: "91,287 km",
      after: "1,46,560 km",
    },
    keywords: [
      "highway",
      "expressway",
      "road",
      "bharatmala",
      "nh",
      "logistics",
    ],
    sourceLabels: ["PIB", "MoRTH"],
  },
  {
    id: "education-development",
    title: "Education Development",
    shortTitle: "Education",
    description:
      "Higher education institutions, universities, colleges, schools and education access metrics.",
    icon: "ED",
    metricCount: 9,
    period: "2014–2025",
    headlineMetric: {
      label: "Universities",
      before: "760",
      after: "1,338",
    },
    keywords: [
      "education",
      "universities",
      "colleges",
      "schools",
      "emrs",
      "pm shri",
    ],
    sourceLabels: ["PIB", "Ministry of Education"],
  },
  {
    id: "employment-workforce",
    title: "Employment & Workforce Growth",
    shortTitle: "Employment & Workforce",
    description:
      "Employment growth, unemployment, LFPR, women workforce participation, formal payroll and wage indicators.",
    icon: "EW",
    metricCount: 8,
    period: "2004–2024/25",
    headlineMetric: {
      label: "Employment",
      before: "47.5 crore",
      after: "64.33 crore",
    },
    keywords: [
      "employment",
      "jobs",
      "unemployment",
      "workforce",
      "labour",
      "worker",
      "epfo",
      "women",
      "youth",
      "lfpr",
      "wpr",
      "salary",
      "wages",
    ],
    sourceLabels: ["PIB", "PLFS", "NSSO", "EPFO"],
  },
  {
    id: "economic-growth",
    title: "Economic Growth",
    description:
      "GDP size, exports, services growth, sector composition and global economic position.",
    icon: "EC",
    metricCount: 6,
    period: "2014–2025",
    headlineMetric: {
      label: "GDP size",
      before: "$2.04T",
      after: "$3.90T",
    },
    keywords: ["economy", "gdp", "exports", "services", "growth", "rank"],
    sourceLabels: ["PIB", "IMF"],
  },
  {
    id: "inflation",
    title: "Inflation & Price Stability",
    shortTitle: "Inflation",
    description:
      "Retail inflation, CPI trend, food inflation and price stability indicators.",
    icon: "IN",
    metricCount: 4,
    period: "2004–2025",
    headlineMetric: {
      label: "Average inflation",
      before: "8.2%",
      after: "5.0%",
    },
    keywords: ["inflation", "cpi", "food", "price", "stability"],
    sourceLabels: ["PIB", "Ministry of Finance"],
  },
  {
    id: "poverty-reduction",
    title: "Poverty Reduction & Living Standards",
    shortTitle: "Poverty Reduction",
    description:
      "Poverty reduction, people lifted out of poverty, living standards and inequality trends.",
    icon: "PR",
    metricCount: 8,
    period: "2004–2024/25",
    headlineMetric: {
      label: "Extreme poverty",
      before: "16.2%",
      after: "2.3%",
    },
    keywords: [
      "poverty",
      "poor",
      "inclusive growth",
      "living standards",
      "rural poverty",
      "urban poverty",
      "inequality",
      "gini",
    ],
    sourceLabels: ["PIB", "World Bank"],
  },
  {
    id: "direct-income-tax",
    title: "Direct Income Tax",
    shortTitle: "Income Tax",
    description:
      "Simplified salaried taxpayer comparison for a 20 lakh annual income scenario.",
    icon: "TX",
    metricCount: 4,
    period: "FY 2013–14 to FY 2025–26",
    headlineMetric: {
      label: "Tax on 20 LPA",
      before: "₹4.02 lakh",
      after: "₹2.34 lakh",
    },
    keywords: [
      "tax",
      "income tax",
      "salary",
      "20 lakh",
      "take home",
      "new tax regime",
    ],
    sourceLabels: ["Union Budget", "Income Tax Department"],
  },
  {
    id: "miscellaneous",
    title: "Miscellaneous: Fuel Prices & Currency",
    shortTitle: "Fuel & Currency",
    description:
      "Delhi benchmark fuel prices, domestic LPG cylinder prices and USD-INR endpoint movement.",
    icon: "FX",
    metricCount: 4,
    period: "2004–2025",
    headlineMetric: {
      label: "Petrol price increase",
      before: "₹38.26/litre",
      after: "₹22.51/litre",
    },
    keywords: [
      "petrol",
      "diesel",
      "lpg",
      "fuel",
      "currency",
      "usd",
      "inr",
      "rupee",
    ],
    sourceLabels: ["PPAC", "IndianOil", "RBI"],
  },
];
