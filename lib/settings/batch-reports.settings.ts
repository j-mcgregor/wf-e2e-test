export const batchReport = {
  averageTime: 200 // average report generation time in ms
};

export const batchValidators = [
  {
    header: 'iso',
    validate: (value: any) => {
      if (!value) {
        return 'iso is required';
      }
      return (
        (typeof value !== 'string' || value.length !== 2) &&
        `'${value}' is not a valid ISO two letter code.`
      );
    }
  },
  {
    header: 'company_id',
    validate: (value: any) => !value && `A value for 'company_id' is required.`
  }
];
