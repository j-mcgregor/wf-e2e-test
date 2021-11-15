import { ApiResType } from '../../types/global';

const validCountryCodes = [
  'us',
  'gb',
  'de',
  'it',
  'fr',
  'nl',
  'se',
  'dk',
  'fi',
  'hu',
  'no',
  'pl',
  'ru',
  'ua',
  'ch',
  'br',
  'nz',
  'mx',
  'au'
];

const getCompanyNews = async (
  companyName: string | undefined,
  countryCode?: string
): Promise<ApiResType> => {
  const lowerCaseCountryCode = countryCode ? countryCode.toLowerCase() : '';
  const validCountryCode =
    countryCode && validCountryCodes.includes(lowerCaseCountryCode)
      ? countryCode
      : 'us';
  const countryCodeString = `&country=${validCountryCode}`;

  if (!companyName) {
    return { ok: false };
  }

  const res = await fetch(
    `http://api.datanews.io/v1/headlines?q=${companyName}${countryCodeString}&size=10`,
    {
      method: 'GET',
      headers: {
        'x-api-key': `${process.env.DATA_NEWS_API_KEY}`
      }
    }
  );

  if (res.ok) {
    const results = await res.json();
    // returns an object with a hits key
    // the hits key has the data we need
    return { ok: true, data: results?.hits || [] };
  }

  if (!res.ok) {
    return { ok: false, error: true };
  }
  return { ok: false };
};

const News = {
  getCompanyNews
};

export default News;
