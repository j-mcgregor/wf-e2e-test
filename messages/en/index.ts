import apiDocumentation from './api-documentation.en.json';
import batchedReports from './batch-reports.en.json';
import errors from './errors.en.json';
import forgottenPassword from './forgotten-password.en.json';
import general from './general.en.json';
import hints from './hints.en.json';
import index from './index.en.json';
import login from './login.en.json';
import passwordManagement from './password-management.en.json';
import report from './report.en.json';
import reports from './reports.en.json';
import resetPassword from './reset-password.en.json';
import settings from './settings.en.json';
import smeCalculator from './sme-calculator.en.json';
import smeProspector from './sme-prospector.en.json';
import toasts from './toasts.en.json';
import uploadData from './upload-data.en.json';

// need to re-export for test-utils.tsx

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...apiDocumentation,
  ...batchedReports,
  ...errors,
  ...forgottenPassword,
  ...general,
  ...hints,
  ...index,
  ...login,
  ...passwordManagement,
  ...report,
  ...reports,
  ...resetPassword,
  ...settings,
  ...smeCalculator,
  ...smeProspector,
  ...toasts,
  ...uploadData
};
