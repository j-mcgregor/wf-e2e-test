/**
 * THIS IS A VERY BASIC TEST SUITE SETUP.
 * IT ONLY TESTS THE COMPONENT DOESN'T THROW WHEN RENDERING.
 * MORE TESTS SHOULD BE ADDED BY DEVS AS THE PROJECT GROWS.
 * REMOVE THIS NOTE WHEN MORE TESTS ARE ADDED.
 */
import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import allMessages from '../../../../messages/en';
import { makeMockSession, render } from '../../../../test-utils';
import SummaryFinancialRow from '../SummaryFinancialRow';

jest.mock('next-auth/client');

describe('SummaryFinancialRow', () => {
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

  it('render the SummaryFinancialRow without issue', () => {
    expect(() =>
      render(
        <SummaryFinancialRow data={[]} rowHeader="header" rowKey="key" />,
        {},
        allMessages
      )
    ).not.toThrow();
  });
});
