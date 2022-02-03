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
import SkeletonMenu from '../SkeletonMenu';

jest.mock('next-auth/react');

describe('SkeletonMenu', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the SkeletonMenu without issue', () => {
    expect(() =>
      render(<SkeletonMenu items={2} />, {}, allMessages)
    ).not.toThrow();
  });
});
