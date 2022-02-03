import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../../messages/en';
import { makeMockSession, render } from '../../../../test-utils';
import PasswordManagement from '../PasswordManagement';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('PasswordManagement', () => {
  it('render the form without issue', () => {
    expect(() =>
      render(<PasswordManagement />, undefined, allMessages)
    ).not.toThrow();
  });
});
