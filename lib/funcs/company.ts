import { ApiResType } from '../../types/global';

const UK_COMPANY_KEYS = [
  'company_number',
  'date_of_creation',
  'title',
  'address_snippet'
];

const filterUKCompanyInformation = (companies: [] | undefined) => {
  if (!companies) return companies;
  return (
    companies &&
    companies.map(company => {
      return UK_COMPANY_KEYS.reduce((prevValue, value) => {
        return {
          ...prevValue,
          [value]: company[`${value}`]
        };
      }, {});
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

const Company = {
  searchUKCompaniesHouse,
  filterUKCompanyInformation
};

export default Company;
