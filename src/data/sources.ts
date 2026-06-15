export interface SourceReference {
  id: string;
  category: string;
  title: string;
  organization: string;
  url: string;
  description: string;
  periodBadges?: string[];
}

export const comparisonPeriodBadges = ["2004-2014", "2014-2024"];

export const sources: SourceReference[] = [
  {
    id: "pmgsy-official",
    category: "Rural Development",
    title: "PMGSY Official Portal",
    organization: "Ministry of Rural Development",
    url: "https://pmgsy.dord.gov.in/",
    description:
      "Official PMGSY portal used with captured HTML snapshots for rural road development verification.",
  },
  {
    id: "railways-core",
    category: "Railway Development",
    title: "Indian Railways CORE",
    organization: "Indian Railways",
    url: "https://core.indianrailways.gov.in/",
    description:
      "Railway electrification records and technical references from Central Organisation for Railway Electrification.",
  },
  {
    id: "railways-pib-review",
    category: "Railway Development",
    title: "PIB Railway Development Review",
    organization: "Indian Railways",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209199",
    description:
      "Railway electrification, track laying, coach manufacturing, safety infrastructure and station modernization.",
  },
  {
    id: "rural-electrification-pib",
    category: "Rural Electrification",
    title: "DDUGJY and Saubhagya Progress Release",
    organization: "Ministry of Power",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1883918",
    description:
      "DDUGJY, Saubhagya, village electrification and household electrification references.",
  },
  {
    id: "power-electricity-pib",
    category: "Power & Electricity",
    title: "Electricity Sector Review",
    organization: "Ministry of Power",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241822",
    description:
      "Installed capacity, power shortage, electricity access, renewable energy and transmission infrastructure.",
  },
  {
    id: "highway-expressway-pib",
    category: "Highway & Expressway Development",
    title: "Year End Review 2025",
    organization: "Ministry of Road Transport & Highways",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209837",
    description:
      "National highways, expressways, Bharatmala, SARDP-NE and logistics infrastructure.",
  },
  {
    id: "education-pib",
    category: "Education Development",
    title: "Education Development Press Note",
    organization: "Ministry of Education",
    url: "https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154714",
    description:
      "Universities, colleges, IITs, IIMs, AIIMS, EMRS schools and educational expansion.",
  },
  {
    id: "employment-rbi-klems-pib",
    category: "Employment and Workforce",
    title: "PIB Press Release on employment / RBI KLEMS",
    organization: "PIB / RBI KLEMS",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2035280",
    description:
      "Total employment and RBI KLEMS employment context for broad workforce estimates.",
  },
  {
    id: "employment-plfs-pib",
    category: "Employment and Workforce",
    title: "PIB Employment Backgrounder / PLFS unemployment",
    organization: "PIB / PLFS",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2174773&reg=3&lang=2",
    description:
      "PLFS unemployment trend, employment indicators and EPFO payroll context.",
  },
  {
    id: "employment-sbi-ecowrap-rbi-klems",
    category: "Employment and Workforce",
    title: "SBI Ecowrap citing RBI KLEMS employment comparison",
    organization: "SBI Ecowrap",
    url: "https://sbi.bank.in/documents/13958/43951007/100724-Ecowrap_20240710.pdf/b4d127c1-3d48-2704-36ef-a22accafcfb9?t=1720591608435",
    description:
      "Reference PDF citing RBI KLEMS employment additions across FY04-FY14 and FY14-FY23.",
  },
  {
    id: "employment-rozgar-mela-pib",
    category: "Employment and Workforce",
    title: "PIB / Rozgar Mela reference",
    organization: "PIB",
    url: "https://www.pib.gov.in/PressReleaseDetail.aspx?PRID=1929384&lang=1&reg=3",
    description:
      "Central recruitment and Rozgar Mela reference material.",
  },
  {
    id: "employment-new-india-samachar-recruitment",
    category: "Employment and Workforce",
    title: "New India Samachar central government recruitment comparison",
    organization: "New India Samachar / PIB",
    url: "https://newindiasamachar.pib.gov.in/WriteReadData/Magazine//2023/Aug/M202308161.pdf",
    description:
      "Central government recruitment comparison reference for 2004-2013 and 2014-2023.",
  },
  {
    id: "economic-growth-pib",
    category: "Economic Growth",
    title: "Economic Growth Press Note",
    organization: "PIB / MoSPI",
    url: "https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154660",
    description:
      "GDP growth, exports, services sector and economic transformation indicators.",
  },
  {
    id: "economy-reference",
    category: "Economic Growth",
    title: "Economy of India Reference Dataset",
    organization: "Reference Dataset",
    url: "https://en.wikipedia.org/wiki/Economy_of_India",
    description:
      "Reference context for GDP, sector composition and long-term economic indicators.",
  },
  {
    id: "inflation-pib",
    category: "Inflation & Price Stability",
    title: "Retail Inflation Hits Six-Year Low",
    organization: "Ministry of Finance",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2122148",
    description: "Retail inflation, food inflation and CPI trend references.",
  },
  {
    id: "poverty-2013-pib",
    category: "Poverty Reduction & Living Standards",
    title: "PIB 2013 Poverty Estimates",
    organization: "PIB / Planning Commission",
    url: "https://www.pib.gov.in/newsite/erelcontent.aspx?relid=97365&reg=48&lang=2",
    description:
      "Planning Commission / Tendulkar methodology poverty estimates for the earlier comparison period.",
  },
  {
    id: "poverty-world-bank-2025-pib",
    category: "Poverty Reduction & Living Standards",
    title: "PIB 2025 World Bank Poverty & Equity Brief",
    organization: "PIB / World Bank",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2124545&reg=48&lang=2",
    description:
      "World Bank poverty, rural/urban poverty, lower-middle-income poverty and inequality indicators.",
  },
  {
    id: "poverty-story-2025-pib",
    category: "Poverty Reduction & Living Standards",
    title: "PIB 2025 India’s Poverty Story Transformed",
    organization: "PIB",
    url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=149221&reg=48&lang=2",
    description:
      "Factsheet references for poverty reduction and living standards context.",
  },
  {
    id: "income-tax-department",
    category: "Direct Income Tax",
    title: "Income Tax Department",
    organization: "Income Tax Department",
    url: "https://www.incometax.gov.in/",
    description:
      "Historical and current income tax references used in tax comparison calculations.",
  },
  {
    id: "union-budget",
    category: "Direct Income Tax",
    title: "Union Budget",
    organization: "Union Budget",
    url: "https://www.indiabudget.gov.in/",
    description:
      "Budget documents and tax slab announcements used for current tax regime comparison.",
  },
  {
    id: "ppac-fuel",
    category: "Miscellaneous: Fuel Prices & Currency",
    title: "PPAC Petroleum Data",
    organization: "PPAC",
    url: "https://ppac.gov.in/",
    description: "Petrol, diesel, LPG and petroleum sector benchmark data.",
  },
  {
    id: "iocl-fuel",
    category: "Miscellaneous: Fuel Prices & Currency",
    title: "Indian Oil Price References",
    organization: "Indian Oil",
    url: "https://iocl.com/",
    description: "Fuel price references and retail petroleum information.",
  },
  {
    id: "rbi-reference-rate",
    category: "Miscellaneous: Fuel Prices & Currency",
    title: "RBI Reference Rate Archive",
    organization: "Reserve Bank of India",
    url: "https://www.rbi.org.in/scripts/referenceratearchive.aspx",
    description:
      "USD-INR exchange rate benchmarks and reference-rate archives.",
  },
];

export function getSourcesByCategory(category: string) {
  return sources
    .filter((source) => source.category === category)
    .map((source) => ({
      ...source,
      periodBadges: source.periodBadges ?? comparisonPeriodBadges,
    }));
}

export function getSourceCategories() {
  return Array.from(new Set(sources.map((source) => source.category)));
}
