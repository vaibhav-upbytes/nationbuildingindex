export type SchemeRoadLength = {
  scheme: string;
  lengthKm: number;
};

export type SchemeBridgeCount = {
  scheme: string;
  count: number;
};

export type RuralRoadSourceSnapshot = {
  period: string;
  endpoint: string;
  fromDate: string;
  toDate: string;
  schemeIds: string;
  dateCaptured: string;
  capturedFrom: string;
  htmlSnapshotPath: string;
  imageSnapshotPath: string;
  extractionNote: string;
};

export type RuralRoadDevelopmentPeriod = {
  period: string;
  government: string;
  totalRoadLengthKm: number;
  totalBridges: number;
  roadsByScheme: SchemeRoadLength[];
  bridgesByScheme: SchemeBridgeCount[];
  sourceSnapshot: RuralRoadSourceSnapshot;
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
      sourceSnapshot: {
        period: "2004-2014",
        endpoint: "https://pmgsy.dord.gov.in/dbweb/Home/PMGSYHalfView",
        fromDate: "2004-05-01",
        toDate: "2014-06-01",
        schemeIds: "1,2,3,4,5,6,7",
        dateCaptured: "2026-06-08",
        capturedFrom: "PMGSY/OMMAS",
        htmlSnapshotPath:
          "/source-snapshot/rural-development/source-html/pmgsy-2004-2014.html",
        imageSnapshotPath:
          "/source-snapshot/rural-development/source-image/pmgsy-2004-2014.png",
        extractionNote:
          "Values were extracted from the linked official HTML snapshot.",
      },
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
      sourceSnapshot: {
        period: "2014-2026",
        endpoint: "https://pmgsy.dord.gov.in/dbweb/Home/PMGSYHalfView",
        fromDate: "2014-06-01",
        toDate: "2026-06-01",
        schemeIds: "1,2,3,4,5,6,7",
        dateCaptured: "2026-06-08",
        capturedFrom: "PMGSY/OMMAS",
        htmlSnapshotPath:
          "/source-snapshot/rural-development/source-html/pmgsy-2014-2026.html",
        imageSnapshotPath:
          "/source-snapshot/rural-development/source-image/pmgsy-2014-2026.png",
        extractionNote:
          "Values were extracted from the linked official HTML snapshot.",
      },
    },
  ],
};
