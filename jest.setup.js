import '@testing-library/jest-dom/extend-expect';
import 'isomorphic-fetch';
import { cache } from 'swr';

import { server } from './__mocks__/service-worker/server';

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn().mockReturnValue(null),
    unobserve: jest.fn().mockReturnValue(null),
    disconnect: jest.fn().mockReturnValue(null)
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cache?.clear();
});

afterAll(() => server.close());
