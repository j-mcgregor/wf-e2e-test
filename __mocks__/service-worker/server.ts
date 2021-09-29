import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

export const mockServerGet = (url: string, status: number, response: any) => {
  server.use(
    rest.get(url, (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(status), ctx.json(response));
    })
  );
}

export const mockServerPost = (url: string, status: number, response: any) => {
  server.use(
    rest.post(url, (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(response));
    })
  );
}