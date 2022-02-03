/**
 * THIS IS A VERY BASIC TEST SUITE SETUP.
 * IT ONLY TESTS THE COMPONENT DOESN'T THROW WHEN RENDERING.
 * MORE TESTS SHOULD BE ADDED BY DEVS AS THE PROJECT GROWS.
 * REMOVE THIS NOTE WHEN MORE TESTS ARE ADDED.
 */
import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../../messages/en';
import { makeMockSession, render } from '../../../../test-utils';
import SummaryMap from '../SummaryMap';

jest.mock('next-auth/react');

describe('SummaryMap', () => {
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

  it('render the SummaryMap without issue', () => {
    expect(() =>
      render(
        <SummaryMap
          postCode={'KT108LE'}
          addressLines={['1st Road', 'Beverly Hills', undefined, undefined]}
          city={'London'}
          county={'Greater London'}
          region={'South East'}
          country={'GB'}
          emails={['example@example.com']}
          phoneNumbers={['+4476512349']}
          websites={['www.example.com']}
        />,
        {},
        allMessages
      )
    ).not.toThrow();
  });
});
