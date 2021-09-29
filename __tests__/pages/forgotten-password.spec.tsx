import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import allMessages from '../../messages/en';
import { makeMockSession, render } from '../../test-utils';
import ForgotPassword from '../../pages/forgotten-password';

jest.mock('next-auth/client');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('ForgotPassword', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });
  it('render the form without issue', () => {
    expect(() =>
      render(<ForgotPassword />, undefined, allMessages)
    ).not.toThrow();
  });
});
