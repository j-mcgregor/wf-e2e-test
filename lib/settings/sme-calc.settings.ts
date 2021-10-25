import currencyJSON from '../data/countryCurrency.json';

export const countries = currencyJSON.map(currency => ({
  optionValue: currency.CountryName
}));
export const validCountryCodes = ['GB'];

// matches the names in the translation json
export const templateText = [
  {
    title: 'full_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight bg-opacity-50'
  },
  {
    title: 'financials_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight bg-opacity-50'
  },
  {
    title: 'excel_full_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight-3 bg-opacity-50'
  },
  {
    title: 'excel_financials_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight-3 bg-opacity-50'
  }
];
