export type RuralElectrificationSourceEvidence = {
  label: string;
  period: string;
  sourceUrl: string;
  screenshotPath: string;
  pdfPath?: string;
  sourceType: "PIB";
  note: string;
};

export const ruralElectrification = {
  title: "Rural Electrification: Village & Household Electricity Access",
  source: "PIB, Ministry of Power, Rural Electrification Schemes, 15 Dec 2022",
  sourceUrl:
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1883918&reg=3&lang=2",

  schemes: [
    {
      name: "Deen Dayal Upadhyaya Gram Jyoti Yojana",
      shortName: "DDUGJY",
      launched: "December 2014",
      focus:
        "Village electrification and rural power distribution strengthening",
      objectives: [
        "Electrification of all un-electrified villages as per Census 2011",
        "Strengthening rural sub-transmission and distribution infrastructure",
        "Construction of HT and LT lines",
        "Metering at distribution transformers, feeders and consumers",
        "Feeder segregation",
      ],
    },
    {
      name: "Pradhan Mantri Sahaj Bijli Har Ghar Yojana",
      shortName: "Saubhagya",
      launched: "October 2017",
      focus: "Universal household electrification",
      objectives: [
        "Electricity connections to all un-electrified rural households",
        "Electricity connections to poor urban households",
        "Universal household electrification",
      ],
    },
  ],

  achievements: [
    {
      label: "Households electrified under Saubhagya up to 31 March 2021",
      value: 28170000,
      displayValue: "2.817 crore",
    },
    {
      label: "Total households electrified till PIB release date",
      value: 28600000,
      displayValue: "2.86 crore",
    },
    {
      label:
        "Households remaining in LWE affected areas of Chhattisgarh as of 31 March 2019",
      value: 18734,
      displayValue: "18,734",
    },
    {
      label:
        "Previously unwilling households later sanctioned for electrification",
      value: 1909000,
      displayValue: "19.09 lakh",
    },
    {
      label: "Additional households later reported for electrification",
      value: 1184000,
      displayValue: "11.84 lakh",
    },
  ],

  sevenStatesReported100PercentElectrification: [
    "Assam",
    "Chhattisgarh",
    "Jharkhand",
    "Karnataka",
    "Manipur",
    "Rajasthan",
    "Uttar Pradesh",
  ],

  timeline: [
    {
      date: "December 2014",
      event: "DDUGJY launched",
    },
    {
      date: "October 2017",
      event: "Saubhagya launched",
    },
    {
      date: "31 March 2019",
      event:
        "States reported household electrification except 18,734 LWE households in Chhattisgarh",
    },
    {
      date: "31 March 2021",
      event: "Seven states reported 100% household electrification",
    },
    {
      date: "15 December 2022",
      event: "PIB reported total 2.86 crore households electrified",
    },
  ],

  comparisonSummary: {
    before2014:
      "Rural electrification existed through earlier schemes, but universal household electrification had not been achieved.",
    after2014:
      "DDUGJY and Saubhagya focused on village electrification, rural distribution strengthening and universal household electricity connections. A total of 2.86 crore households were electrified as per PIB data.",
  },

  verificationEvidence: [
    {
      label:
        "Rural electrification schemes and household electrification source",
      period: "2014-2022",
      sourceUrl:
        "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1883918&reg=3&lang=2",
      screenshotPath:
        "/source-snapshot/rural-electrification/source-image/rural-electrification-pib-2022.png",
      pdfPath:
        "/source-snapshot/rural-electrification/source-pdf/rural-electrification-pib.pdf",
      sourceType: "PIB",
      note: "Public PIB source used for DDUGJY, Saubhagya and household electrification outcome indicators.",
    },
  ] satisfies RuralElectrificationSourceEvidence[],
};
