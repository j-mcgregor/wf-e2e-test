import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import allMessages from '../../messages/en';
import { makeMockSession, render } from '../../test-utils';
import PasswordReset from '../../pages/password-reset';

jest.mock('next-auth/client');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('PasswordReset', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the form without issue', () => {
    expect(() =>
      render(
        <PasswordReset email="batman@wayneindustries.com" isValid />,
        {},
        allMessages
      )
    ).not.toThrow();
  });
});
