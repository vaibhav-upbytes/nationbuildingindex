export type SchemeRoadLength = {
  scheme: string;
  lengthKm: number;
};

export type SchemeBridgeCount = {
  scheme: string;
  count: number;
};

export type RuralRoadDevelopmentPeriod = {
  period: string;
  government: string;
  totalRoadLengthKm: number;
  totalBridges: number;
  roadsByScheme: SchemeRoadLength[];
  bridgesByScheme: SchemeBridgeCount[];
};

export const ruralRoadDevelopment = {
  title: "Rural Road Development – PMGSY",
  source: "PMGSY official records / OMMAS data",
  periods: [
    {
      period: "2004–2014",
      government: "Manmohan Singh Government / UPA Period",
      totalRoadLengthKm: 335670,
      totalBridges: 484,
      roadsByScheme: [
        { scheme: "PMGSY-I", lengthKm: 335670 },
        { scheme: "PMGSY-II", lengthKm: 0 },
      ],
      bridgesByScheme: [
        { scheme: "PMGSY-I", count: 484 },
        { scheme: "PMGSY-II", count: 0 },
      ],
    },
    {
      period: "2014–2026",
      government: "Narendra Modi Government / NDA Period",
      totalRoadLengthKm: 409259,
      totalBridges: 10248,
      roadsByScheme: [
        { scheme: "PMGSY-I", lengthKm: 239261 },
        { scheme: "PMGSY-II", lengthKm: 49130 },
        { scheme: "RCPLWEA", lengthKm: 9924 },
        { scheme: "PMGSY-III", lengthKm: 107916 },
        { scheme: "VVP", lengthKm: 196 },
        { scheme: "PM-JANMAN", lengthKm: 2809 },
        { scheme: "PMGSY-IV", lengthKm: 23 },
      ],
      bridgesByScheme: [
        { scheme: "PMGSY-I", count: 6761 },
        { scheme: "PMGSY-II", count: 750 },
        { scheme: "RCPLWEA", count: 570 },
        { scheme: "PMGSY-III", count: 2167 },
        { scheme: "VVP", count: 0 },
        { scheme: "PM-JANMAN", count: 0 },
        { scheme: "PMGSY-IV", count: 0 },
      ],
    },
  ],
};
