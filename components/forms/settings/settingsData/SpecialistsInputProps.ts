import localisationJSON from '../../../../lib/data/localisation.json';

const getLocalisation = () =>
  localisationJSON.map(value => {
    return { optionValue: value.locale };
  });
const formLabelClassName = 'block text-sm font-medium text-gray-700';

const formClassName =
  'mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const localisationProps = (t: any) => {
  return {
    options: getLocalisation(),
    label: () => {
      t('Localisation');
    },
    name: 'localisation',
    labelClassName: formLabelClassName,
    className: formClassName
  };
};

const reportingProps = (t: any) => {
  return {
    options: getLocalisation(),
    label: () => {
      t('Default reporting country');
    },
    name: 'reporting',
    labelClassName: formLabelClassName,
    className: formClassName
  };
};

const currencyProps = (t: any) => {
  return {
    options: getLocalisation(),
    label: () => {
      t('Default currency');
    },
    name: 'currency',
    labelClassName: formLabelClassName,
    className: formClassName
  };
};

const dashboardOptionsNames = (t: any) => {
  return ['Dashboard', 'Reports', 'SME Calc', 'SME Prospector'].map(
    (i: any) => {
      return t(i);
    }
  );
};

const dashboardOptionsValues = [
  'dashboard',
  'reports',
  'smeCalc',
  'smeProspector'
];

const loginScreenProps = (t: any) => {
  const options = dashboardOptionsNames(t).map((name, nameIndex) => {
    return {
      optionName: name,
      optionValue: dashboardOptionsValues[parseInt(String(nameIndex))]
    };
  });

  return {
    options: options,
    label: () => {
      t('Default login screen');
    },
    name: 'loginScreen',
    labelClassName: formLabelClassName,
    className: formClassName
  };
};

export { localisationProps, currencyProps, loginScreenProps, reportingProps };
