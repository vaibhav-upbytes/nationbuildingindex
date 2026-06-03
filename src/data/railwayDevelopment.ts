export const railwayDevelopment = {
  title: "Railway Development Comparison",
  source:
    "Indian Railways / CORE official electrification records and railway development data",
  sourceUrl:
    "https://core.indianrailways.gov.in/view_section.jsp?lang=0&id=0,294,302,536",

  electrification: {
    title: "Railway Electrification",
    unit: "km",
    data: [
      {
        year: "2005–06",
        electrifiedRunningTrackKm: 33540,
      },
      {
        year: "2014–15",
        electrifiedRunningTrackKm: 41038,
      },
    ],
    increaseBefore2014Km: 7498,
    post2014CoreRecord: {
      label: "CORE post-2014 route electrification note",
      electrifiedRouteKmTillMarch2024: 62119,
      electrifiedRouteKmSince2014: 40318,
      previousPeriodRouteKm: 5047,
      note: "CORE reports 62,119 RKM electrified till March 01, 2024, including 40,318 RKM since 2014.",
    },
  },

  lhbCoaches: {
    title: "LHB Coach Manufacturing",
    data: [
      {
        period: "2006–2014",
        government: "Manmohan Singh Government / UPA Period",
        coaches: 2209,
      },
      {
        period: "2014–2023",
        government: "Narendra Modi Government / NDA Period",
        coaches: 31956,
      },
    ],
  },

  bioToilets: {
    title: "Bio-toilets in Coaches",
    data: [
      {
        period: "2006–2014",
        government: "Manmohan Singh Government / UPA Period",
        coaches: 3647,
      },
      {
        period: "2014–2023",
        government: "Narendra Modi Government / NDA Period",
        coaches: 80478,
      },
    ],
  },

  trackLaying: {
    title: "Track Laying / Rail Track Work",
    unit: "RKM",
    data: [
      {
        period: "2004–2014",
        government: "Manmohan Singh Government / UPA Period",
        trackWorkRkm: 14985,
      },
      {
        period: "2014–2023",
        government: "Narendra Modi Government / NDA Period",
        trackWorkRkm: 25871,
      },
    ],
    highlight: "In 2022–23, 14 km track was laid per day.",
  },

  northEastConnectivity: {
    title: "Rail Connectivity to North-East States After 2014",
    states: [
      { state: "Meghalaya", date: "November 2014" },
      { state: "Arunachal Pradesh", date: "February 2015" },
      { state: "Manipur", station: "Jiribam", date: "May 2016" },
      { state: "Mizoram", station: "Bhairabi", date: "March 2016" },
    ],
  },

  cctvStations: {
    title: "CCTV Surveillance at Railway Stations",
    data: [
      {
        period: "Before 2014",
        stations: 123,
      },
      {
        period: "2014–2023",
        stations: 743,
      },
      {
        period: "By December 2024",
        stations: 1051,
      },
    ],
  },
};
