import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import resetPasswordMessages from '../../../../messages/en/reset-password.en.json';
import { makeMockSession, render } from '../../../../test-utils';
import ResetPasswordForm from '../ResetPasswordForm';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('ResetPasswordForm', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the form without issue', () => {
    expect(() =>
      render(<ResetPasswordForm />, undefined, resetPasswordMessages)
    ).not.toThrow();
  });
});
