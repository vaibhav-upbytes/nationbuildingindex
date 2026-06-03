export type UrbanHousingMetric = {
  label: string;
  valueLakh: number;
  description: string;
};

export type UrbanHousingPeriod = {
  period: string;
  government: string;
  schemes: string;
  metrics: UrbanHousingMetric[];
};

export const urbanHousingDevelopment = {
  title: "Urban Development – Housing",
  source: "PIB press release: Infrastructure Development in India",
  sourceUrl:
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098788&reg=3&lang=2",
  periods: [
    {
      period: "2004–2014",
      government: "Manmohan Singh Government / UPA Period",
      schemes: "JnNURM and RRY",
      metrics: [
        {
          label: "Houses approved",
          valueLakh: 13.46,
          description: "Approved under schemes like JnNURM and RRY",
        },
        {
          label: "Houses completed",
          valueLakh: 8.04,
          description: "Built during 2004–2014",
        },
      ],
    },
    {
      period: "2015–2024",
      government: "Narendra Modi Government / NDA Period",
      schemes: "PMAY-U",
      metrics: [
        {
          label: "Houses approved",
          valueLakh: 118.64,
          description: "Approved under PMAY-U",
        },
        {
          label: "Houses completed",
          valueLakh: 88.32,
          description: "Completed under PMAY-U",
        },
      ],
    },
  ],
  comparisons: [
    {
      label: "Approved houses",
      multiplier: "9x",
      summary:
        "Approved houses increased from 13.46 lakh in 2004–2014 to 118.64 lakh in 2015–2024.",
    },
    {
      label: "Completed houses",
      multiplier: "11x",
      summary:
        "Completed houses increased from 8.04 lakh in 2004–2014 to 88.32 lakh in 2015–2024.",
    },
  ],
};
