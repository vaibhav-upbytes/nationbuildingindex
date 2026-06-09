export type EducationComparisonMetric = {
  metric: string;
  baselineYear: string;
  baselineValue: number;
  latestYear: string;
  latestValue: number;
};

export type EducationSourceEvidence = {
  label: string;
  period: string;
  sourceUrl: string;
  pdfPath?: string;
  sourceType: "PIB";
  note: string;
};

export const educationDevelopment = {
  title: "Education Development",
  source:
    "PIB, Ministry of Education, Strengthening India’s Educational Landscape, 21 Jun 2025",
  sourceUrl:
    "https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154714&ModuleId=3&reg=3&lang=2",
  seo: {
    title: "Education Development in India (2014-2025)",
    description:
      "Compare higher education institutions, universities, colleges, IITs, IIMs, AIIMS, EMRS schools, research infrastructure, and education rankings in India.",
    keywords: [
      "education development india",
      "higher education institutions india",
      "universities growth india",
      "IIT IIM AIIMS comparison",
      "EMRS schools india",
      "PM SHRI schools",
      "education infrastructure india",
    ],
  },
  higherEducation: {
    title: "Higher Education Expansion",
    data: [
      {
        metric: "Higher Education Institutions",
        baselineYear: "2014-15",
        baselineValue: 51534,
        latestYear: "June 2025",
        latestValue: 70018,
      },
      {
        metric: "Universities",
        baselineYear: "2014-15",
        baselineValue: 760,
        latestYear: "June 2025",
        latestValue: 1338,
      },
      {
        metric: "Colleges",
        baselineYear: "2014-15",
        baselineValue: 38498,
        latestYear: "June 2025",
        latestValue: 52081,
      },
      {
        metric: "IITs",
        baselineYear: "2014",
        baselineValue: 16,
        latestYear: "June 2025",
        latestValue: 23,
      },
      {
        metric: "IIMs",
        baselineYear: "2014",
        baselineValue: 13,
        latestYear: "June 2025",
        latestValue: 21,
      },
      {
        metric: "AIIMS",
        baselineYear: "2014",
        baselineValue: 7,
        latestYear: "June 2025",
        latestValue: 20,
      },
    ] satisfies EducationComparisonMetric[],
  },
  tribalEducation: {
    title: "Tribal Education - EMRS Schools",
    metric: "Functional Eklavya Model Residential Schools",
    baselineYear: "2013-14",
    baselineValue: 123,
    latestYear: "2024-25",
    latestValue: 477,
  },
  globalPresence: {
    title: "Global Education Presence",
    qsRankings: {
      metric: "Indian Universities in QS World University Rankings",
      baselineYear: "2015",
      baselineValue: 13,
      latestYear: "2026",
      latestValue: 54,
    },
    overseasIITCampuses: {
      baselineValue: 0,
      baselineLabel: "Before 2014",
      latestValue: 2,
      latestLabel: "By 2025",
      campuses: [
        "IIT Madras campus in Zanzibar",
        "IIT Delhi campus in Abu Dhabi",
      ],
    },
  },
  schoolModernization: {
    title: "School Modernization",
    pmShriSchoolsPlanned: 14500,
    displayValue: "14,500+ PM SHRI schools planned for upgradation",
  },
  researchInfrastructure: {
    title: "Research & Infrastructure Funding",
    hefaEstablished: 2017,
    loansSanctionedCrore: 43028.24,
    loansDisbursedCrore: 21590.59,
    institutionsCovered: 106,
    institutionsOfEminence: {
      total: 12,
      publicFunded: 8,
      private: 4,
    },
  },
  innovationRanking: {
    title: "Global Innovation Index Rank",
    note: "Lower rank is better",
    data: [
      { year: "2014", rank: 76 },
      { year: "2024", rank: 39 },
    ],
  },
  verificationEvidence: [
    {
      label: "Education development source",
      period: "2014-2025",
      sourceUrl:
        "https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=154714&ModuleId=3&reg=3&lang=2",
      pdfPath:
        "/source-snapshot/education-development/source-pdf/education-pib-2026.pdf",
      sourceType: "PIB",
      note: "Public PIB source used for higher education institutions, universities, colleges, IITs, IIMs, AIIMS, EMRS schools, PM SHRI schools, HEFA and education ranking indicators.",
    },
  ] satisfies EducationSourceEvidence[],
};
