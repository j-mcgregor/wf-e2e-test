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
  companyId: string;
}

const getOrganisation: ApiHandler<
  GetOrganisation,
  GetOrganisationProps
> = async (token, { companyId }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/organisations/${companyId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

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
