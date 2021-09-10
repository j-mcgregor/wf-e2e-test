import { rest } from 'msw';
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

export const mockBrowserGet = (url: string, status: number, response: any) => {
  worker.use(
    rest.get(url, (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(response));
    })
  );
};

export const mockBrowserPost = (url: string, status: number, response: any) => {
  worker.use(
    rest.post(url, (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(response));
    })
  );
};
