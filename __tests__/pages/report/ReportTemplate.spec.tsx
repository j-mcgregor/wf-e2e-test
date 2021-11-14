/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-duplicate-string */
import { waitForElementToBeRemoved, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import newsData from '../../../lib/mock-data/newsFeed';
import mockReport from '../../../lib/mock-data/report';
import {
  financialTrendsCharts,
  macroEconomicTrendCharts
} from '../../../lib/settings/report.settings';

import allMessages from '../../../messages/en';
import ReportTemplate from '../../../pages/report/[id]';
import { makeMockSession, render, screen } from '../../../test-utils';

// import { mockServerGet, server } from '../../../__mocks__/service-worker/server';
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

  describe('HEADER', () => {
    it('should render', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      await waitForElementToBeRemoved(skeleton);

      expect(
        screen.queryByRole('heading', {
          name: /the wright glazing co. limited/i,
          level: 1
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/created: 1\.1\.2020/i)).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', {
          name: /summary/i
        })
      ).toBeInTheDocument();
    });
  });

  describe('SUMMARY', () => {
    it('should render the left section', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

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
    });

    it('should render the right section', async () => {
      const { container } = render(
        <ReportTemplate isTesting />,
        undefined,
        allMessages
      );

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

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

      expect(
        screen.getByText(`batman@wayneindustries.com`)
      ).toBeInTheDocument();
      expect(screen.getByText(`www.wrightglazing.co.uk`)).toBeInTheDocument();
      expect(screen.getByText(`+44 20 8644 4224`)).toBeInTheDocument();
    });

    it('should render the Financial Statement Overview table', async () => {
      jest.setTimeout(10000);
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      const { financials } = mockReport;

      /* finds rows by first column and tests columns with numbers (1-5)  */

      const columnMap: { [key: number]: Record<string, unknown> } = {
        1: financials['2020'],
        2: financials['2018'],
        3: financials['2017'],
        4: financials['2016'],
        5: financials['2015']
      };

      const rowsToTest = [
        { rowName: 'Total Current Assets', key: 'current_assets' },
        { rowName: 'Total Current Liabilities', key: 'current_liabilities' },
        { rowName: 'Net Current Assets', key: 'net_current_assets' },
        { rowName: 'Employees', key: 'employees' }
      ];

      rowsToTest.forEach(rowData => {
        const row = screen.getByText(rowData.rowName).parentElement;

        const cells = row?.querySelectorAll('td');

        if (cells) {
          expect(cells.length).toBe(7);

          for (let i = 1; i < 6; i++) {
            const cell = cells[i];
            const expected = columnMap[i][rowData.key] ?? '0';
            expect(cell.textContent).toBe(expected);
          }
        } else {
          throw Error(`${rowData.rowName} Not Found`);
        }
      });
    });
  });

  describe('RISK METRICS', () => {
    it('should render the Speedometers', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /risk metrics/i,
          level: 2
        })
      ).toBeInTheDocument();

      const metricCards = screen.getAllByRole('contentinfo');

      const speedometers = [
        {
          name: 'SME Z-score'
        },
        {
          name: 'Probability of Default'
        },
        {
          name: 'Loss Given Default'
        }
      ];

      if (metricCards.length) {
        speedometers.forEach((speedometer, i) => {
          expect(
            within(metricCards[i]).getByText(speedometer.name)
          ).toBeInTheDocument();
          expect(
            within(metricCards[i]).getByText(/industry benchmark/i)
          ).toBeInTheDocument();
          expect(
            within(metricCards[i]).getByText(/region benchmark/i)
          ).toBeInTheDocument();
        });
      } else {
        throw Error('Speedometer not found');
      }
    });

    it('should render the Bond Rating', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);
      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      const { bond_rating } = mockReport.risk_metrics;
      const bond_rating_descriptions: { [key: string]: string } =
        allMessages.bond_rating_descriptions;

      expect(screen.getByText(/bond rating/i)).toBeInTheDocument();
      expect(screen.getByTestId('bond-rating').textContent).toBe(bond_rating);
      expect(
        screen.getByText(bond_rating_descriptions[bond_rating])
      ).toBeInTheDocument();
    });
  });

  describe('HIGHLIGHTS', () => {
    const { highlights, financials } = mockReport;

    it('Reliability Index', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /highlights/i,
          level: 2
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText(highlights.data_reliability.reliability)
      ).toBeInTheDocument();

      expect(
        screen.getByText(highlights.data_reliability.comment)
      ).toBeInTheDocument();
    });

    it('Risk Outlook', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(screen.getByText(/reliability index/i)).toBeInTheDocument();
      expect(screen.getByText(/risk outlook/i)).toBeInTheDocument();

      highlights.risk_outlook.forEach(riskOutlook => {
        expect(
          within(screen.getByTestId('risk-outlook-list')).getByText(riskOutlook)
        ).toBeInTheDocument();
      });
    });

    it('Financial Accounts', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      const yearList = within(
        screen.getByTestId('financial-accounts-list')
      ).getAllByRole('listitem');

      yearList.forEach(year => {
        // is the year's info available in the report
        const isYearPresent = (year.textContent as string).trim() in financials;

        const tickOrCross = isYearPresent ? 'icon-tick' : 'icon-cross';

        expect(within(year).getByTestId(tickOrCross)).toBeInTheDocument();
      });
    });

    it('Add More Data', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(screen.getByText(/add more data/i)).toBeInTheDocument();
      const cardOne = screen.getByText(
        /import open banking and accounting data/i
      );
      expect(cardOne).toBeInTheDocument();
      const cardTwo = screen.getByText(/upload more data/i);
      expect(cardTwo).toBeInTheDocument();

      if (cardOne.parentElement && cardTwo.parentElement) {
        const cardOneButtons = within(cardOne.parentElement).getAllByRole(
          'button'
        );
        const cardTwoButtons = within(cardTwo.parentElement).getAllByRole(
          'button'
        );

        expect(cardOneButtons[0].textContent).toBe('Unlock');
        expect(cardOneButtons[0]).toBeDisabled();
        expect(cardOneButtons[1].textContent).toBe('Learn more');
        expect(cardTwoButtons[0].textContent).toBe('Upload');
        expect(cardTwoButtons[1].textContent).toBe('Learn more');
      } else {
        throw Error(
          'Something went wrong while testing the "Add More Data" cards'
        );
      }
    });
  });

  describe('FINANCIAL TRENDS', () => {
    it('should render a chart for each financial trend', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /financial trends/i,
          level: 2
        })
      ).toBeInTheDocument();

      const chartComponents = screen.queryAllByTestId('chart-multi-testid');

      // WORTH TESTING MORE WHEN BETTER DATA PROVIDED
      expect(chartComponents.length).toBe(
        Object.keys(financialTrendsCharts).length
      );
    });
  });

  describe('CORP GOVERNANCE', () => {
    const { personal } = mockReport;

    it('Overview', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /corporate governance/i,
          level: 2
        })
      ).toBeInTheDocument();

      expect(
        within(screen.getByTestId('corp-ceo-testid')).getByText(personal.ceo)
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('corp-cfo-testid')).getByText(personal.cfo)
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('corp-chairman-testid')).getByText(
          personal.chairman
        )
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('corp-directors-testid')).getByText(
          personal.directors.length
        )
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('corp-shareholders-testid')).getByText(
          personal.shareholders.length
        )
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('corp-snr-mgmt-testid')).getByText(
          personal.senior_management.length
        )
      ).toBeInTheDocument();
    });

    it('Directors', async () => {
      const { directors } = personal;

      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        within(screen.getByTestId('corp-senior-profiles-testid')).getByText(
          /directors/i
        )
      ).toBeInTheDocument();

      const cards = within(
        screen.getByTestId('corp-directors-list-testid')
      ).queryAllByTestId('personal-card-testid');

      expect(cards.length).toBe(directors.length);

      cards.forEach((card, i) => {
        expect(
          within(card).getByText(new RegExp(directors[i].title, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(new RegExp(directors[i].name, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(new RegExp(directors[i].role, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(new RegExp(directors[i].date_of_birth, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(new RegExp(directors[i].nationality, 'i'))
        ).toBeInTheDocument();
      });
    });

    it('Senior Management', async () => {
      const { senior_management } = personal;

      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        within(screen.getByTestId('corp-senior-profiles-testid')).getByText(
          /senior management/i
        )
      ).toBeInTheDocument();

      const cards = within(
        screen.getByTestId('corp-snr-mgmt-list-testid')
      ).queryAllByTestId('personal-card-testid');

      expect(cards.length).toBe(senior_management.length);

      cards.forEach((card, i) => {
        expect(
          within(card).getByText(new RegExp(senior_management[i].title, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(new RegExp(senior_management[i].name, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(new RegExp(senior_management[i].role, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(
            new RegExp(senior_management[i].date_of_birth, 'i')
          )
        ).toBeInTheDocument();
        expect(
          within(card).getByText(
            new RegExp(senior_management[i].nationality, 'i')
          )
        ).toBeInTheDocument();
      });
    });

    it('All Shareholders', async () => {
      const { shareholders } = personal;

      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        within(screen.getByTestId('corp-shareholder-section-testid')).getByText(
          /all Shareholders/i
        )
      ).toBeInTheDocument();

      const cards = within(
        screen.getByTestId('corp-shareholder-section-testid')
      ).queryAllByTestId('shareholder-card-testid');

      expect(cards.length).toBe(shareholders.length);

      cards.forEach((card, i) => {
        expect(
          within(card).getByText(new RegExp(shareholders[i].first_name, 'i'))
        ).toBeInTheDocument();
        expect(
          within(card).getByText(new RegExp(shareholders[i].last_name, 'i'))
        ).toBeInTheDocument();
        if (shareholders[i].linkedin) {
          expect(within(card).getByTestId('icon-linkedin')).toBeInTheDocument();
        }
      });
    });
  });

  describe('LEGAL EVENTS', () => {
    const {
      legal_events: { legal_events }
    } = mockReport;

    it('Summary: basic', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /legal events/i,
          level: 2
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', {
          name: /16 all events/i
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: /2 charges/i
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: /1 negative events/i
        })
      ).toBeInTheDocument();
    });

    it('Summary: should change the table when the button filters are clicked', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.getByRole('button', {
          name: /16 all events/i
        })
      ).toBeInTheDocument();

      let rows = within(
        screen.getByTestId('legal-events-table-testid')
      ).queryAllByTestId('legal-row-testid');

      expect(rows.length).toBe(legal_events.length);

      userEvent.click(
        screen.getByRole('button', {
          name: /2 charges/i
        })
      );

      rows = within(
        screen.getByTestId('legal-events-table-testid')
      ).queryAllByTestId('legal-row-testid');

      expect(rows.length).toBe(2);

      userEvent.click(
        screen.getByRole('button', {
          name: /1 negative events/i
        })
      );

      rows = within(
        screen.getByTestId('legal-events-table-testid')
      ).queryAllByTestId('legal-row-testid');

      expect(rows.length).toBe(1);
    });
  });

  describe('MACRO ECONOMIC TRENDS', () => {
    it('should render a chart for each macroeconomic trend', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /macro economic trends/i,
          level: 2
        })
      ).toBeInTheDocument();

      const chartComponents = screen.queryAllByTestId('chart-testid');

      // WORTH TESTING MORE WHEN BETTER DATA PROVIDED
      expect(chartComponents.length).toBe(
        Object.keys(macroEconomicTrendCharts).length
      );
    });
  });

  describe('ESG', () => {
    it('should render two cards', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /esg/i,
          level: 2
        })
      ).toBeInTheDocument();

      const cards = screen.queryAllByTestId('esg-card-testid');

      expect(cards.length).toBe(2);

      expect(within(cards[0]).getByText('Industry')).toBeInTheDocument();
      expect(
        within(cards[0]).getByText(
          /Using machine learning models we can analyse a companies website to determine the companies actual industry/i
        )
      ).toBeInTheDocument();

      expect(within(cards[1]).getByText('Governance')).toBeInTheDocument();
      // expect(
      //   within(cards[1]).getByText(
      //     /Data on company governance and problematic shareholders \/ directors/i
      //   )
      // ).toBeInTheDocument();
      expect(within(cards[1]).getByText(/3/i)).toBeInTheDocument();
      expect(within(cards[1]).getByText(/pep flags/i)).toBeInTheDocument();
    });
  });

  describe('NEWS', () => {
    it('should render a card for each news item', async () => {
      render(<ReportTemplate isTesting />, undefined, allMessages);

      const skeleton = screen.queryByTestId('skeleton-report');
      skeleton && (await waitForElementToBeRemoved(skeleton));

      expect(
        screen.queryByRole('heading', {
          name: /news/i,
          level: 2
        })
      ).toBeInTheDocument();

      const cards = screen.queryAllByTestId('news-card-testid');

      expect(cards.length).toBe(0);

      // cards.forEach((card, i) => {
      //   expect(
      //     within(card).getByText(newsData[i].publication)
      //   ).toBeInTheDocument();
      // });
    });
  });
});
