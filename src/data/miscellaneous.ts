export type MiscellaneousSourceEvidence = {
  label: string;
  period: string;
  sourceUrl: string;
  imagePath: string;
  sourceType: "PPAC" | "RBI" | "IOCL";
  note: string;
};

export const miscellaneous = {
  title: "Miscellaneous: Fuel Prices & Currency Movement",
  note: "Fuel prices are shown for Delhi as a benchmark city. Petrol, diesel and LPG prices vary by state, city, taxes and subsidy rules. LPG comparison uses non-subsidised 14.2 kg domestic cylinder price where available.",
  context:
    "Fuel and LPG prices are affected by global crude prices, taxes, subsidies, exchange rate movements and state VAT. This section shows benchmark price movement, not a complete affordability analysis.",
  lpgDisclaimer:
    "LPG comparison is indicative because subsidy rules and direct benefit transfer changed over time.",
  seo: {
    title: "Fuel Prices and Currency Movement in India: 2004–2014 vs 2014–2025",
    description:
      "Compare petrol, diesel, LPG cylinder prices and USD-INR exchange rate movement across 2004–2014 and 2014–2025 using benchmark Delhi fuel prices and RBI exchange rate references.",
    keywords: [
      "fuel prices India comparison",
      "petrol diesel price Delhi",
      "LPG cylinder price India",
      "USD INR exchange rate",
      "currency movement India",
      "fuel prices 2004 2014 2025",
    ],
  },
  sources: [
    {
      label: "PPAC petrol/diesel historical retail prices",
      url: "https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/rsp-of-petrol-and-diesel-at-delhi-up-to-15-6-2017",
    },
    {
      label: "PPAC petroleum price records",
      url: "https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/price-build-up-of-petrol-and-diesel",
    },
    {
      label: "IndianOil non-subsidised 14.2 kg LPG prices",
      url: "https://iocl.com/indane-14Kg-nonsubsid-previous-price",
    },
    {
      label: "RBI Reference Rate Archive",
      url: "https://www.rbi.org.in/scripts/referenceratearchive.aspx",
    },
    {
      label: "Wikipedia Economy of India context",
      url: "https://en.wikipedia.org/wiki/Economy_of_India",
    },
  ],
  fuelPrices: {
    city: "Delhi",
    petrol: {
      unit: "₹/litre",
      data: [
        {
          period: "2004–2014",
          startYear: "2004",
          endYear: "2014",
          startPrice: 34,
          endPrice: 72.26,
          increase: 38.26,
          note: "2014 value is Delhi petrol price as on 01-Apr-2014 from PPAC.",
        },
        {
          period: "2014–2025",
          startYear: "2014",
          endYear: "2025",
          startPrice: 72.26,
          endPrice: 94.77,
          increase: 22.51,
          note: "2025 value uses Delhi petrol price buildup effective 01-Aug-2025.",
        },
      ],
    },
    diesel: {
      unit: "₹/litre",
      data: [
        {
          period: "2004–2014",
          startYear: "2004",
          endYear: "2014",
          startPrice: 22,
          endPrice: 55.49,
          increase: 33.49,
          isApproximateStart: true,
          note: "2014 value is Delhi diesel price as on 01-Apr-2014 from PPAC.",
        },
        {
          period: "2014–2025",
          startYear: "2014",
          endYear: "2025",
          startPrice: 55.49,
          endPrice: 87.67,
          increase: 32.18,
          note: "Use latest available 2025 Delhi benchmark price from PPAC/IOC.",
        },
      ],
    },
    lpg: {
      unit: "₹/14.2 kg cylinder",
      comparisonType: "Non-subsidised domestic LPG",
      data: [
        {
          period: "2004–2014",
          startYear: "2004",
          endYear: "2014",
          startPrice: 261,
          endPrice: 1241,
          increase: 980,
          isApproximateStart: true,
          note: "LPG price comparison is indicative because subsidy rules changed.",
        },
        {
          period: "2014–2025",
          startYear: "2014",
          endYear: "2025",
          startPrice: 1241,
          endPrice: 853,
          increase: -388,
          note: "2025 value uses non-subsidised 14.2 kg Indane LPG Delhi price.",
        },
      ],
    },
  },
  currency: {
    title: "USD-INR Exchange Rate Movement",
    unit: "₹ per USD",
    data: [
      {
        period: "2004–2014",
        startYear: "2004",
        endYear: "2014",
        startRate: 45.32,
        endRate: 61.03,
        depreciation: 15.71,
      },
      {
        period: "2014–2025",
        startYear: "2014",
        endYear: "2025",
        startRate: 61.03,
        endRate: 85.61,
        depreciation: 24.58,
      },
    ],
    note: "Currency rates fluctuate daily. This comparison uses endpoint benchmark values from RBI/reference exchange-rate records.",
  },
  verificationEvidence: [
    {
      label: "Petrol and diesel retail price source",
      period: "2003-2017",
      sourceUrl:
        "https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/rsp-of-petrol-and-diesel-at-delhi-up-to-15-6-2017",
      imagePath:
        "/source-snapshot/miscellaneous/source-image/fuel-pricing-2003-2017.png",
      sourceType: "PPAC",
      note: "Public PPAC source used for Delhi petrol and diesel benchmark retail selling price references.",
    },
    {
      label: "USD-INR reference rate source",
      period: "2004-2024",
      sourceUrl: "https://www.rbi.org.in/scripts/referenceratearchive.aspx",
      imagePath:
        "/source-snapshot/miscellaneous/source-image/rbi-dollar-rate-2004-2024.png",
      sourceType: "RBI",
      note: "Public RBI source used for USD-INR reference rate archive and endpoint currency movement.",
    },
    {
      label: "Non-subsidised domestic LPG source",
      period: "2014-2024",
      sourceUrl: "https://iocl.com/indane-14Kg-nonsubsid-previous-price",
      imagePath:
        "/source-snapshot/miscellaneous/source-image/iocl.com_indane-14Kg-nonsubsid-2014-2024.png",
      sourceType: "IOCL",
      note: "Public IndianOil source used for non-subsidised 14.2 kg domestic LPG price references.",
    },
  ] satisfies MiscellaneousSourceEvidence[],
};
