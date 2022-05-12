import { UserType } from '../../types/global';
import { ApiHandler, HandlerReturn } from '../../types/http';
import {
  OrganisationType,
  OrganisationUser,
  OrganisationUserReport,
  OrganisationUserSchema
} from '../../types/organisations';
import { makeErrorResponse } from '../utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeApiHandlerResponseSuccess
} from '../utils/http-helpers';

/**
 * ***************************************************
 * GET ORGANISATION
 * ***************************************************
 */

const contentType = 'application/json';

/**
 * ***************************************************
 * GET ORGANISATION - /api/organisation/:orgId
 * ***************************************************
 */
export interface GetOrganisation extends HandlerReturn {
  organisation: OrganisationType | null;
}

interface GetOrganisationProps {
  orgId: string;
}

const getOrganisation: ApiHandler<
  GetOrganisation,
  GetOrganisationProps
> = async (token, { orgId }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/organisations/${orgId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        }
      }
    );

    if (response.ok) {
      const organisation: OrganisationType = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        organisation
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'ORGANISATION'
      }),
      organisation: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), organisation: null };
  }
};

/**
 * ***************************************************
 * PUT ORGANISATION - /api/organisation/:orgId
 * ***************************************************
 */
export interface UpdateOrganisation extends GetOrganisation {}
interface UpdateOrganisationProps extends GetOrganisationProps {
  body: string;
}

const updateOrganisation: ApiHandler<
  GetOrganisation,
  UpdateOrganisationProps
> = async (token, { orgId, body }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/organisations/${orgId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        },
        body
      }
    );
    if (response.ok) {
      const organisation: OrganisationType = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        organisation
      };
    }
    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'ORGANISATION'
      }),
      organisation: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), organisation: null };
  }
};

/**
 * ***************************************************
 * GET ORGANISATION USERS - /api/organisation/:orgId/users
 * ***************************************************
 */
export interface GetOrganisationUsers extends HandlerReturn {
  users: OrganisationUser[] | null;
  total: number | null;
}

interface GetOrganisationUsersProps extends GetOrganisationProps {
  limit: number;
  skip: number;
}

const getOrganisationUsers: ApiHandler<
  GetOrganisationUsers,
  GetOrganisationUsersProps
> = async (token, { orgId, limit, skip }) => {
  try {
    const response = await fetch(
      `${
        process.env.WF_AP_ROUTE
      }/organisations/${orgId}/users?_start=${skip}&_end=${skip + limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        }
      }
    );

    if (response.ok) {
      const users: OrganisationUser[] = await response.json();
      const totalCountHeader: string | null =
        response?.headers?.get('X-Total-Count');
      // Check if header is present
      if (totalCountHeader) {
        const total: number = parseInt(totalCountHeader);
        return {
          ...makeApiHandlerResponseSuccess(),
          users,
          total
        };
      } else {
        return {
          ...makeApiHandlerResponseSuccess(),
          users,
          total: 0
        };
      }
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'ORGANISATION'
      }),
      users: null,
      total: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), users: null, total: null };
  }
};

/**
 * ***************************************************
 * POST ORGANISATION USER - /api/organisation/:orgId/users
 * ***************************************************
 */
export interface PostOrganisationUser extends HandlerReturn {
  user: OrganisationUser | null;
}

interface PostOrganisationUserProps extends GetOrganisationProps {
  body: string;
}

const postOrganisationUser: ApiHandler<
  PostOrganisationUser,
  PostOrganisationUserProps
> = async (token, { orgId, body }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/organisations/${orgId}/users`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        },
        body: JSON.stringify({
          ...JSON.parse(body),
          is_active: true,
          is_superuser: false,
          organisation_id: orgId,
          preferences: {
            defaults: {
              locale: 'en-GB',
              currency: 'GBP',
              home_page: 'dashboard',
              reporting_country: 'GB'
            },
            communication: {
              batch_report_email: true,
              service_updates: true,
              company_updates: true
            }
          }
        })
      }
    );

    if (response.ok) {
      const user: OrganisationUser = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        user
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'ORGANISATION'
      }),
      user: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), user: null };
  }
};

/**
 * ***************************************************
 * GET ORGANISATION USER - /api/organisation/:orgId/users/:userId
 * GET ORGANISATION USER REPORTS - /api/organisation/:orgId/users/:userId?report=true
 * ***************************************************
 */
export interface GetOrganisationUserAndReports extends HandlerReturn {
  user: OrganisationUser | null;
  userReports: OrganisationUserReport[] | null;
}

interface GetOrganisationUserAndReportsProps extends GetOrganisationProps {
  userId: string;
  reports?: boolean;
  limit?: number;
  skip?: number;
}

const getOrganisationUserAndReports: ApiHandler<
  GetOrganisationUserAndReports,
  GetOrganisationUserAndReportsProps
> = async (token, { orgId, userId, limit = 7, skip = 0, reports = false }) => {
  try {
    const response = await fetch(`${process.env.WF_AP_ROUTE}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType
      }
    });

    if (response.ok) {
      const user: OrganisationUser = await response.json();
      if (reports) {
        const reportsResponse = await fetch(
          `${
            process.env.WF_AP_ROUTE
          }/organisations/${orgId}/users/${userId}/reports?_start=${skip}&_end=${
            skip + limit
          }`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': contentType
            }
          }
        );

        if (reportsResponse.ok) {
          const userReports: OrganisationUserReport[] =
            await reportsResponse.json();
          return {
            ...makeApiHandlerResponseSuccess(),
            user,
            userReports
          };
        }
      }
      return {
        ...makeApiHandlerResponseSuccess(),
        user,
        userReports: null
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'ORGANISATION'
      }),
      user: null,
      userReports: null
    };
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      user: null,
      userReports: null
    };
  }
};

/**
 * ***************************************************
 * PATCH ORGANISATION USER - /api/organisation/:orgId/users?userId=:userId
 * ***************************************************
 */
export interface PatchOrganisationUser extends PostOrganisationUser {}

interface PatchOrganisationUserProps {
  orgId: string;
  userId: string;
  body: string;
}

const patchOrganisationUser: ApiHandler<
  PatchOrganisationUser,
  PatchOrganisationUserProps
> = async (token, { orgId, userId, body }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/organisations/${orgId}/users/${userId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        },
        body
      }
    );

    if (response.ok) {
      return {
        ...makeApiHandlerResponseSuccess(),
        user: await response.json()
      };
    }
    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'ORGANISATION'
      }),
      user: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), user: null };
  }
};

const Organisation = {
  getOrganisation,
  getOrganisationUsers,
  getOrganisationUserAndReports,
  postOrganisationUser,
  updateOrganisation,
  patchOrganisationUser
};

export default Organisation;
