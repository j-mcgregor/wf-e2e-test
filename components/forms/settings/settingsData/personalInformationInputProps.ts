import countryJSON from '../../../../lib/country_currency.json';

const getCountry = () =>
  countryJSON.map(value => {
    return { optionValue: value.CountryName };
  });

const formClassName =
  'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const formLabelClassName = 'block text-sm font-medium text-gray-700';

const firstNameProps = {
  label: 'First name',
  name: 'firstName',
  type: 'text',
  labelClassName: formLabelClassName,
  className: formClassName
};
const lastNameProps = {
  label: 'Last name',
  name: 'firstName',
  type: 'text',
  labelClassName: formLabelClassName,
  className: formClassName
};
const emailProps = {
  label: 'Email address',
  name: 'email',
  type: 'email',
  labelClassName: formLabelClassName,
  className: formClassName
};
const coHeadquartLocationProps = {
  options: getCountry(),
  label: 'Company Headquarters Location',
  name: 'coHeadquartLocation',
  labelClassName: formLabelClassName,
  className: formClassName
};
const countryProps = {
  options: getCountry(),
  label: 'Country / Region',
  name: 'country',
  labelClassName: formLabelClassName,
  className: formClassName
};
const streetAddressProps = {
  label: 'Street Address',
  name: 'streetAddress',
  type: 'text',
  labelClassName: formLabelClassName,
  className: formClassName
};
const cityProps = {
  label: 'City',
  name: 'city',
  type: 'text',
  labelClassName: formLabelClassName,
  className: formClassName
};
const stateProps = {
  label: 'State/ Province',
  name: 'state',
  type: 'text',
  labelClassName: formLabelClassName,
  className: formClassName
};
const postcodeProps = {
  label: 'ZIP / Postal',
  name: 'postcode',
  type: 'text',
  labelClassName: formLabelClassName,
  className: formClassName
};
const companyNameProps = {
  label: 'Company Name',
  name: 'companyName',
  type: 'text',
  labelClassName: formLabelClassName,
  className: formClassName
};

export {
  companyNameProps,
  postcodeProps,
  stateProps,
  cityProps,
  streetAddressProps,
  countryProps,
  coHeadquartLocationProps,
  emailProps,
  lastNameProps,
  firstNameProps
};
