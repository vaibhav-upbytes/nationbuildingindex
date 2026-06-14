import { highwayExpresswayDevelopment } from "@/data/highwayExpresswayDevelopment";
import { metroRailDevelopment } from "@/data/metroRailDevelopment";
import { povertyReduction } from "@/data/povertyReduction";
import { railwayDevelopment } from "@/data/railwayDevelopment";
import { ruralElectrification } from "@/data/ruralElectrification";
import { ruralRoadDevelopment } from "@/data/ruralDevelopment";
import { urbanHousingDevelopment } from "@/data/urbanDevelopment";
import { waterDevelopment } from "@/data/waterDevelopment";

export type NationalDashboardMetric = {
  id: string;
  title: string;
  value: number;
  suffix: string;
  startYear: string;
  endYear: string;
  shortDescription: string;
  sourceName: string;
  sourceUrl: string;
  category: string;
  accentColor: "saffron" | "green" | "blue" | "slate";
  icon: string;
  progressPercent: number;
  valuePrefix?: string;
  valueScale?: "raw" | "lakh" | "crore" | "million";
};

const ruralRoadLatest = ruralRoadDevelopment.periods[1];
const jjm = waterDevelopment.jalJeevanMission;
const householdElectrification = ruralElectrification.achievements[1];
const completedUrbanHouses = urbanHousingDevelopment.periods[1].metrics.find(
  (metric) => metric.label === "Houses completed",
);
const metroLatest = metroRailDevelopment.periods[1];
const multidimensionalPovertyReduction =
  povertyReduction.detailedMetrics.multidimensionalPoverty.startRate -
  povertyReduction.detailedMetrics.multidimensionalPoverty.latestRate;

export const nationalDashboardMetrics: NationalDashboardMetric[] = [
  {
    id: "multidimensional-poverty",
    title: "Multidimensional poverty reduction",
    value: multidimensionalPovertyReduction,
    suffix: "percentage points",
    startYear: povertyReduction.detailedMetrics.multidimensionalPoverty.startYear,
    endYear: povertyReduction.detailedMetrics.multidimensionalPoverty.latestYear,
    shortDescription:
      "Reduction in multidimensional poverty rate based on the existing poverty dataset.",
    sourceName: "PIB / Poverty references",
    sourceUrl: povertyReduction.sources[2].url,
    category: "Human development",
    accentColor: "green",
    icon: "HD",
    progressPercent: 71,
  },
  {
    id: "rural-roads",
    title: "Rural roads constructed",
    value: ruralRoadLatest.totalRoadLengthKm,
    suffix: "km",
    startYear: ruralRoadLatest.period.split("–")[0],
    endYear: ruralRoadLatest.period.split("–")[1],
    shortDescription:
      "Completed PMGSY road length from the captured official OMMAS source snapshot.",
    sourceName: ruralRoadDevelopment.source,
    sourceUrl: ruralRoadLatest.sourceSnapshot.htmlSnapshotPath,
    category: "Rural infrastructure",
    accentColor: "saffron",
    icon: "RD",
    progressPercent: 92,
  },
  {
    id: "tap-water",
    title: "Household tap water connections",
    value: jjm.additionalHouseholdsCrore,
    suffix: "crore households",
    startYear: jjm.launched,
    endYear: jjm.progressAsOf,
    shortDescription:
      "Additional rural households provided tap water connections under Jal Jeevan Mission.",
    sourceName: waterDevelopment.source,
    sourceUrl: waterDevelopment.sourceUrl,
    category: "Public services",
    accentColor: "blue",
    icon: "WT",
    progressPercent: Math.round(jjm.totalCoveragePercent),
  },
  {
    id: "household-electrification",
    title: "Households electrified",
    value: householdElectrification.value,
    suffix: "households",
    startYear: "2014",
    endYear: "2022",
    shortDescription:
      "Households electrified as reported in the rural electrification source data.",
    sourceName: ruralElectrification.source,
    sourceUrl: ruralElectrification.sourceUrl,
    category: "Energy access",
    accentColor: "green",
    icon: "EL",
    progressPercent: 88,
    valueScale: "crore",
  },
  {
    id: "urban-housing",
    title: "Urban houses completed",
    value: completedUrbanHouses?.valueLakh ?? 0,
    suffix: "lakh houses",
    startYear: urbanHousingDevelopment.periods[1].period.split("–")[0],
    endYear: urbanHousingDevelopment.periods[1].period.split("–")[1],
    shortDescription:
      "Completed urban houses under the latest period in the housing dataset.",
    sourceName: urbanHousingDevelopment.source,
    sourceUrl: urbanHousingDevelopment.sourceUrl,
    category: "Housing",
    accentColor: "saffron",
    icon: "HS",
    progressPercent: 82,
  },
  {
    id: "railway-electrification",
    title: "Railway electrification",
    value:
      railwayDevelopment.electrification.post2014CoreRecord.electrifiedRouteKmSince2014,
    suffix: "RKM",
    startYear: "2014",
    endYear: "2024",
    shortDescription:
      "Route kilometres electrified since 2014 as recorded in the CORE reference note.",
    sourceName: railwayDevelopment.source,
    sourceUrl: railwayDevelopment.sourceUrl,
    category: "Rail connectivity",
    accentColor: "blue",
    icon: "RY",
    progressPercent: 86,
  },
  {
    id: "metro-network",
    title: "Operational metro network",
    value: metroLatest.operationalNetworkKm,
    suffix: "km",
    startYear: metroLatest.period.split("–")[0],
    endYear: metroLatest.period.split("–")[1],
    shortDescription:
      "Total operational metro rail network in cities covered by the metro dataset.",
    sourceName: metroRailDevelopment.source,
    sourceUrl: metroRailDevelopment.sourceUrl,
    category: "Urban mobility",
    accentColor: "green",
    icon: "MR",
    progressPercent: 78,
  },
  {
    id: "national-highways",
    title: "National Highway expansion",
    value: highwayExpresswayDevelopment.nationalHighways.increaseKm,
    suffix: "km added",
    startYear: "2014",
    endYear: "2025",
    shortDescription:
      "Increase in the National Highway network from the highway development dataset.",
    sourceName: highwayExpresswayDevelopment.source,
    sourceUrl: highwayExpresswayDevelopment.sourceUrl,
    category: "Road connectivity",
    accentColor: "saffron",
    icon: "HW",
    progressPercent: highwayExpresswayDevelopment.nationalHighways.growthPercent,
  },
];
