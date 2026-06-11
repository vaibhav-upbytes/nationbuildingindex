export type PovertySource = {
  label: string;
  url: string;
};

export type PovertyPeriodComparison = {
  period: string;
  measure: string;
  startYear: string;
  startRate: number;
  endYear: string;
  endRate: number;
  reductionPercentagePoints: number;
  relativeImprovementPercent: number;
  peopleLiftedMillion: number;
  peopleLiftedLabel: string;
};

export type PovertyMetric = {
  startYear: string;
  startRate: number;
  endYear: string;
  endRate: number;
  reductionPercentagePoints: number;
  relativeImprovementPercent: number;
  peopleLiftedMillion?: number;
};

export type PovertySourceEvidence = {
  label: string;
  period: string;
  sourceUrl: string;
  pdfPath?: string;
  sourceType: "PIB";
  note: string;
};

export const povertyReduction = {
  id: "poverty-reduction",
  title: "Poverty Reduction & Living Standards",
  period: "2004–2024/25",
  seo: {
    title: "Poverty Reduction & Living Standards in India",
    description:
      "Compare poverty reduction, rural and urban poverty, multidimensional poverty, people lifted out of poverty, and inequality trends in India using official PIB and World Bank data.",
    keywords: [
      "poverty reduction India",
      "living standards India",
      "rural poverty India",
      "urban poverty India",
      "extreme poverty India",
      "multidimensional poverty India",
      "World Bank poverty India",
      "Gini index India",
      "inclusive growth India",
    ],
  },
  sources: [
    {
      label: "PIB 2013 Poverty Estimates",
      url: "https://www.pib.gov.in/newsite/erelcontent.aspx?relid=97365&reg=48&lang=2",
    },
    {
      label: "PIB 2025 World Bank Poverty & Equity Brief",
      url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2124545&reg=48&lang=2",
    },
    {
      label: "PIB 2025 India’s Poverty Story Transformed",
      url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=149221&reg=48&lang=2",
    },
  ] satisfies PovertySource[],
  methodologyNote:
    "Poverty estimates use different methodologies across periods. The 2004–2014 period uses Planning Commission / Tendulkar poverty estimates, while the 2014–2024 period uses World Bank international poverty benchmarks and updated consumption survey methods. These figures should be read as long-term poverty reduction indicators, not as perfectly identical measurement systems.",
  periodComparison: [
    {
      period: "2004–2014",
      measure: "National Poverty Line / Tendulkar Methodology",
      startYear: "2004-05",
      startRate: 37.2,
      endYear: "2011-12",
      endRate: 21.9,
      reductionPercentagePoints: 15.3,
      relativeImprovementPercent: 41.1,
      peopleLiftedMillion: 137,
      peopleLiftedLabel: "Approx. 137 million",
    },
    {
      period: "2014–2024",
      measure: "World Bank Extreme Poverty $2.15/day",
      startYear: "2011-12",
      startRate: 16.2,
      endYear: "2022-23",
      endRate: 2.3,
      reductionPercentagePoints: 13.9,
      relativeImprovementPercent: 85.8,
      peopleLiftedMillion: 171,
      peopleLiftedLabel: "171 million",
    },
  ] satisfies PovertyPeriodComparison[],
  verificationEvidence: [
    {
      label: "Planning Commission poverty estimates source",
      period: "2004-2012",
      sourceUrl:
        "https://www.pib.gov.in/newsite/erelcontent.aspx?relid=97365&reg=48&lang=2",
      pdfPath:
        "/source-snapshot/poverty-reduction/source-pdf/povert%202025.pdf",
      sourceType: "PIB",
      note: "Public PIB source used for Planning Commission / Tendulkar poverty estimates for the earlier period.",
    },
    {
      label: "World Bank poverty and equity brief source",
      period: "2011-2023",
      sourceUrl:
        "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2124545&reg=48&lang=2",
      pdfPath:
        "/source-snapshot/poverty-reduction/source-pdf/povert%202025.pdf",
      sourceType: "PIB",
      note: "Public PIB source used for World Bank extreme poverty, lower-middle-income poverty, rural/urban poverty and inequality indicators.",
    },
  ] satisfies PovertySourceEvidence[],
  detailedMetrics: {
    extremePoverty: {
      startYear: "2011-12",
      startRate: 16.2,
      endYear: "2022-23",
      endRate: 2.3,
      reductionPercentagePoints: 13.9,
      relativeImprovementPercent: 85.8,
      peopleLiftedMillion: 171,
    },
    ruralExtremePoverty: {
      startYear: "2011-12",
      startRate: 18.4,
      endYear: "2022-23",
      endRate: 2.8,
      reductionPercentagePoints: 15.6,
      relativeImprovementPercent: 84.8,
    },
    urbanExtremePoverty: {
      startYear: "2011-12",
      startRate: 10.7,
      endYear: "2022-23",
      endRate: 1.1,
      reductionPercentagePoints: 9.6,
      relativeImprovementPercent: 89.7,
    },
    lowerMiddleIncomePoverty: {
      benchmark: "$3.65/day",
      startYear: "2011-12",
      startRate: 61.8,
      endYear: "2022-23",
      endRate: 28.1,
      reductionPercentagePoints: 33.7,
      relativeImprovementPercent: 54.5,
      peopleLiftedMillion: 378,
    },
    multidimensionalPoverty: {
      startYear: "2005-06",
      startRate: 53.8,
      midYear: "2019-21",
      midRate: 16.4,
      latestYear: "2022-23",
      latestRate: 15.5,
    },
    inequality: {
      metric: "Consumption-based Gini Index",
      startYear: "2011-12",
      startValue: 28.8,
      endYear: "2022-23",
      endValue: 25.5,
      improvementPoints: 3.3,
      relativeImprovementPercent: 11.5,
    },
  },
};
