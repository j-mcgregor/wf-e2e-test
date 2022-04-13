import { ApiHandler, HandlerReturn } from '../../types/http';
import { Organisation } from '../../types/organisations';
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

export interface GetOrganisation extends HandlerReturn {
  organisation: Organisation | null; // <- null indicates a failure since typing makes this value required
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
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(response);

    if (response.ok) {
      const organisation: Organisation = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        organisation
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'BATCH_REPORT'
      }),
      organisation: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), organisation: null };
  }
};

const Organisation = {
  getOrganisation
};

export default Organisation;
