export const directIncomeTax = {
  title: "Direct Income Tax Comparison",
  source:
    "Union Budget historical tax slabs, Income Tax Act tax slabs FY 2013-14, and Union Budget 2025 New Tax Regime",
  sourceReferences: [
    {
      label: "Income Tax Act tax slabs FY 2013-14",
      url: "https://www.incometaxindia.gov.in/documents/20117/6507196/910110000000000135.pdf/09a201a9-7044-7d3f-376f-b1e23a4768b9?t=1762865513139",
    },
    {
      label: "Union Budget 2025 New Tax Regime",
      url: "https://www.indiabudget.gov.in/budget2025-26/doc/Budget_Speech.pdf",
    },
    {
      label: "Union Budget historical tax slabs",
      url: "https://www.indiabudget.gov.in/",
    },
  ],
  seo: {
    title: "Direct Income Tax Comparison for Salaried Employees (₹20 LPA)",
    description:
      "Compare income tax burden, effective tax rate, take-home salary, and tax savings for a salaried employee earning ₹20 lakh annually under FY2013-14 and FY2025-26 tax regimes.",
    keywords: [
      "direct income tax comparison",
      "income tax salaried employees India",
      "20 lakh salary tax comparison",
      "FY 2013-14 income tax",
      "FY 2025-26 new tax regime",
      "take home salary comparison India",
    ],
  },
  scenario: {
    salary: 2000000,
    description:
      "Salaried employee with ₹20 lakh annual income and no deductions",
    assumptions: [
      "No HRA exemption",
      "No home loan deduction",
      "No 80C deduction",
      "No NPS deduction",
      "No tax planning",
      "Pure salary income",
    ],
  },
  comparison: [
    {
      period: "FY 2013-14",
      government: "UPA Period",
      rules: [
        "Basic exemption: ₹2,00,000",
        "10% slab",
        "20% slab",
        "30% slab",
        "Education cess applicable",
      ],
      grossSalary: 2000000,
      taxPaid: 402000,
      effectiveTaxRate: 20.1,
      takeHomeIncome: 1598000,
    },
    {
      period: "FY 2025-26",
      government: "NDA Period",
      rules: [
        "New Tax Regime",
        "Revised tax slabs",
        "Standard deduction available",
        "Lower effective tax burden",
      ],
      grossSalary: 2000000,
      taxPaid: 234000,
      effectiveTaxRate: 11.7,
      takeHomeIncome: 1766000,
    },
  ],
  benefit: {
    annualTaxSaving: 168000,
    reductionPercent: 42,
    effectiveTaxRateDifference: 8.4,
    additionalTakeHomeIncome: 168000,
  },
};
