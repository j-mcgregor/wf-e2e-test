/* eslint-disable security/detect-non-literal-regexp */
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as nextRouter from 'next/router';

import allMessages from '../../../messages/en';
import { render, screen } from '../../../test-utils';
import ProvideData from '../ProvideData';

const validCsv = `data:text/csv;charset=utf-8;currency,iso_code,accounts_type,company_id,details_name,details_industry_sector_code,address_region,details_status,details_nace_code,period,total_shareholder_equity,total_assets,total_liabilities,turnover,production_costs,short_term_debt,long_term_debt,total_debt,cash_and_equivalents,working_capital,tangible_fixed_assets,intangible_fixed_assets,interest_expenses,ebitda,depreciation,ebit,net_income,retained_earnings,number_of_directors,number_of_employees,management_experience
  GBP,GB,0,,Some company,25,GB,Active,3100,2020,1020,120000,120000,30000,3000,2000,1000,3000,10000,500,15000,5000,1000,1000,1.01,1024,1000,1.51,1,3,Medium
  GBP,GB,0,,Some company,25,GB,Active,3100,2019,1200,130000,110000,50000,3200,2400,1200,3500,9000,1000,16000,4000,2000,1100,1.01,1030,1200,1.51,2,4,Medium`;

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({
  prefetch: jest.fn().mockReturnValue({
    catch: jest.fn()
  })
}));

/**
 * @TODO fix soon; issue is, I think, uploadReportCsvHeaders isn't configured correctly for the tests
 * It returns all the headers as missing even though they're clearly present in the csv above
 */

describe.skip('ProvideData', () => {
  it('provides successful validation of valid CSV', async () => {
    const file = new File([validCsv], 'data.csv', {
      type: 'text/csv'
    });

    render(<ProvideData />, undefined, allMessages);

    const input = screen.getByLabelText(/upload your csv or excel file/i);
    userEvent.upload(input, file);
    // screen.logTestingPlaygroundURL();

    await waitFor(() => screen.findByText(/CSV Validity Check/i));

    expect(screen.getByText(/file is a valid csv/i)).toBeInTheDocument();
    expect(screen.getByText(/all headers are valid/i)).toBeInTheDocument();
  });
});
