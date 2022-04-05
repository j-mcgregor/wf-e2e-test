/* eslint-disable sonarjs/no-duplicate-string */
import { User as AuthUser } from 'next-auth';
import { UserType, ReportSnippetType } from '../../types/global';
import { ApiHandler, HandlerReturn } from '../../types/http';
import { makeErrorResponse } from '../utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeApiHandlerResponseSuccess
} from '../utils/http-helpers';

export const XMLHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
const JSONHeaders = {
  'Content-Type': 'application/json'
};

/**
 * ***************************************************
 * AUTHENTICATE
 * ***************************************************
 */

const authenticate = async (email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.WF_AP_ROUTE}/login/access-token`, {
      method: 'POST',
      headers: {
        ...XMLHeaders
      },
      body: new URLSearchParams({
        username: email,
        password: password
      })
    });
    if (res.ok) {
      const json = await res.json();
      return { token: json.access_token };
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Authentication Error =>', error);
    return null;
  }
};

/**
 * ***************************************************
 * GET FULL USER
 * ***************************************************
 */
export interface GetFullUser extends HandlerReturn {
  user:
    | (UserType & {
        reports: GetReportsHistory[];
        bookmarked_reports: GetUserBookmarks[];
        batched_report_jobs: any[];
      })
    | null;
}

const getFullUser: ApiHandler<GetFullUser> = async token => {
  try {
    // run all user requests in parallel
    const [response, userReports, userBookmarks] = await Promise.all([
      fetch(`${process.env.WF_AP_ROUTE}/users/me`, {
        method: 'GET',
        headers: {
          ...XMLHeaders,
          Authorization: `Bearer ${token}`
        }
      }),
      getReportsHistory(token, {}),
      User.getUserBookmarks(token, {})
    ]);

    if (response.ok) {
      const user: UserType = await response.json();

      const userWithReports = {
        // structure the user correctly if missing data (preferences etc)
        ...user,
        // check for preferences and add defaults if missing
        ...giveDefaults(user),
        // add in the reports history, handle failed request
        reports: userReports.ok ? userReports.reports : [],
        // bookmarks
        bookmarked_reports: userBookmarks.bookmarks || [],
        // to add later
        batched_report_jobs: []
      };

      return {
        ...makeApiHandlerResponseSuccess(),
        user: userWithReports
      };
    }
    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'USER'
      }),
      user: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), user: null };
  }
};

/**
 * ***************************************************
 * GET USER
 * ***************************************************
 */

export interface GetUser extends HandlerReturn {
  user: AuthUser | null;
}

const getUser: ApiHandler<GetUser> = async (token: string) => {
  if (!token) {
    return {
      ...makeApiHandlerResponseFailure({ message: 'Missing token' }),
      user: null
    };
  }

  try {
    // run all user requests in parallel
    const [response] = await Promise.all([
      fetch(`${process.env.WF_AP_ROUTE}/users/me`, {
        method: 'GET',
        headers: {
          ...XMLHeaders,
          Authorization: `Bearer ${token}`
        }
      })
    ]);

    if (response.ok) {
      const user: UserType = await response.json();
      const structuredUser = {
        // structure the user correctly if missing data (preferences etc)
        ...user,
        // check for preferences and add defaults if missing
        ...giveDefaults(user)
      };
      return {
        ...makeApiHandlerResponseSuccess(),
        user: structuredUser
      };
    }
    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'USER'
      }),
      user: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), user: null };
  }
};

const giveDefaults = (user: UserType) => {
  const structuredUser: any = {
    preferences: {
      communication: {
        batch_report_email: true,
        service_updates: true,
        company_updates: false
      },
      defaults: {
        locale: 'en-GB',
        currency: 'United Kingdom',
        home_page: 'dashboard',
        reporting_country: 'GB'
      }
    }
  };

  if (!user?.preferences) {
    return { ...user, ...structuredUser };
  }

  return user;
};

/**
 * ***************************************************
 * FORGOT PASSWORD
 * ***************************************************
 */

const forgotPassword = async (email: string) => {
  if (!email) {
    return { ok: false };
  }
  const res = await fetch(
    `${process.env.WF_AP_ROUTE}/password-recovery/${email}`,
    {
      method: 'POST',
      headers: {
        ...XMLHeaders
      }
    }
  );

  if (res.ok) {
    const { msg } = await res.json();
    return { msg, ok: true };
  }

  return { ok: false };
};

/**
 * ***************************************************
 * GET SSO TOKEN
 * ***************************************************
 */

const getSSOToken = async (
  token: string
): Promise<{ access_token?: string; ok?: boolean }> => {
  if (!token) {
    return { ok: false };
  }

  const res = await fetch(`${process.env.WF_AP_ROUTE}/login/single-signon`, {
    method: 'POST',
    headers: {
      ...XMLHeaders
    },
    body: new URLSearchParams({
      sso_token: token
    })
  });

  if (res.ok) {
    const { access_token } = await res.json();
    return { access_token, ok: true };
  }
  return { ok: false };
};

/**
 * ***************************************************
 * RESET PASSWORD
 * ***************************************************
 */

const resetPassword = async (
  token: string,
  newPassword: string
): Promise<{ msg?: string; ok?: boolean }> => {
  if (!token || !newPassword) {
    return { ok: false };
  }

  const res = await fetch(`${process.env.WF_AP_ROUTE}/reset-password/`, {
    method: 'POST',
    headers: {
      ...JSONHeaders
    },
    body: JSON.stringify({ token, new_password: newPassword })
  });

  if (res.ok) {
    const { msg } = await res.json();
    return { msg, ok: true };
  }
  return { ok: false };
};

/**
 * ***************************************************
 * UPDATE USER
 * ***************************************************
 */

export interface UpdateUser extends HandlerReturn {
  user: UserType | null;
}

interface UpdateUserProps {
  user: UserType;
}

const updateUser: ApiHandler<UpdateUser, UpdateUserProps> = async (
  token: string,
  { user }
) => {
  try {
    const params = {
      method: 'PUT',
      headers: {
        ...JSONHeaders,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    };

    const response = await fetch(`${process.env.WF_AP_ROUTE}/users/me`, params);

    if (response.ok) {
      const user: UserType = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        user
      };
    }
    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'USER'
      }),
      user: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), user: null };
  }
};

/**
 * ***************************************************
 * GET REPORTS HISTORY
 * ***************************************************
 */
export interface GetReportsHistory extends HandlerReturn {
  reports?: ReportSnippetType[] | null;
}

interface GetReportsHistoryProps {
  limit?: number;
  skip?: number;
}
// get the history of the reports run by the user
const getReportsHistory: ApiHandler<
  GetReportsHistory,
  GetReportsHistoryProps
> = async (token: string, { limit = 10, skip = 0 }) => {
  const params = {
    method: 'GET',
    headers: {
      ...XMLHeaders,
      Authorization: `Bearer ${token}`
    }
  };
  const limitAndSkipString = limit ? `?limit=${limit}&skip=${skip}` : '';

  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/users/me/history/reports${limitAndSkipString}`,
      params
    );

    if (response.ok) {
      const reports = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        reports
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'USER'
      }),
      reports: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), reports: null };
  }
};

/**
 * ***************************************************
 * BOOKMARK REPORT
 * ***************************************************
 */

export interface BookmarkReport extends HandlerReturn {}

interface BookmarkReportProps {
  reportId: string;
  method?: 'POST' | 'DELETE';
}

const bookmarkReport: ApiHandler<BookmarkReport, BookmarkReportProps> = async (
  token: string,
  { reportId, method = 'POST' }
) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/users/me/bookmarks/${reportId}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return {
        ...makeApiHandlerResponseSuccess()
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'USER'
      })
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure() };
  }
};

/**
 * ***************************************************
 * GET USER BOOKMARKS
 * ***************************************************
 */

export interface GetUserBookmarks extends HandlerReturn {
  bookmarks: ReportSnippetType[] | null;
}

const getUserBookmarks: ApiHandler<GetUserBookmarks> = async (
  token: string
) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/users/me/bookmarks`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.ok) {
      const bookmarks = await response.json();

      return {
        ...makeApiHandlerResponseSuccess(),
        bookmarks
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'USER'
      }),
      bookmarks: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), bookmarks: null };
  }
};

const User = {
  authenticate,
  getUser,
  getFullUser,
  getReportsHistory,
  updateUser,
  resetPassword,
  forgotPassword,
  getSSOToken,
  giveDefaults,
  bookmarkReport,
  getUserBookmarks
};

export default User;
