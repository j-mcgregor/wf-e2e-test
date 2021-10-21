import currencyJSON from '../../lib/data/countryCurrency.json';

export const countries = currencyJSON.map(currency => ({
  optionValue: currency.CountryName
}));

export const validCountryCodes = ['GB'];
