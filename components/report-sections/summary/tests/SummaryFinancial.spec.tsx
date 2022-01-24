/* eslint-disable security/detect-object-injection */
import client from 'next-auth/client';
import * as nextRouter from 'next/router';
import { mockReport } from '../../../../lib/mock-data/newReport';

import allMessages from '../../../../messages/en';
import {
  makeMockSession,
  render,
  waitForElementToBeRemoved,
  screen
} from '../../../../test-utils';
import SummaryFinancial from '../SummaryFinancial';

jest.mock('next-auth/client');

describe('SummaryFinancial', () => {
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

  it('render the SummaryFinancial without issue', () => {
    expect(() =>
      render(<SummaryFinancial years={[]} />, {}, allMessages)
    ).not.toThrow();
  });

  xit('should render the Financial Statement Overview table', async () => {
    const { financials } = mockReport;

    // @ts-ignore
    render(<SummaryFinancial years={financials} />, {}, allMessages);

    const skeleton = screen.queryByTestId('skeleton-report');
    skeleton && (await waitForElementToBeRemoved(skeleton));

    const rowsToTest = [
      { rowName: 'Sales / Turnover', key: 'operating_revenue' },
      {
        rowName: 'Profit / (Loss) Before Taxes',
        key: 'profit_and_loss_before_tax'
      },
      { rowName: 'Equity Shareholder Funds', key: 'total_shareholder_equity' },
      // { rowName: 'Tangible Worth', key: 'capital' },
      { rowName: 'Fixed Assets', key: 'fixed_assets' },
      { rowName: 'Total Assets', key: 'total_assets' },
      { rowName: 'Current Assets', key: 'current_assets' },
      { rowName: 'Current Liabilities', key: 'current_liabilities' },
      { rowName: 'Non-Current Liabilities', key: 'non_current_liabilities' },
      { rowName: 'Total Liabilities', key: 'total_liabilities' },
      { rowName: 'Net Current Assets', key: 'net_current_assets' },
      { rowName: 'Employees', key: 'number_of_employees' }
    ];

    rowsToTest.forEach((rowData, i) => {
      // get the parent element of the found row and all of its cells, minus the first cell
      const row = screen.getByText(rowData.rowName).parentElement;
      const cells = row?.querySelectorAll('td');

      if (cells) {
        financials.forEach((column, index) => {
          // + 1 as col 0 is row name
          // @ts-ignore
          expect(cells[index + 1].textContent).toBe(
            `${parseFloat(column[rowData.key]).toLocaleString()}`
          );
        });
      }
    });
  });
});
