import { atom, selector } from 'recoil';

import { ReportSnippetType, UserType } from '../types/global';

// https://github.com/facebookexperimental/Recoil/issues/733
// separate files for state issues NextJS

// had to use an any hear due to circular types and problematic inheritance
const appState = atom<any>({
  key: 'appState',
  default: {
    user: null
  }
});

export const appUser = selector<UserType>({
  key: 'appUser',
  get: ({ get }) => {
    return get(appState).user;
  },
  set: ({ set }, newUser) => {
    return set(appState, { user: newUser });
  }
});

export type UserReports = {
  bookmarkedReports: ReportSnippetType[];
  allReports: ReportSnippetType[];
  nonBookmarkedReports: ReportSnippetType[];
};

export const userReports = selector<UserReports>({
  key: 'userReports',
  get: ({ get }): UserReports => {
    const user = get(appUser);
    const reports = user?.reports;
    const allReports = reports;
    const nonBookmarkedReports = reports?.filter(
      (report: ReportSnippetType) => !report.bookmarked
    );

    return {
      bookmarkedReports: user?.bookmarked_reports || [],
      allReports: allReports || [],
      nonBookmarkedReports: nonBookmarkedReports || []
    };
  },
  set: ({ set, get }, newReports) => {
    const user = get(appUser);

    // report.bookmarked no longer used
    // use user.bookmarked_reports instead, returned from server
    const newUser: UserType = {
      ...user,
      // @ts-ignore
      ...(newReports?.allReports?.length && { reports: newReports.allReports }),
      // @ts-ignore
      bookmarked_reports: newReports.bookmarkedReports
    };

    return set(appUser, newUser);
  }
});

export default appState;
