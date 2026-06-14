export type EmploymentSource = {
  label: string;
  url: string;
};

export type EmploymentSourceEvidence = {
  label: string;
  period: string;
  sourceUrl: string;
  sourceType: "PIB" | "NSSO / Labour Ministry" | "PLFS / Administrative";
  note: string;
};

export const employmentWorkforce = {
  id: "employment-workforce",
  title: "Employment & Workforce Growth",
  period: "2004–2024/25",
  seo: {
    title: "Employment & Workforce Growth in India",
    description:
      "Compare employment growth, unemployment rate, labour force participation, women workforce participation, EPFO formal employment, wage growth and workforce trends in India using official data sources.",
    keywords: [
      "employment growth India",
      "workforce India",
      "unemployment rate India",
      "labour force participation India",
      "women workforce India",
      "EPFO payroll India",
      "wage growth India",
      "PLFS employment data",
      "NSSO employment data",
    ],
  },
  sources: [
    {
      label: "PIB Employment Backgrounder 2025",
      url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2174773&reg=3&lang=2",
    },
    {
      label: "Ministry of Labour & Employment / NSSO historical employment data",
      url: "https://labour.gov.in/",
    },
    {
      label: "PLFS / MoSPI references",
      url: "https://mospi.gov.in/",
    },
  ] satisfies EmploymentSource[],
  methodologyNote:
    "Employment data uses different survey systems across periods. Earlier figures are based on NSSO Employment-Unemployment Surveys, while later figures use PLFS and administrative datasets such as EPFO payroll records. These figures should be read as broad labour-market trends rather than perfectly identical measurement systems.",
  historical2004_2014: {
    unemployedPeopleMillion: [
      { year: "2004-05", value: 11.3 },
      { year: "2009-10", value: 9.8 },
      { year: "2011-12", value: 10.8 },
    ],
    cdsUnemploymentRate: [
      { year: "2004-05", value: 8.2 },
      { year: "2011-12", value: 5.6 },
    ],
    jobsCreatedPsSsMillion: [
      { period: "1999-2000 to 2004-05", value: 59.9 },
      { period: "2004-05 to 2009-10", value: 1.1 },
      { period: "2009-10 to 2011-12", value: 13.9 },
    ],
    labourForceParticipation: [
      { year: "2004-05", value: 42.85 },
      { year: "2011-12", value: 39.5 },
    ],
    workerPopulationRatio2011_12: {
      allIndia: 39,
      rural: 40,
      urban: 36,
    },
    organisedSectorEmployment: {
      march2011Lakh: 289.99,
      march2012Lakh: 295.79,
      privateSector2004Lakh: 82.46,
      privateSector2012Lakh: 119.7,
    },
  },
  recent2014_2024: {
    totalEmployment: [
      { year: "2017-18", valueCrore: 47.5 },
      { year: "2023-24", valueCrore: 64.33 },
    ],
    netJobsAddedCrore: 16.83,
    unemploymentRate: [
      { year: "2017-18", value: 6.0 },
      { year: "2023-24", value: 3.2 },
    ],
    youthUnemploymentRate: [
      { year: "2017-18", value: 17.8 },
      { year: "2023-24", value: 10.2 },
    ],
    lfpr: [
      { year: "2017-18", value: 49.8 },
      { year: "2023-24", value: 60.1 },
    ],
    wpr: [
      { year: "2017-18", value: 46.8 },
      { year: "2023-24", value: 58.2 },
    ],
    womenWorkforce: {
      femaleLfpr: [
        { year: "2017-18", value: 23.3 },
        { year: "2023-24", value: 41.7 },
      ],
      femaleWpr: [
        { year: "2017-18", value: 22.0 },
        { year: "2023-24", value: 40.3 },
      ],
    },
    formalEmployment: {
      epfoNetSubscribers: [
        { year: "2018-19", valueLakh: 61.12, display: "61.12 lakh" },
        { year: "2024-25", valueCrore: 1.29, display: "1.29 crore" },
      ],
      cumulativeEpfoSubscribersCrore: 7.73,
      femaleEpfoSubscribers2024_25Lakh: 26.9,
    },
    employmentQuality: {
      selfEmployment: [
        { year: "2017-18", value: 52.2 },
        { year: "2023-24", value: 58.4 },
      ],
      casualLabour: [
        { year: "2017-18", value: 24.9 },
        { year: "2023-24", value: 19.8 },
      ],
    },
    wageGrowth: {
      casualLabourDailyWage: [
        { period: "Jul-Sep 2017", value: 294 },
        { period: "Apr-Jun 2024", value: 433 },
      ],
      regularSalariedMonthlyEarnings: [
        { period: "Jul-Sep 2017", value: 16538 },
        { period: "Apr-Jun 2024", value: 21103 },
      ],
    },
    emergingEmployment: {
      gigWorkforce: [
        { year: "2024-25", valueCrore: 1 },
        { year: "2029-30 projected", valueCrore: 2.35 },
      ],
      startups: {
        dpiitRecognized: 190000,
        jobsCreated: 1700000,
      },
      gccs: {
        centres: 1700,
        employment: 2000000,
      },
    },
  },
  verificationEvidence: [
    {
      label: "PIB Employment Backgrounder 2025",
      period: "2017-18 to 2024-25",
      sourceUrl:
        "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2174773&reg=3&lang=2",
      sourceType: "PIB",
      note: "Public PIB source used for PLFS employment, unemployment, women workforce participation, EPFO payroll and wage-growth indicators.",
    },
    {
      label: "NSSO / Labour Ministry historical employment indicators",
      period: "2004-05 to 2011-12",
      sourceUrl: "https://labour.gov.in/",
      sourceType: "NSSO / Labour Ministry",
      note: "Historical employment and unemployment indicators for the earlier period are recorded separately because the survey system differs from PLFS.",
    },
    {
      label: "PLFS / MoSPI labour force references",
      period: "2017-18 to 2023-24",
      sourceUrl: "https://mospi.gov.in/",
      sourceType: "PLFS / Administrative",
      note: "PLFS and administrative references provide the later-period labour-force, workforce participation and formal payroll context.",
    },
  ] satisfies EmploymentSourceEvidence[],
};
