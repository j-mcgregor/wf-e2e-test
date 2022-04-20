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

// GET /api/organisation/:orgId
export interface GetOrganisation extends HandlerReturn {
  organisation: OrganisationType | null; // <- null indicates a failure since typing makes this value required
}

interface GetOrganisationProps {
  orgId: string;
}

const getOrganisation: ApiHandler<
  GetOrganisation,
  GetOrganisationProps
> = async (token: string, { orgId }) => {
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

// PUT /api/organisation/:orgId
interface UpdateOrganisationProps extends GetOrganisationProps {
  body: string;
}

const updateOrganisation: ApiHandler<
  GetOrganisation,
  UpdateOrganisationProps
> = async (token: string, { orgId, body }) => {
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

// GET /api/organisation/:orgId/users
export interface GetOrganisationUsers extends HandlerReturn {
  users: OrganisationUser[] | null; // <- null indicates a failure since typing makes this value required
  total: number | null;
}

interface GetOrganisationUsersProps extends GetOrganisationProps {
  limit: number;
  skip: number;
}

const getOrganisationUsers: ApiHandler<
  GetOrganisationUsers,
  GetOrganisationUsersProps
> = async (token: string, { orgId, limit, skip }) => {
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

// POST /api/organisation/:orgId/users
export interface PostOrganisationUser extends HandlerReturn {
  user: OrganisationUser | null; // <- null indicates a failure since typing makes this value required
}

interface PostOrganisationUserProps extends GetOrganisationProps {
  body: string;
}

const postOrganisationUser: ApiHandler<
  PostOrganisationUser,
  PostOrganisationUserProps
> = async (token: string, { orgId, body }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/organisations/${orgId}/users`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        },
        body
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

// GET /api/organisation/:orgId/users/:userId
// GET /api/organisation/:orgId/users/:userId?report=true
export interface GetOrganisationUserAndReports extends HandlerReturn {
  user: OrganisationUser | null; // <- null indicates a failure since typing makes this value required
  userReports: OrganisationUserReport[] | null; // <- null indicates a failure since typing makes this value required
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
> = async (
  token: string,
  { orgId, userId, limit = 7, skip = 0, reports = false }
) => {
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

// PATCH /api/organisation/:orgId/users?userId=:userId
export interface PatchOgranisationUser extends PostOrganisationUser {}

interface PatchOrganisationUserProps {
  orgId: string;
  userId: string;
  body: string;
}

const patchOrganisationUser: ApiHandler<
  PatchOgranisationUser,
  PatchOrganisationUserProps
> = async (token: string, { orgId, userId, body }) => {
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
