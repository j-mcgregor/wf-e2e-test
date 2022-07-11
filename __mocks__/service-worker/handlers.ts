/* eslint-disable no-console */
// src/mocks/handlers.js
import { rest } from 'msw';

import { mockReport } from '../../lib/mock-data/newReport';

export const handlers = [
  rest.get('http://localhost:3000/api/search-companies', (req, res, ctx) => {
    const params = req.url.searchParams;
    const query = params.get('query');
    const country = params.get('country');

    let data: any[] = [];
    if (query === 'boo' && country === 'FR') {
      data = Array(4)
        .fill({
          company_number: 'company_number {id}',
          name: 'name {id}',
          address_snippet: 'address_snippet {id}'
        })
        .map(({ company_number, name, address_snippet }, i) => ({
          company_number: company_number.replace('{id}', i),
          name: name.replace('{id}', i),
          address_snippet: address_snippet.replace('{id}', i)
        }));
    }
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        data
      })
    );
  }),
  rest.get('http://localhost:3000/api/reports/report', (req, res, ctx) => {
    const query = req.url.searchParams;
    const id = query.get('id');
    console.info(id);
    return res(ctx.delay(500), ctx.status(200), ctx.json(mockReport));
  }),
  rest.get(
    'http://localhost:3000/api/integrations/codat/companies',
    (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          isError: false,
          data: {
            companies: [
              {
                company_id: '456',
                connection_id: 'connection-456',
                company_name: 'Avengers',
                first: new Date('2021-01-01').toDateString(),
                last: new Date('2021-02-01').toDateString()
              },
              {
                company_id: '789',
                connection_id: 'connection-789',
                company_name: 'Guardians of the Galaxy',
                first: new Date('2021-01-01').toDateString(),
                last: new Date('2021-02-01').toDateString()
              }
            ]
          }
        })
      );
    }
  ),
  rest.get(
    'http://localhost:3000/api/integrations/codat/account-categorisation',
    (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          isError: false,
          data: {
            uncategorised_accounts: [
              {
                id: 'potato',
                name: 'Is Potato'
              }
            ]
          }
        })
      );
    }
  )
];
