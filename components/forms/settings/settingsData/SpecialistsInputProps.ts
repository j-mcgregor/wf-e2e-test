import localisationJSON from '../../../../lib/data/localisation.json';

const getLocalisation = () =>
  localisationJSON.map(value => {
    return { optionValue: value.locale };
  });
const formLabelClassName = 'block text-sm font-medium text-gray-700';

const formClassName =
  'mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const localisationProps = {
  options: getLocalisation(),
  label: 'Localisation',
  name: 'localisation',
  labelClassName: formLabelClassName,
  className: formClassName
};
const reportingProps = {
  options: getLocalisation(),
  label: 'Default reporting country',
  name: 'reporting',
  labelClassName: formLabelClassName,
  className: formClassName
};

const currencyProps = {
  options: getLocalisation(),
  label: 'Default currency',
  name: 'currency',
  labelClassName: formLabelClassName,
  className: formClassName
};

const dashBoardOptions = [
  { optionValue: 'dashboard', optionName: 'Dashboard' },
  { optionValue: 'reports', optionName: 'Reports' },
  { optionValue: 'smeCalc', optionName: 'SME Calc' },
  { optionValue: 'smeProspector', optionName: 'SME Prospector' }
];

const loginScreenProps = {
  options: dashBoardOptions,
  label: 'Default login screen',
  name: 'loginScreen',
  labelClassName: formLabelClassName,
  className: formClassName
};

export { localisationProps, currencyProps, loginScreenProps, reportingProps };
