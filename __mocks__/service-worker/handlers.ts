/* eslint-disable no-console */
// src/mocks/handlers.js
import { rest } from 'msw';

import { MockReportData } from '../../lib/mock-data/report';

export const handlers = [
  rest.get('http://localhost:3000/api/report', (req, res, ctx) => {
    const query = req.url.searchParams;
    const id = query.get('id');
    console.log('ID: ', id);
    return res(ctx.delay(500), ctx.status(200), ctx.json(MockReportData));
  })
];
