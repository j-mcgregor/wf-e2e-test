import '@testing-library/jest-dom';

import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';
import React from 'react';

import { mockReports } from '../../lib/mock-data/users';
import { createReportTitle } from '../../lib/utils/text-helpers';
import allMessages from '../../messages/en';
import Dashboard from '../../pages';
import { makeMockSession, render, screen, within } from '../../test-utils';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({
  push: jest.fn()
}));

describe('Dashboard', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('renders without throwing', () => {
    expect(() => render(<Dashboard />, undefined, allMessages)).not.toThrow();
  });

  it.skip('renders the dashboard with all components', () => {
    render(<Dashboard />, undefined, allMessages);

    const statCards = screen.getAllByTestId('stat-card');

    expect(statCards.length).toBe(3);

    // STAT CARDS
    expect(statCards[0].textContent?.includes('Total Reports')).toBe(true);
    // TODO : fix following line. Previously we could access the user reports via the mock session, but since next/auth was upgraded, the session interface is stricter so can no longer do this. Need to figure out  another way
    expect(statCards[0].textContent?.includes('0')).toBe(true);

    // expect(statCards[1].textContent?.includes('Batched Reports')).toBe(true);
    expect(statCards[1].textContent?.includes('Bookmarked Reports')).toBe(true);
    expect(statCards[1].textContent?.includes('0')).toBe(true);

    // expect(statCards[2].textContent?.includes('weeks ago')).toBe(true);
    expect(statCards[2].textContent?.includes('Last Login')).toBe(true);

    // TABLE
    expect(
      screen.getByRole('columnheader', {
        name: /company name/i
      })
    ).toBeVisible();
    expect(
      screen.getByRole('columnheader', {
        name: /sme z-score/i
      })
    ).toBeVisible();
    expect(
      screen.getByRole('columnheader', {
        name: /bond rating/i
      })
    ).toBeVisible();
    expect(
      screen.getByRole('columnheader', {
        name: /create/i
      })
    ).toBeVisible();

    const rows = screen.getAllByRole('row');
    // TODO : fix following line. Previously we could access the user reports via the mock session, but since next/auth was upgraded, the session interface is stricter so can no longer do this. Need to figure out  another way
    expect(rows.length).toBe(1); // table row limit + header

    // LINK CARDS
    const linkCards = screen.getAllByTestId('link-card');

    expect(linkCards.length).toBe(4);

    // STAT CARDS
    const smeLink = screen.getByRole('link', {
      name: /something not making sense\? can't quite the data or the details in the report you want\? talk to us today and we can help you resolve these issues and get you back on track\./i
    });

    expect(within(smeLink).getByText(/get support/i)).toBeVisible();

    const automatedReportLink = screen.getByRole('link', {
      name: /with only a company number, automatically source data from millions of sme’s\. take this data and generate a credit risk report using wiserfunding’s sme z-score\./i
    });

    expect(
      within(automatedReportLink).getByText(/create an automated report/i)
    ).toBeVisible();

    const apiLink = screen.getByRole('link', {
      name: /api documentation do you have a large list of companies to analyse\? or want to integrate our technology into your own\. integrate with our api to achieve all of this and more\./i
    });

    expect(within(apiLink).getByText(/api documentation/i)).toBeVisible();

    const batchLink = screen.getByRole('link', {
      name: /got a lot of reports to run\? you bring the company ids and we’ll run them and let you know when every single report has been compiled for you and your team\./i
    });

    expect(within(batchLink).getByText(/batch reports/i)).toBeVisible();
  });
});
