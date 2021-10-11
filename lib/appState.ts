import { atom, selector } from 'recoil';

import { Report, User } from '../types/global';

// https://github.com/facebookexperimental/Recoil/issues/733
// separate files for state issues NextJS

// had to use an any hear due to circular types and problematic inheritance
const appState = atom<any>({
  key: 'appState',
  default: {
    user: null
  }
});

export const appUser = selector<User>({
  key: 'appUser',
  get: ({ get }) => {
    return get(appState).user;
  },
  set: ({ set }, newUser) => {
    return set(appState, { user: newUser });
  }
});

export type UserReports = {
  bookmarkedReports: Report[];
  allReports: Report[];
  nonBookmarkedReports: Report[];
};

export const userReports = selector<UserReports>({
  key: 'userReports',
  get: ({ get }): UserReports => {
    const user = get(appUser);
    const reports = user?.reports;
    const bookmarkedReports = reports?.filter(
      (report: Report) => report.bookmarked
    );
    const allReports = reports;
    const nonBookmarkedReports = reports?.filter(
      (report: Report) => !report.bookmarked
    );

    return {
      bookmarkedReports: bookmarkedReports || [],
      allReports: allReports || [],
      nonBookmarkedReports: nonBookmarkedReports || []
    };
  },
  set: ({ set, get }, reportId) => {
    const user = get(appUser);

    const allOtherReports =
      user?.reports?.filter(
        (report: Report) => `${report.id}` !== `${reportId}`
      ) || [];
    const updatedReport = user?.reports?.find(
      (report: Report) => `${report.id}` === `${reportId}`
    );

    // handle report match an no match
    const reports = updatedReport
      ? [
          ...allOtherReports,
          {
            ...updatedReport,
            bookmarked: !updatedReport?.bookmarked
          }
        ]
      : [...allOtherReports];

    const newUser = {
      ...user,
      reports
    };

    return set(appUser, newUser);
  }
});

export default appState;
