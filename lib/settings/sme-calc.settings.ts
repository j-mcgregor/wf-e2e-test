// export const supportedCountries = countryCodeJSON.map(country => ({
//   optionName: country.name,
//   optionValue: country.code,
//   code: country.code,
// }));
// export const supportedCurrencies = currencyJSON.map(currency => ({
//   optionValue: createCurrencyString(currency),
//   code: currency.Code,
//   optionName: currency.CountryName
// }));

export const validCountryCodes = ['GB'];

// matches the names in the translation json
export const templateText = [
  {
    title: 'full_template',
    templateLink: '/download-templates/wf-mdi-template.csv',
    backgroundColor: 'bg-highlight bg-opacity-50'
  },
  {
    title: 'full_template_example',
    templateLink: '/download-templates/wf-mdi-example-template.csv',
    backgroundColor: 'bg-highlight bg-opacity-50'
  },
  {
    title: 'excel_full_template',
    templateLink: '/download-templates/WF-Manual-Upload-Template.xlsx',
    backgroundColor: 'bg-highlight-3 bg-opacity-50',
    disabled: true
  }
];

export const orbisAvailableSearchCountries = [
  'al',
  'at',
  'by',
  'be',
  'ba',
  'bg',
  'hr',
  'cy',
  'cz',
  'dk',
  'ee',
  'fi',
  'fr',
  'de',
  'gr',
  'hu',
  'is',
  'ie',
  'it',
  'kv',
  'lv',
  'li',
  'lt',
  'lu',
  'mt',
  'md',
  'mc',
  'nl',
  'mk',
  'no',
  'pl',
  'pt',
  'ro',
  'ru',
  'rs',
  'sk',
  'si',
  'es',
  'se',
  'ch',
  'tr',
  'ua'
];
