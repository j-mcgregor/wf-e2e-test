import { ApiResType, CompanyType } from '../../types/global';
import { fetchWrapper } from '../utils/fetchWrapper';

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

const filterAndReduceEUCompanyInformation = (companies: [] | undefined) => {
  if (!companies) return companies;
  return (
    companies &&
    companies
      .filter((company: CompanyType) => {
        // only return companies with a BVDID
        return !!company.BVDID;
      })
      .map(company => {
        return reduceCompanies(EU_COMPANY_KEYS, company);
      })
  );
};

// maps the Orbis Data returned to the correct response format
const mapEUCompanyDataToResponseFormat = (
  companies: {}[] | undefined,
  countryCode: string
) => {
  if (!companies) return companies;

  return companies.map((company: any) => {
    // was used to remove the * that some id's returned
    const cleanBVDID = company?.BVDID;

    // check first two characters of the BVDID code against the country code (from query)
    // if so, returns BVDID with first to characters removed
    // else returns original BVDID
    const BVDID =
      cleanBVDID?.slice(0, 2).toLowerCase() === countryCode
        ? cleanBVDID.substring(2)
        : cleanBVDID;

    const addressLine1 = company?.ADDRESS_LINE1 || '';
    const addressLine2 = company?.ADDRESS_LINE2 || '';
    const addressLine3 = company?.CITY || '';
    const addressLine4 = company?.COUNTRY || '';
    const addressLine5 = company?.POSTCODE || '';

    return {
      company_number: BVDID,
      date_of_creation: null, // not available in Orbis API
      address_snippet: `${addressLine1} ${addressLine2} ${addressLine3} ${addressLine4} ${addressLine5} `,
      title: company?.NAME
    };
  });
};

const searchUKCompaniesHouse = async (
  token: string | undefined,
  searchQuery: string
): Promise<ApiResType> => {
  try {
    if (!token) {
      return { ok: false };
    }
    const res = await fetchWrapper(
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
      const html = await res.text();
      // cleaned repsponse to be sent to Sentry
      const err = {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        url: res.url,
        html
      };

      return {
        ok: false,
        error: true,
        message: JSON.stringify(err),
        status: res.status
      };
    }
  } catch (e: any) {
    return { ok: false, error: true, message: e.message };
  }
  return { ok: false, error: true, message: 'Failed request' };
};

const SearchOrbisCompanies = async (
  token: string | undefined,
  searchQuery: string,
  searchCountry: string
) => {
  try {
    const res = await fetchWrapper(
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
    if (!res.ok) {
      return { ok: false, error: true, message: res.statusText };
    }

    const results = await res.json();

    return { ok: true, data: results.Data };
  } catch (e: any) {
    return { ok: false, error: true, message: e.message };
  }
};

const Company = {
  searchUKCompaniesHouse,
  SearchOrbisCompanies,
  filterUKCompanyInformation,
  filterAndReduceEUCompanyInformation,
  mapEUCompanyDataToResponseFormat
};

export default Company;
