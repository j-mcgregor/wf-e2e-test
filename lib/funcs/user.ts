/* eslint-disable sonarjs/no-duplicate-string */
import { User as AuthUser } from 'next-auth';
import { UserType, ReportSnippetType } from '../../types/global';
import { ApiHandler, HandlerReturn } from '../../types/http';
import { GENERIC_API_ERROR, INTERNAL_SERVER_ERROR } from '../utils/error-codes';
import { errorsBySourceType, makeErrorResponse } from '../utils/error-handling';
import { fetchWrapper } from '../utils/fetchWrapper';
import {
  makeApiHandlerResponseFailure,
  makeApiHandlerResponseSuccess
} from '../utils/http-helpers';

export const XMLHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

/**
 * ***************************************************
 * AUTHENTICATE
 * ***************************************************
 */

const authenticate = async (email: string, password: string) => {
  try {
    const res = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/login/access-token`,
      {
        method: 'POST',
        headers: {
          ...XMLHeaders
        },
        body: new URLSearchParams({
          username: email,
          password: password,
          grant_type: 'password'
        })
      }
    );
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
      fetchWrapper(`${process.env.WF_AP_ROUTE}/users/me`, {
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

    if (errorsBySourceType.USER[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        user: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        user: null,
        message: 'USER_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      user: null,
      message: 'USER_PROCESSING_ISSUE'
    };
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
      fetchWrapper(`${process.env.WF_AP_ROUTE}/users/me`, {
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

    if (errorsBySourceType.USER[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        user: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        user: null,
        message: 'USER_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      user: null,
      message: 'USER_PROCESSING_ISSUE'
    };
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

export interface ForgotPassword extends HandlerReturn {
  msg: string | null;
}

const forgotPassword: ApiHandler<ForgotPassword> = async (email: string) => {
  if (!email) {
    return {
      ...makeApiHandlerResponseFailure({ message: 'Missing email' }),
      msg: null
    };
  }

  try {
    const response = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/password-recovery/${email}`,
      {
        method: 'POST',
        headers: {
          ...XMLHeaders
        }
      }
    );

    if (response.ok) {
      const result = await response.json();
      return {
        ...makeApiHandlerResponseSuccess({ status: response.status }),
        msg: result.msg
      };
    }

    if (errorsBySourceType.USER[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        msg: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        msg: null,
        message: 'USER_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      msg: null,
      message: 'USER_PROCESSING_ISSUE'
    };
  }
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

  const res = await fetchWrapper(
    `${process.env.WF_AP_ROUTE}/login/single-signon`,
    {
      method: 'POST',
      headers: {
        ...XMLHeaders
      },
      body: new URLSearchParams({
        sso_token: token
      })
    }
  );

  if (res.ok) {
    const { access_token } = await res.json();
    return { access_token, ok: true };
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
    const response = await fetchWrapper(`${process.env.WF_AP_ROUTE}/users/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const user: UserType = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        user
      };
    }

    if (errorsBySourceType.USER[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        user: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        user: null,
        message: 'USER_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      user: null,
      message: 'USER_PROCESSING_ISSUE'
    };
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
  const limitAndSkipString = limit ? `?limit=${limit}&skip=${skip}` : '';

  try {
    const response = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/users/me/history/reports${limitAndSkipString}`,
      {
        method: 'GET',
        headers: {
          ...XMLHeaders,
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      const reports = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        reports
      };
    }

    if (errorsBySourceType.USER[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        reports: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        reports: null,
        message: 'USER_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      reports: null,
      message: 'USER_PROCESSING_ISSUE'
    };
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
    const response = await fetchWrapper(
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

    if (errorsBySourceType.USER[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        })
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        message: 'USER_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      message: 'USER_PROCESSING_ISSUE'
    };
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
    const response = await fetchWrapper(
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

    if (errorsBySourceType.USER[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        bookmarks: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'USER'
        }),
        bookmarks: null,
        message: 'USER_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      bookmarks: null,
      message: 'USER_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * UPDATE PASSWORD - FORGOT PASSWORD
 * ***************************************************
 */

export interface UpdatePassword extends HandlerReturn {
  user: UserType | null;
}

interface UpdatePasswordProps {
  user: UserType;
}

const updatePassword: ApiHandler<UpdatePassword, UpdatePasswordProps> = async (
  token: string,
  { user }
) => {
  try {
    const response = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/users/password`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

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

const User = {
  authenticate,
  getUser,
  getFullUser,
  getReportsHistory,
  updateUser,
  forgotPassword,
  getSSOToken,
  giveDefaults,
  bookmarkReport,
  getUserBookmarks,
  updatePassword
};

export default User;
