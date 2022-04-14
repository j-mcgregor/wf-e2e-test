import { UserType } from '../../types/global';
import { ApiHandler, HandlerReturn } from '../../types/http';
import {
  OrganisationType,
  OrganisationUser,
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
      }/users?ogranisation_id=${orgId}?_start=${skip}&_end=${skip + limit}`,
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

export interface GetOrganisationUser extends HandlerReturn {
  user: OrganisationUser | null; // <- null indicates a failure since typing makes this value required
}

interface GetOrganisationUserProps extends GetOrganisationProps {
  userId: string;
}

const getOrganisationUser: ApiHandler<
  GetOrganisationUser,
  GetOrganisationUserProps
> = async (token: string, { orgId, userId }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/users?id=${userId}&organisation_id=${orgId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType
        }
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

interface UpdateOrganisationProps extends GetOrganisationProps {
  body: OrganisationType;
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
        body: JSON.stringify(body)
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

interface UpdateOrganisationUserProps extends GetOrganisationUserProps {
  body: OrganisationUserSchema;
}

const updateOrganisationUser: ApiHandler<
  GetOrganisationUser,
  UpdateOrganisationUserProps
> = async (token: string, { userId, body }) => {
  try {
    const response = await fetch(`${process.env.WF_AP_ROUTE}/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType
      },
      body: JSON.stringify(body)
    });

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
  getOrganisationUser,
  updateOrganisation,
  updateOrganisationUser
};

export default Organisation;
