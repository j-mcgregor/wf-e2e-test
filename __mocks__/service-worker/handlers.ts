/* eslint-disable no-console */
// src/mocks/handlers.js
import { rest } from 'msw';

import mockReport from '../../lib/mock-data/report';

export const handlers = [
  rest.get('http://localhost:3000/api/report/report', (req, res, ctx) => {
    const query = req.url.searchParams;
    const id = query.get('id');
    console.info(id);
    return res(ctx.delay(500), ctx.status(200), ctx.json(mockReport));
  })
];
