import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../messages/en';
import { makeMockSession, render } from '../../test-utils';
import PasswordReset from '../../pages/password-reset';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('PasswordReset', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the form without issue', () => {
    expect(() =>
      render(<PasswordReset token="1234" isValid />, {}, allMessages)
    ).not.toThrow();
  });
});
