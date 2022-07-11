/* eslint-disable sonarjs/no-duplicate-string */
import { User as AuthUser } from 'next-auth';

import { UserType } from '../../types/global';
import { ApiHandler, HandlerReturn } from '../../types/http';
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
 * GET SSO TOKEN
 * ***************************************************
 */

const getSSOToken = async (
  token: string,
  client: 'google' | 'microsoft'
): Promise<{ access_token?: string; ok?: boolean }> => {
  if (!token) {
    return { ok: false };
  }

  const res = await fetchWrapper(
    `${process.env.WF_AP_ROUTE}/login/single-signon/${client}`,
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

const User = {
  authenticate,
  getUser,
  getSSOToken,
  giveDefaults
};

export default User;
