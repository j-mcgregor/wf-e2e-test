/**
 * THIS IS A VERY BASIC TEST SUITE SETUP.
 * IT ONLY TESTS THE COMPONENT DOESN'T THROW WHEN RENDERING.
 * MORE TESTS SHOULD BE ADDED BY DEVS AS THE PROJECT GROWS.
 * REMOVE THIS NOTE WHEN MORE TESTS ARE ADDED.
 */
import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import allMessages from '../../../messages/en';
import { makeMockSession, render } from '../../../test-utils';
import ReportNav from '../ReportNav';

jest.mock('next-auth/client');

describe('PasswordReset', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({
      asPath: ''
    }));
    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the ReportNav without issue', () => {
    expect(() =>
      render(<ReportNav companyName="Wayne Industries" />, {}, allMessages)
    ).not.toThrow();
  });
});
