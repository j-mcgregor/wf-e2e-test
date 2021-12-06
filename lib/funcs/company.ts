import { ApiResType, EUCompanyType } from '../../types/global';

const UK_COMPANY_KEYS = [
  'company_number',
  'date_of_creation',
  'title',
  'address_snippet'
];

const EU_COMPANY_KEYS = [
  'NAME',
  'BVDID',
  'ADDRESS_LINE1',
  'ADDRESS_LINE2',
  'CITY',
  'COUNTRY',
  'POSTCODE',
  'WEBSITE'
];

const reduceCompanies = (keys: string[], company: any) => {
  return keys.reduce((prevValue, value) => {
    return {
      ...prevValue,
      [value]: company[`${value}`]
    };
  }, {});
};

const filterUKCompanyInformation = (companies: [] | undefined) => {
  if (!companies) return companies;
  return (
    companies &&
    companies.map(company => {
      return reduceCompanies(UK_COMPANY_KEYS, company);
    })
  );
};

const filterEUCompanyInformation = (companies: [] | undefined) => {
  if (!companies) return companies;
  return (
    companies &&
    companies.map(company => {
      return reduceCompanies(EU_COMPANY_KEYS, company);
    })
  );
};

const searchUKCompaniesHouse = async (
  token: string | undefined,
  searchQuery: string
): Promise<ApiResType> => {
  if (!token) {
    return { ok: false };
  }
  const res = await fetch(
    `https://api.company-information.service.gov.uk/search/${searchQuery}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  );

  if (res.ok) {
    const results = await res.json();
    return { ok: true, data: results };
  }

  if (!res.ok) {
    return { ok: false, error: true };
  }
  return { ok: false };
};

const SearchOrbisCompanies = async (
  token: string | undefined,
  searchQuery: string,
  searchCountry: string
) => {
  try {
    const search = await fetch(
      'https://Orbis4europe.bvdinfo.com/api/orbis4europe//Companies/data',
      {
        method: 'POST',
        headers: {
          ApiToken: token || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          WHERE: [
            {
              MATCH: {
                Criteria: {
                  Name: searchQuery,
                  Country: searchCountry
                }
              }
            }
          ],
          SELECT: [
            'NAME',
            'BVDID',
            'STATUS',
            'ADDRESS_LINE1',
            'ADDRESS_LINE2',
            'CITY',
            'COUNTRY',
            'POSTCODE',
            'WEBSITE'
          ]
        })
      }
    );
    const results = await search.json();

    return { ok: true, data: results.Data };
  } catch (e: any) {
    return { ok: false, error: true };
  }
};

const Company = {
  searchUKCompaniesHouse,
  SearchOrbisCompanies,
  filterUKCompanyInformation,
  filterEUCompanyInformation
};

export default Company;
