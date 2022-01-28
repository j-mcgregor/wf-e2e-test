import countryCodes from '../../lib/data/countryCodes.json';
import { BatchReportUploadHeaders } from '../../types/batch-reports';
import { CSVValidationHeaderProps } from '../../types/global';
import { CSVValueValidation } from '../../types/report';

export const batchReport = {
  averageTime: 200 // average report generation time in ms
};

export const uploadBatchReportCSVHeaders: {
  [K in BatchReportUploadHeaders]: CSVValidationHeaderProps;
} = {
  iso_code: {
    required: (x: string) => !x && `A value for 'iso_code' is required.`,
    validator: (x: string) =>
      countryCodes.find(country => country.code === x)
        ? false
        : `"${x}" is not a valid ISO code`,
    formatted: 'ISO Code'
  },
  company_id: {
    formatted: 'Company ID',
    required: (x: string) => !x && `A value for 'company_id' is required.`
  }
};

export const uploadBatchReportValidators: Array<CSVValueValidation> =
  Object.entries(uploadBatchReportCSVHeaders).map(
    ([header, { required, validator }]) => {
      const validators = required
        ? validator
          ? [required, validator]
          : [required]
        : [];
      return {
        header,
        ...((required || validator) && {
          validate: validators
        })
      };
    }
  );
