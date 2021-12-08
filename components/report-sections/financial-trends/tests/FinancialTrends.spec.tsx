import React from 'react';

import { financialTrendsCharts } from '../../../../lib/settings/report.settings';
import allMessages from '../../../../messages/en';
import ReportTemplate from '../../../../pages/report/[id]';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '../../../../test-utils';
import FinancialTrends from '../FinancialTrends';

describe('FINANCIAL TRENDS', () => {
  it('should render', () => {
    expect(render(<FinancialTrends data={[]} />, {}, allMessages)).toThrow();
  });

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
