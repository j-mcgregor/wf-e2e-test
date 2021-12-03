import type { NextApiRequest, NextApiResponse } from 'next';

const SearchOrbis = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const search = await fetch(
    'https://Orbis4europe.bvdinfo.com/api/orbis4europe//Companies/data',
    {
      method: 'POST',
      headers: {
        ApiToken: '327Z772942a21475eb1194de00155d115b03',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        WHERE: [
          {
            MATCH: {
              Criteria: {
                Name: 'Wiserfunding',
                Country: 'ie'
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

  // const json = await search.json();
  // console.log('json');
  // console.log(json);

  return response.status(200).json({ search });
};

export default SearchOrbis;
