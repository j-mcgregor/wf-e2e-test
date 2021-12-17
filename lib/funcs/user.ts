import { UserType, ReportSnippetType } from '../../types/global';

const XMLHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
const JSONHeaders = {
  'Content-Type': 'application/json'
};

const authenticate = async (email: string, password: string) => {
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
};

const getUser = async (token: string) => {
  if (!token) {
    return false;
  }
  const res = await fetch(`${process.env.WF_AP_ROUTE}/users/me`, {
    method: 'GET',
    headers: {
      ...XMLHeaders,
      Authorization: `Bearer ${token}`
    }
  });

  // fetch the user reports history from separate endpoint
  const userReports = await getReportsHistory(token);
  if (res.ok) {
    const user = await res.json();

    const userWithReports = {
      // structure the user correctly if missing data (preferences etc)
      ...user,
      // check for preferences and add defaults if missing
      ...giveDefaults(user),
      // add in the reports history, handle failed request
      reports: userReports.ok ? userReports.reports : [],
      // to add later
      batched_report_jobs: []
    };
    return { ok: true, ...userWithReports, token };
  }
  return { ok: false, status: res.status };
};

const giveDefaults = (user: any) => {
  const structuredUser: any = {
    preferences: {
      communication: {
        batch_report_email: true,
        service_updates: true,
        company_updates: false
      },
      defaults: {
        locale: 'en-GB',
        currency: 'GBP',
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

const updateUser = async (
  user: UserType,
  token: string
): Promise<{ user?: UserType; ok?: boolean; status?: number }> => {
  const params = {
    method: 'PUT',
    headers: {
      ...JSONHeaders,
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  };

  const res = await fetch(`${process.env.WF_AP_ROUTE}/users/me`, params);

  if (res.ok) {
    const user = await res.json();
    return { ok: true, user, status: res.status };
  }
  return { ok: false, status: res.status };
};

// get the history of the reports run by the user
const getReportsHistory = async (
  token: string
): Promise<{ reports?: ReportSnippetType[]; ok?: boolean; status: number }> => {
  const params = {
    method: 'GET',
    headers: {
      ...XMLHeaders,
      Authorization: `Bearer ${token}`
    }
  };

  const res = await fetch(`${process.env.WF_AP_ROUTE}/reports`, params);
  if (res.ok) {
    const reports = await res.json();

    return { ok: true, reports, status: res.status };
  }

  return { ok: false, status: res.status };
};

const User = {
  authenticate,
  getUser,
  getReportsHistory,
  updateUser,
  resetPassword,
  forgotPassword,
  getSSOToken,
  giveDefaults
};

export default User;
