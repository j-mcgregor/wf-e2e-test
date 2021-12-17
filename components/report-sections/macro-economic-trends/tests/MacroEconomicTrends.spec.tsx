import React from 'react';

import { macroEconomicTrendCharts } from '../../../../lib/settings/report.settings';
import allMessages from '../../../../messages/en';
import ReportTemplate from '../../../../pages/report/[id]';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '../../../../test-utils';
import MacroEconomicTrends from '../MacroEconomicTrends';

xdescribe('MACRO ECONOMIC TRENDS', () => {
  it('should render', () => {
    expect(
      render(<MacroEconomicTrends trends={[]} />, {}, allMessages)
    ).toThrow();
  });

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
