export type EmploymentSource = {
  label: string;
  url: string;
};

export type EmploymentSourceEvidence = {
  label: string;
  period: string;
  sourceUrl: string;
  sourceType: "PIB" | "RBI KLEMS" | "SBI Ecowrap" | "EPFO" | "Rozgar Mela" | "New India Samachar" | "PLFS";
  note: string;
};

export type EmploymentComparisonRow = {
  indicator: string;
  earlierPeriod: string;
  laterPeriod: string;
  dataType: string;
  source: string;
  sourceUrl: string;
  notes: string;
};

export const employmentWorkforce = {
  id: "employment-workforce",
  title: "Employment and Workforce",
  period: "2004–2024",
  seo: {
    title: "Employment and Workforce in India",
    description:
      "Compare total employment added, formal payroll growth, central government recruitment, and unemployment trends in India using RBI KLEMS, PIB, EPFO, PLFS, SBI Ecowrap and public source data.",
    keywords: [
      "employment India",
      "workforce India",
      "RBI KLEMS employment",
      "EPFO net subscribers",
      "PLFS unemployment",
      "central government recruitment",
      "formal payroll India",
      "employment data limitation India",
    ],
  },
  sources: [
    {
      label: "PIB Press Release on employment / RBI KLEMS",
      url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2035280",
    },
    {
      label: "PIB Employment Backgrounder / PLFS unemployment",
      url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2174773&reg=3&lang=2",
    },
    {
      label: "SBI Ecowrap citing RBI KLEMS employment comparison",
      url: "https://sbi.bank.in/documents/13958/43951007/100724-Ecowrap_20240710.pdf/b4d127c1-3d48-2704-36ef-a22accafcfb9?t=1720591608435",
    },
    {
      label: "PIB / Rozgar Mela reference",
      url: "https://www.pib.gov.in/PressReleaseDetail.aspx?PRID=1929384&lang=1&reg=3",
    },
    {
      label: "New India Samachar central government recruitment comparison",
      url: "https://newindiasamachar.pib.gov.in/WriteReadData/Magazine//2023/Aug/M202308161.pdf",
    },
  ] satisfies EmploymentSource[],
  methodologyNote:
    "Employment data comes from multiple sources and each source measures a different thing. RBI KLEMS estimates total employment across the economy. EPFO payroll tracks formal-sector subscribers. Central recruitment data tracks direct central government appointments. PLFS tracks labour force and unemployment indicators. These should be shown separately, not added together.",
  privateSectorLimitation:
    "India does not publish one clean official number for private-sector jobs created during 2004–2014 and 2014–2024. For private/formal employment, EPFO payroll is the best available proxy from September 2017 onward. For total employment, RBI KLEMS is the broadest available employment dataset.",
  totalEmploymentNote:
    "Total employment includes formal, informal, self-employed, agricultural, and non-agricultural workers. It should not be treated as only salaried private-sector employment.",
  epfoNote:
    "EPFO net subscribers are a proxy for formal employment and payroll formalisation. This does not represent total private-sector jobs.",
  centralRecruitmentNote:
    "Central government recruitment data tracks direct central government appointments. This does not include all state government recruitment.",
  keyMetrics: {
    totalEmploymentAdded: {
      title: "Total Employment Added",
      earlier: {
        period: "Period 2004–2014",
        valueCrore: 2.9,
        display: "Approx. 2.9 crore",
      },
      later: {
        period: "Period 2014–2024",
        valueCrore: 17.2,
        display: "Approx. 17.2 crore",
      },
      sourceType: "RBI KLEMS / PIB / SBI Ecowrap",
    },
    formalPayroll: {
      title: "Formal Payroll Expansion",
      earlier: {
        period: "Period 2004–2014",
        display: "Not available in comparable EPFO payroll format",
      },
      later: {
        period: "September 2017–March 2024",
        valueCrore: 6.2,
        display: "6.2+ crore EPFO net subscribers",
      },
      sourceType: "EPFO payroll / PIB",
    },
    centralGovernmentRecruitment: {
      title: "Central Government Recruitment",
      earlier: {
        period: "Period 2004–2013",
        valueLakh: 6,
        display: "Approx. 6 lakh",
      },
      later: {
        period: "Period 2014–2023",
        valueLakh: 9,
        display: "Approx. 9 lakh",
      },
      sourceType: "PIB / New India Samachar / Rozgar Mela",
    },
    unemploymentRate: {
      title: "Unemployment Rate Trend",
      earlier: {
        period: "2017–18",
        valuePercent: 6.0,
        display: "6.0%",
      },
      later: {
        period: "2023–24",
        valuePercent: 3.2,
        display: "3.2%",
      },
      sourceType: "PLFS / PIB",
    },
  },
  comparisonRows: [
    {
      indicator: "Total employment added",
      earlierPeriod: "Approx. 2.9 crore jobs added during Period 2004–2014",
      laterPeriod: "Approx. 17.2 crore jobs added during Period 2014–2024",
      dataType: "Broad total-employment estimate",
      source: "RBI KLEMS / PIB / SBI Ecowrap",
      sourceUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2035280",
      notes:
        "Includes formal, informal, self-employed, agricultural and non-agricultural workers. Do not read this as only salaried private-sector employment.",
    },
    {
      indicator: "Formal payroll / EPFO net subscribers",
      earlierPeriod: "Not available in comparable EPFO payroll format",
      laterPeriod: "6.2+ crore net EPFO subscribers, September 2017–March 2024",
      dataType: "Formal-sector payroll proxy",
      source: "EPFO payroll / PIB",
      sourceUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2174773&reg=3&lang=2",
      notes:
        "EPFO payroll starts later and is a proxy for formal employment and payroll formalisation, not total private-sector jobs.",
    },
    {
      indicator: "Central government recruitment",
      earlierPeriod: "Approx. 6 lakh appointments during Period 2004–2013",
      laterPeriod: "Approx. 9 lakh appointments during Period 2014–2023",
      dataType: "Direct central government appointments",
      source: "PIB / Rozgar Mela / New India Samachar",
      sourceUrl: "https://www.pib.gov.in/PressReleaseDetail.aspx?PRID=1929384&lang=1&reg=3",
      notes: "This does not include all state government recruitment.",
    },
    {
      indicator: "Unemployment rate trend",
      earlierPeriod: "PLFS annual series starts at 6.0% in 2017–18",
      laterPeriod: "3.2% in 2023–24",
      dataType: "PLFS labour-market trend indicator",
      source: "PLFS / PIB",
      sourceUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2174773&reg=3&lang=2",
      notes:
        "Use as a trend indicator because comparable PLFS annual unemployment data starts from 2017–18.",
    },
    {
      indicator: "Private-sector jobs created",
      earlierPeriod: "No single clean official number",
      laterPeriod: "No single clean official number",
      dataType: "Data limitation",
      source: "RBI KLEMS / EPFO / PLFS",
      sourceUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2035280",
      notes:
        "RBI KLEMS is the broadest total-employment dataset. EPFO is the best available formal/private payroll proxy from September 2017 onward.",
    },
  ] satisfies EmploymentComparisonRow[],
  verificationEvidence: [
    {
      label: "PIB press release on employment and RBI KLEMS",
      period: "Period 2014–2024 context",
      sourceUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2035280",
      sourceType: "PIB",
      note: "Public PIB source used for RBI KLEMS employment context and total-employment references.",
    },
    {
      label: "SBI Ecowrap employment comparison",
      period: "FY04–FY14 and FY14–FY23",
      sourceUrl:
        "https://sbi.bank.in/documents/13958/43951007/100724-Ecowrap_20240710.pdf/b4d127c1-3d48-2704-36ef-a22accafcfb9?t=1720591608435",
      sourceType: "SBI Ecowrap",
      note: "Public SBI Ecowrap PDF citing RBI KLEMS employment additions for earlier and later periods.",
    },
    {
      label: "PIB Employment Backgrounder / PLFS unemployment",
      period: "2017–18 to 2023–24",
      sourceUrl:
        "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2174773&reg=3&lang=2",
      sourceType: "PLFS",
      note: "Public PIB source used for PLFS unemployment trend and EPFO payroll context.",
    },
    {
      label: "PIB / Rozgar Mela reference",
      period: "Central recruitment context",
      sourceUrl:
        "https://www.pib.gov.in/PressReleaseDetail.aspx?PRID=1929384&lang=1&reg=3",
      sourceType: "Rozgar Mela",
      note: "Public PIB source used for direct central government recruitment context.",
    },
    {
      label: "New India Samachar central recruitment comparison",
      period: "2004–2013 and 2014–2023",
      sourceUrl:
        "https://newindiasamachar.pib.gov.in/WriteReadData/Magazine//2023/Aug/M202308161.pdf",
      sourceType: "New India Samachar",
      note: "Public magazine PDF reference for central government recruitment comparison.",
    },
  ] satisfies EmploymentSourceEvidence[],
};
