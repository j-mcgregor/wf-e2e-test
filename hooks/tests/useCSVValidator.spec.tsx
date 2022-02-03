/* eslint-disable security/detect-object-injection */
import { renderHook } from '@testing-library/react-hooks';

import { manualUploadValidators } from '../../lib/settings/sme-calc.settings';
import useCSVValidator from '../useCSVValidator';

describe('useCSVValidator', () => {
  let fileSelected: File;
  let current: ReturnType<typeof useCSVValidator>;

  describe('empty CSV', () => {
    beforeAll(() => {
      fileSelected = new File([], 'test', { type: 'text/csv' });

      const { result } = renderHook(() =>
        useCSVValidator(fileSelected, manualUploadValidators)
      );
      current = result.current;
    });

    it('should be invalid', () => {
      expect(current.isValid).toBe(false);
    });
    it('should test if CSV', () => {
      expect(current.isCSV).toBe(true);
    });
    it('should see the filename', () => {
      expect(current.fileName).toBe('test');
    });
    it('should have no rows', () => {
      expect(current.totalRows).toBe(0);
    });
    it.skip('should have the full number of missing rows', () => {
      expect(current.missingHeaders).toEqual([
        'currency',
        'iso_code',
        'accounts_type',
        'details_industry_sector_code',
        'details_name',
        'details_nace_code',
        'details_status',
        'address_region',
        'net_income',
        'number_of_employees',
        'cash_and_equivalents',
        'total_assets',
        'ebit',
        'ebitda',
        'tangible_fixed_assets',
        'intangible_fixed_assets',
        'interest_expenses',
        'long_term_debt',
        'period',
        'retained_earnings',
        'short_term_debt',
        'total_debt',
        'total_liabilities',
        'total_shareholder_equity',
        'turnover',
        'working_capital'
      ]);
    });
  });

  describe('invalid CSV', () => {
    beforeAll(() => {
      fileSelected = new File([], 'test', { type: 'text/csvx' });

      const { result } = renderHook(() =>
        useCSVValidator(fileSelected, manualUploadValidators)
      );
      current = result.current;
    });

    it('should be invalid csv', () => {
      expect(current.isCSV).toBe(false);
    });
  });
});
