import { UserType } from '../../types/global';
import { ApiHandler, HandlerReturn } from '../../types/http';
import {
  OrganisationType,
  OrganisationUser,
  OrganisationUserReport,
  OrganisationUserSchema
} from '../../types/organisations';
import { errorsBySourceType, makeErrorResponse } from '../utils/error-handling';
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
  totalOrganisationReports: string | null;
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
      const totalReports = await fetch(
        `${process.env.WF_AP_ROUTE}/organisations/${orgId}/reports?limit=1`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': contentType
          }
        }
      );

      if (totalReports.ok) {
        return {
          ...makeApiHandlerResponseSuccess(),
          organisation,
          totalOrganisationReports: totalReports.headers.get('x-total-count')
        };
      }

      return {
        ...makeApiHandlerResponseSuccess(),
        organisation,
        totalOrganisationReports: null
      };
    }

    if (
      Object.keys(errorsBySourceType.ORGANISATION).includes(
        `${response.status}`
      )
    ) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        organisation: null,
        totalOrganisationReports: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        organisation: null,
        totalOrganisationReports: null,
        message: 'ORGANISATION_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      organisation: null,
      totalOrganisationReports: null,
      message: 'ORGANISATION_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * GET ORGANISATION REPORTS - /api/organisation/:orgId?reports=true
 * ***************************************************
 */

export interface getTotalOrganisationReportsType extends HandlerReturn {
  totalOrganisationReports: string | null;
}

const getOrganisationReports: ApiHandler<
  getTotalOrganisationReportsType,
  GetOrganisationProps
> = async (token, { orgId }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/organisations/${orgId}/reports?limit=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        }
      }
    );

    if (response.ok) {
      return {
        ...makeApiHandlerResponseSuccess(),
        totalOrganisationReports: response.headers.get('x-total-count')
      };
    }

    if (
      Object.keys(errorsBySourceType.ORGANISATION).includes(
        `${response.status}`
      )
    ) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        totalOrganisationReports: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        totalOrganisationReports: null,
        message: 'ORGANISATION_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      totalOrganisationReports: null,
      message: 'ORGANISATION_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * PUT ORGANISATION - /api/organisation/:orgId
 * ***************************************************
 */
export interface UpdateOrganisation extends HandlerReturn {
  organisation: OrganisationType | null;
}
interface UpdateOrganisationProps extends GetOrganisationProps {
  body: string;
}

const updateOrganisation: ApiHandler<
  UpdateOrganisation,
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

    if (
      Object.keys(errorsBySourceType.ORGANISATION).includes(
        `${response.status}`
      )
    ) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        organisation: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        organisation: null,
        message: 'ORGANISATION_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      organisation: null,
      message: 'ORGANISATION_PROCESSING_ISSUE'
    };
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

    if (
      Object.keys(errorsBySourceType.ORGANISATION).includes(
        `${response.status}`
      )
    ) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        users: null,
        total: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        users: null,
        total: null,
        message: 'ORGANISATION_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      users: null,
      total: null,
      message: 'ORGANISATION_PROCESSING_ISSUE'
    };
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
          },
          ...JSON.parse(body)
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

    if (
      Object.keys(errorsBySourceType.ORGANISATION).includes(
        `${response.status}`
      )
    ) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        user: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        user: null,
        message: 'ORGANISATION_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      user: null,
      message: 'ORGANISATION_PROCESSING_ISSUE'
    };
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

    if (
      Object.keys(errorsBySourceType.ORGANISATION).includes(
        `${response.status}`
      )
    ) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        user: null,
        userReports: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        user: null,
        userReports: null,
        message: 'ORGANISATION_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      user: null,
      userReports: null,
      message: 'ORGANISATION_PROCESSING_ISSUE'
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

    if (
      Object.keys(errorsBySourceType.ORGANISATION).includes(
        `${response.status}`
      )
    ) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        user: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'ORGANISATION'
        }),
        user: null,
        message: 'ORGANISATION_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      user: null,
      message: 'ORGANISATION_PROCESSING_ISSUE'
    };
  }
};

const Organisation = {
  getOrganisation,
  getOrganisationReports,
  getOrganisationUsers,
  getOrganisationUserAndReports,
  postOrganisationUser,
  updateOrganisation,
  patchOrganisationUser
};

export default Organisation;
