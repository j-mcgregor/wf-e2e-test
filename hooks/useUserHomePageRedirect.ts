const useUserHomePageRedirect = (route: string) => {
  switch (route) {
    case 'reports':
      return '/reports';
    case 'single_report':
      return '/sme-calculator';
    case 'multiple_reports':
      return '/batch-reports';
    default:
      return '/';
  }
};

export default useUserHomePageRedirect;
