export interface SourceReference {
  id: string;
  category: string;
  title: string;
  organization: string;
  url: string;
  description: string;
}

export const sources: SourceReference[] = [
  {
    id: "pmgsy-ommas",
    category: "Rural Development",
    title: "OMMAS PMGSY Dashboard",
    organization: "Ministry of Rural Development",
    url: "https://omms.nic.in/",
    description: "PMGSY road and bridge completion statistics from the official online monitoring system.",
  },
  {
    id: "pmgsy-official",
    category: "Rural Development",
    title: "PMGSY Official Portal",
    organization: "Ministry of Rural Development",
    url: "https://pmgsy.nic.in/",
    description: "Scheme information, reports, and reference material for rural road development under PMGSY.",
  },
  {
    id: "railways-core",
    category: "Railway Development",
    title: "Indian Railways CORE",
    organization: "Indian Railways",
    url: "https://core.indianrailways.gov.in/",
    description: "Railway electrification records and technical references from Central Organisation for Railway Electrification.",
  },
  {
    id: "railways-pib-review",
    category: "Railway Development",
    title: "PIB Railway Development Review",
    organization: "Indian Railways",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209199",
    description: "Railway electrification, track laying, coach manufacturing, safety infrastructure and station modernization.",
  },
  {
    id: "rural-electrification-pib",
    category: "Rural Electrification",
    title: "DDUGJY and Saubhagya Progress Release",
    organization: "Ministry of Power",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1883918",
    description: "DDUGJY, Saubhagya, village electrification and household electrification references.",
  },
  {
    id: "power-electricity-pib",
    category: "Power & Electricity",
    title: "Electricity Sector Review",
    organization: "Ministry of Power",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241822",
    description: "Installed capacity, power shortage, electricity access, renewable energy and transmission infrastructure.",
  },
  {
    id: "highway-expressway-pib",
    category: "Highway & Expressway Development",
    title: "Year End Review 2025",
    organization: "Ministry of Road Transport & Highways",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209837",
    description: "National highways, expressways, Bharatmala, SARDP-NE and logistics infrastructure.",
  },
  {
    id: "education-pib",
    category: "Education Development",
    title: "Education Development Press Note",
    organization: "Ministry of Education",
    url: "https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154714",
    description: "Universities, colleges, IITs, IIMs, AIIMS, EMRS schools and educational expansion.",
  },
  {
    id: "economic-growth-pib",
    category: "Economic Growth",
    title: "Economic Growth Press Note",
    organization: "PIB / MoSPI",
    url: "https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154660",
    description: "GDP growth, exports, services sector and economic transformation indicators.",
  },
  {
    id: "economy-reference",
    category: "Economic Growth",
    title: "Economy of India Reference Dataset",
    organization: "Reference Dataset",
    url: "https://en.wikipedia.org/wiki/Economy_of_India",
    description: "Reference context for GDP, sector composition and long-term economic indicators.",
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
    id: "income-tax-department",
    category: "Direct Income Tax",
    title: "Income Tax Department",
    organization: "Income Tax Department",
    url: "https://www.incometax.gov.in/",
    description: "Historical and current income tax references used in tax comparison calculations.",
  },
  {
    id: "union-budget",
    category: "Direct Income Tax",
    title: "Union Budget",
    organization: "Union Budget",
    url: "https://www.indiabudget.gov.in/",
    description: "Budget documents and tax slab announcements used for current tax regime comparison.",
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
    description: "USD-INR exchange rate benchmarks and reference-rate archives.",
  },
];

export function getSourcesByCategory(category: string) {
  return sources.filter((source) => source.category === category);
}

export function getSourceCategories() {
  return Array.from(new Set(sources.map((source) => source.category)));
}
