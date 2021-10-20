/* eslint-disable sonarjs/no-duplicate-string */
import {
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/dom';
import client from 'next-auth/client';
import * as nextRouter from 'next/router';
import mockReport from '../../../lib/mock-data/report';

// import { mockServerGet, server } from '../../../__mocks__/service-worker/server';
import allMessages from '../../../messages/en';
import ReportTemplate from '../../../pages/report/[id]/index';
import { makeMockSession, render, screen } from '../../../test-utils';

jest.mock('next-auth/client');
// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({
  query: {
    id: 35
  },
  prefetch: jest.fn().mockReturnValue({
    catch: jest.fn()
  }),
  asPath: ''
}));

describe('ReportTemplate', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  fit('should render all sections without issue', async () => {
    const { container } = render(<ReportTemplate />, undefined, allMessages);

    await waitForElementToBeRemoved(screen.getByTestId('skeleton-report'));

    /**
     * HEADER
     */

    expect(
      screen.getByRole('heading', {
        name: /the wright glazing co. limited/i,
        level: 1
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/created: 1\.1\.2020/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /summary/i
      })
    ).toBeInTheDocument();

    /**
     * SUMMARY LEFT OVERVIEW
     */

    const infoGroups = screen.getAllByRole('group');

    expect(
      within(infoGroups[0]).getByText(/registration number/i)
    ).toBeInTheDocument();
    // TODO : change when hardcoded is replaced
    expect(within(infoGroups[0]).getByText(/sc172288/i)).toBeInTheDocument();

    expect(
      within(infoGroups[1]).getByText(/industry sector/i)
    ).toBeInTheDocument();
    // TODO : change when hardcoded is replaced
    expect(
      within(infoGroups[1]).getByText(/travel, personal & leisure/i)
    ).toBeInTheDocument();

    expect(
      within(infoGroups[2]).getByText(/incorporation date/i)
    ).toBeInTheDocument();
    // TODO : change when hardcoded is replaced
    // Result varies depending on Node version
    // expect(within(infoGroups[2]).getByText(/20 jun 2006/i)).toBeInTheDocument();

    expect(
      within(infoGroups[3]).getByText(/last filed account date/i)
    ).toBeInTheDocument();
    // TODO : change when hardcoded is replaced
    expect(
      within(infoGroups[3]).getByText(/31\/01\/2020/i)
    ).toBeInTheDocument();

    expect(
      within(infoGroups[4]).getByText(/company description/i)
    ).toBeInTheDocument();
    // TODO : change when hardcoded is replaced
    expect(
      within(infoGroups[4]).getByText(
        `${mockReport.contact_details.company_description}`
      )
    ).toBeInTheDocument();
    expect(
      within(infoGroups[4]).getByText(
        `${mockReport.contact_details.company_description}`
      )
    ).toBeInTheDocument();

    /**
     * SUMMARY RIGHT OVERVIEW
     */

    const address = container.querySelector('address');

    if (address) {
      expect(
        within(address).getByText(
          `${mockReport.contact_details.address_line_1}`
        )
      ).toBeInTheDocument();
      expect(
        within(address).getByText(
          `${mockReport.contact_details.address_line_2}`
        )
      ).toBeInTheDocument();
      expect(
        within(address).getByText(`${mockReport.contact_details.postal_code}`)
      ).toBeInTheDocument();
    }

    expect(screen.getByText(`batman@wayneindustries.com`)).toBeInTheDocument();
    expect(screen.getByText(`www.wrightglazing.co.uk`)).toBeInTheDocument();
    expect(screen.getByText(`+44 20 8644 4224`)).toBeInTheDocument();

    /**
     * FINANCIAL STATEMENT OVERVIEW
     */

    // const totalAssets = screen.getByText('Total Assets').parentElement;

    // if (totalAssets) {
    //   expect(totalAssets.querySelectorAll('td')[1].textContent).toBe(
    //     '824392.0'
    //   );
    // }

    const totalCurrentAssets = screen.getByText(
      'Total Current Assets'
    ).parentElement;

    if (totalCurrentAssets) {
      expect(totalCurrentAssets.querySelectorAll('td')[1].textContent).toBe(
        '586682.0'
      );
    }

    const totalCurrentLiabilities = screen.getByText(
      'Total Current Liabilities'
    ).parentElement;

    if (totalCurrentLiabilities) {
      expect(
        totalCurrentLiabilities.querySelectorAll('td')[1].textContent
      ).toBe('599996.0');
    }

    const netCurrentAssets =
      screen.getByText('Net Current Assets').parentElement;

    if (netCurrentAssets) {
      expect(netCurrentAssets.querySelectorAll('td')[1].textContent).toBe(
        '-13314.0'
      );
    }

    const employees = screen.getByText('Employees').parentElement;

    if (employees) {
      expect(employees.querySelectorAll('td')[1].textContent).toBe('13.0');
    }

    /**
     * RISK METRIC SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /risk metrics/i,
        level: 2
      })
    ).toBeInTheDocument();

    const metricCards = screen.getAllByRole('contentinfo');

    expect(
      within(metricCards[0]).getByText(/SME Z-score/i)
    ).toBeInTheDocument();
    expect(
      within(metricCards[1]).getByText(/Probability of Default/i)
    ).toBeInTheDocument();
    expect(
      within(metricCards[2]).getByText(/Loss Given Default/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/bond rating/i)).toBeInTheDocument();

    /**
     * HIGHLIGHTS SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /highlights/i,
        level: 2
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /we have accessed enough data to complete a report. if you would like to supplement the data in this report with the most recent management accounts please use the button below./i
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/reliability index/i)).toBeInTheDocument();
    expect(screen.getByText(/risk outlook/i)).toBeInTheDocument();

    /**
     * FINANCIAL TRENDS SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /financial trends/i,
        level: 2
      })
    ).toBeInTheDocument();

    /**
     * CORPORATE GOVERNANCE SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /corporate governance/i,
        level: 2
      })
    ).toBeInTheDocument();

    /**
     * LEGAL EVENTS SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /legal events/i,
        level: 2
      })
    ).toBeInTheDocument();

    /**
     * MACROECONOMIC TRENDS SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /macro economic trends/i,
        level: 2
      })
    ).toBeInTheDocument();

    /**
     * ESG SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /esg/i,
        level: 2
      })
    ).toBeInTheDocument();

    /**
     * NEWS SECTION
     */

    expect(
      screen.getByRole('heading', {
        name: /news/i,
        level: 2
      })
    ).toBeInTheDocument();
  });
});
