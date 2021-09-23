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
      t('forms.preference.localisation');
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
      t('forms.preference.default reporting country');
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
      t('forms.preference.default currency');
    },
    name: 'currency',
    labelClassName: formLabelClassName,
    className: formClassName
  };
};

const dashboardOptionsNames = (t: any) => {
  return ['dashboard', 'reports', 'sme calc', 'sme prospector'].map(
    (i: any) => {
      return i;
    }
  );
};

const dashboardOptionsValues = [
  'dashboard',
  'reports',
  'sme calc',
  'sme prospector'
];

const loginScreenProps = (t: any) => {
  const options = dashboardOptionsNames(t).map((name, nameIndex) => {
    return {
      optionName: t(
        'forms.specialist-props.' + dashboardOptionsValues[nameIndex]
      ),
      optionValue: name
    };
  });

  return {
    options: options,
    label: () => {
      t('forms.preference default login screen');
    },
    name: 'loginScreen',
    labelClassName: formLabelClassName,
    className: formClassName
  };
};

export { localisationProps, currencyProps, loginScreenProps, reportingProps };
