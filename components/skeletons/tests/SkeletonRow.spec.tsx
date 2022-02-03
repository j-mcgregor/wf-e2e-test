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
import SkeletonRow from '../SkeletonRow';

jest.mock('next-auth/react');

describe('SkeletonRow', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the SkeletonRow without issue', () => {
    expect(() =>
      render(
        <SkeletonRow cellQty={4} rowQty={4} className="get-some" />,
        {},
        allMessages
      )
    ).not.toThrow();
  });
});
