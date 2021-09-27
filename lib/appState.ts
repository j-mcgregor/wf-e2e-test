import { atom, selector } from 'recoil';

import { Report, SessionUser, User } from '../types/global';
import Reports from '../pages/reports';

// https://github.com/facebookexperimental/Recoil/issues/733
// separate files for state issues NextJS

const appState = atom<SessionUser>({
  key: 'appState',
  default: {
    user: null
  }
});

// const _user = {
//   name: null,
//   email: null,
//   image: null,
//   recent_usage: {
//     reports_ran: '',
//     api_requests: '',
//     last_login: ''
//   },
//   is_SSO: false,
//   contact_information: {
//     first_name: '',
//     last_name: '',
//     email: '',
//     country: '',
//     street_address: '',
//     city: '',
//     state: '',
//     postcode: '',
//     company_name: '',
//     company_HQ_Location: ''
//   },
//   preferences: {
//     localisation: '',
//     default_currency: '',
//     default_login_screen: '',
//     default_reporting_country: '',
//     communication: { comments: false, candidates: false, offers: false }
//   },
//   reports: []
// }

const appUser = selector<User>({
  key: 'appUser',
  get: ({ get }) => get(appState)?.user,
  set: ({ set }, newUser) => {
    return set(appState, { user: newUser });
  }
});

type UserReports = {
  bookmarkedReports: Report[] | undefined;
  allReports: Report[] | undefined;
  nonBookmarkedReports: Report[] | undefined;
};

export const userReports = selector({
  key: 'userBookmarkedReports',
  get: ({ get }): UserReports => {
    const reports = get(appUser)?.reports;
    const bookmarkedReports = reports?.filter(report => report.bookmarked);
    const allReports = reports;
    const nonBookmarkedReports = reports?.filter(report => !report.bookmarked);

    return {
      bookmarkedReports,
      allReports,
      nonBookmarkedReports
    };
  },
  set: ({ set, get }, reportId) => {
    const user = get(appUser);
    const allOtherReports = user?.reports?.filter(
      report => `${report.id}` !== `${reportId}`
    );
    const updatedReport = user?.reports?.find(
      report => `${report.id}` === `${reportId}`
    );

    const newUser = {
      ...user,
      reports: [
        ...allOtherReports,
        {
          ...updatedReport,
          bookmarked: !updatedReport?.bookmarked
        }
      ]
    };
    return set(appUser, newUser);
  }
});

export default appState;
