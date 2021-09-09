import apiDocumentation from './api-documentation.en.json';
import batchedReports from './batched-reports.en.json';
import forgottenPassword from './forgotten-password.en.json';
import general from './general.en.json';
import index from './index.en.json';
import login from './login.en.json';
import report from './report.en.json';
import reports from './reports.en.json';
import resetPassword from './reset-password.en.json';
import settings from './settings.en.json';
import smeCalculator from './sme-calculator.en.json';
import smeProspector from './sme-prospector.en.json';

// need to re-export for test-utils.tsx

export default {
  ...apiDocumentation,
  ...batchedReports,
  ...forgottenPassword,
  ...general,
  ...index,
  ...login,
  ...report,
  ...reports,
  ...resetPassword,
  ...settings,
  ...smeCalculator,
  ...smeProspector
};
