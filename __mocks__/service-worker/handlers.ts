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
    return res(ctx.delay(500), ctx.status(200), ctx.json(data));
  }),
  rest.get('http://localhost:3000/api/reports/report', (req, res, ctx) => {
    const query = req.url.searchParams;
    const id = query.get('id');
    console.info(id);
    return res(ctx.delay(500), ctx.status(200), ctx.json(mockReport));
  }),
  rest.get('http://localhost:3000/api/reports/news', (req, res, ctx) => {
    const data = Array(4)
      .fill({
        source: 'source {id}',
        title: 'title {id}',
        content: 'content {id}',
        url: 'http://url.com/{id}',
        pubDate: 'some_pubDate'
      })
      .map(({ source, title, content, url, pubDate }, i) => ({
        source: source.replace('{id}', i),
        title: title.replace('{id}', i),
        content: content.replace('{id}', i),
        url: url.replace('{id}', i)
      }));
    const query = req.url.searchParams;
    const company_name = query.get('company_name');
    const country = query.get('country');
    // console.info(country, company_name);
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        ok: true,
        data
      })
    );
  })
];
