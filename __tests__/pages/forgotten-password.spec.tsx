import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../messages/en';
import ForgotPassword from '../../pages/forgotten-password';
import { makeMockSession, render } from '../../test-utils';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('ForgotPassword', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });
  it('render the form without issue', () => {
    expect(() =>
      render(<ForgotPassword />, undefined, allMessages)
    ).not.toThrow();
  });
});
