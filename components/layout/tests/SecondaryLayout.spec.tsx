/**
 * THIS IS A VERY BASIC TEST SUITE SETUP.
 * IT ONLY TESTS THE COMPONENT DOESN'T THROW WHEN RENDERING.
 * MORE TESTS SHOULD BE ADDED BY DEVS AS THE PROJECT GROWS.
 * REMOVE THIS NOTE WHEN MORE TESTS ARE ADDED.
 */
import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../messages/en';
import { makeMockSession, render } from '../../../test-utils';
import SecondaryLayout from '../SecondaryLayout';

jest.mock('next-auth/react');

describe('SecondaryLayout', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({
      asPath: ''
    }));
    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the SecondaryLayout without issue', () => {
    expect(() => render(<SecondaryLayout />, {}, allMessages)).not.toThrow();
  });
});
