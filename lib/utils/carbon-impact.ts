export const getCarbonImpact = (categoryString: string) => {
  const categoryCode = categoriesToCodes[`${categoryString}`];
};

const categoriesToCodes: {
  [key: string]: { code: number; percentage: string };
} = {
  'Agriculture, Horticulture & Livestock': {
    code: 10,
    percentage: '74%'
  },
  'Mining & Extraction': {
    code: 11,
    percentage: '105%'
  },
  Utilities: {
    code: 12,
    percentage: '310%'
  },
  Construction: {
    code: 13,
    percentage: '11%'
  },
  'Food & Tobacco Manufacturing': {
    code: 14,
    percentage: '5%'
  },
  'Textiles & Clothing Manufacturing': {
    code: 15,
    percentage: '45%'
  },
  'Wood, Furniture & Paper Manufacturing': {
    code: 16,
    percentage: '45%'
  },
  'Printing & Publishing': {
    code: 17,
    percentage: '45%'
  },
  'Chemicals, Petroleum, Rubber & Plastic': {
    code: 18,
    percentage: '45%'
  },
  'Leather, Stone, Clay & Glass products': {
    code: 19,
    percentage: '45%'
  },
  'Metals & Metal Products': {
    code: 20,
    percentage: '45%'
  },
  'Industrial, Electric & Electronic Machinery': {
    code: 21,
    percentage: '45%'
  },
  'Computer Hardware': {
    code: 22,
    percentage: '45%'
  },
  Communications: {
    code: 23,
    percentage: '%'
  },
  'Transport Manufacturing': {
    code: 24,
    percentage: '%'
  },
  'Miscellaneous Manufacturing': {
    code: 25,
    percentage: '25%'
  },
  Wholesale: {
    code: 26,
    percentage: '7%'
  },
  Retail: {
    code: 27,
    percentage: '7%'
  },
  'Transport, Freight & Storage': {
    code: 28,
    percentage: '107%'
  },
  'Travel, Personal & Leisure': {
    code: 29,
    percentage: '%'
  },
  'Computer Software': {
    code: 30,
    percentage: '45%'
  },
  'Media & Broadcasting': {
    code: 31,
    percentage: '%'
  },
  'Banking, Insurance & Financial Services': {
    code: 32,
    percentage: '%'
  },
  'Property Services': {
    code: 33,
    percentage: '0%'
  },
  'Business Services': {
    code: 34,
    percentage: '%'
  },
  'Biotechnology and Life Sciences': {
    code: 35,
    percentage: '45%'
  },
  'Information Services': {
    code: 36,
    percentage: '%'
  },
  'Public Administration, Education, Health Social Services': {
    code: 37,
    percentage: '%'
  },
  'Waste Management & Treatment': {
    code: 38,
    percentage: '21%'
  }
};
