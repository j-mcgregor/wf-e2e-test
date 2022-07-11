import { SourceTypes } from '../api-handler/api-handler';

export interface ToastAction {
  label: string;
  action: Function;
  type?: 'dismiss';
}

export interface ToastData {
  title: string;
  description: string;
  actions?: ToastAction[];
}

export interface CodeErrors {
  [status: string]: ToastData;
}

export type SourceErrors = Record<SourceTypes, CodeErrors>;

const makeCoreSourceTypeErrors = (sourceType: SourceTypes): CodeErrors => {
  return {
    [`${sourceType}_400`]: {
      title: `Something went wrong when processing ${sourceType}`,
      description: 'Please check the request and try again.',
      actions: []
    },
    [`${sourceType}_401`]: {
      title: `Not authorised to access ${sourceType}`,
      description: `You don't permission to access ${sourceType}. Please contact your admin`,
      actions: []
    },
    [`${sourceType}_404`]: {
      title: `${sourceType} not found`,
      description: `We could not find ${sourceType}. If you are sure this should exist, please login and out and try again. If problem persists please contact support`,
      actions: []
    },
    [`${sourceType}_422`]: {
      title: `Unprocessable entity for ${sourceType}`,
      description: `Please check the request and try again, or contact support.`,
      actions: []
    },
    [`${sourceType}_429`]: {
      title: `Too many requests to ${sourceType}`,
      description: `We could not find ${sourceType}. If you are sure this should exist, please login and out and try again. If problem persists please contact support`,
      actions: []
    },
    [`${sourceType}_500`]: {
      title: `${sourceType} fetching error`,
      description: `We couldn't fetch ${sourceType}. There was an unrecoverable backend error. Please try again later or contact support if this problem persists`,
      actions: []
    }
  };
};

export const ErrorMessages: SourceErrors = {
  BATCH_REPORTS_BY_ID: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('BATCH_REPORTS_BY_ID')
  },
  BATCH_MANUAL: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('BATCH_MANUAL')
  },
  BATCH_AUTO: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('BATCH_AUTO')
  },
  INTEGRATIONS_CODAT: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('INTEGRATIONS_CODAT')
  },
  INTEGRATIONS: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('INTEGRATIONS')
  },
  ORGANISATION_ALL_REPORTS: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('ORGANISATION_ALL_REPORTS')
  },
  ORGANISATION_USER: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('ORGANISATION_USER')
  },
  ORGANISATION_USERS: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('ORGANISATION_USERS')
  },
  ORGANISATION: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('ORGANISATION')
  },
  PASSWORD_RESET: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('PASSWORD_RESET')
  },
  REPORTS_NEWS: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('REPORTS_NEWS')
  },
  REPORTS_UPLOAD: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('REPORTS_UPLOAD')
  },
  REPORTS: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('REPORTS')
  },
  SEARCH_COMPANIES: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('SEARCH_COMPANIES'),
    COUNTRY_CODE_REQUIRED: {
      title: '',
      description: '',
      actions: []
    },
    SEARCH_COMPANIES_FAILURE: {
      title: '',
      description: '',
      actions: []
    },
    SEARCH_COMPANIES_SUCCESS: {
      title: '',
      description: '',
      actions: []
    },
    INVALID_COUNTRY_CODE: {
      title: '',
      description: '',
      actions: []
    }
  },
  USER_BOOKMARK: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('USER_BOOKMARK')
  },
  USER_REPORTS: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('USER_REPORTS')
  },
  USER: {
    // [SOURCE_TYPE_XXX]: {}
    ...makeCoreSourceTypeErrors('USER'),
    USER_400: {
      title: 'Password validation error',
      description:
        'The password you have provided does not match the required password validation.',
      actions: []
    },
    USER_401: {
      title: 'User not authorised',
      description:
        "Your account isn't authorised to complete that action. If you believe you should have access please re-authenticate by logging in again.",
      actions: []
    },
    USER_404: {
      title: 'User not found',
      description: 'We could not find your account please login again.',
      actions: [{ label: 'Sign out', action: () => {} }]
    },
    USER_422: {
      title: 'User validation error',
      description:
        'There was an issue with the data stored on your user account. Please try again later or contact support if this problem persists.',
      actions: [{ label: 'Contact Support', action: () => {} }]
    },
    USER_429: {
      title: 'Too many requests to users',
      description:
        'You are making too many sequential requests to the users endpoint please wait a minute before continuing.',
      actions: []
    },
    USER_500: {
      title: 'User fetching error',
      description: 'We could not find your account please login again.',
      actions: [{ label: 'Contact Support', action: () => {} }]
    }
  }
};

// - defaults => [status].title (passing in sourceType)
// - [sourceType][code].title eg USER_REPORTS.USER_REPORTS_422.title
// - custom that can be passed in to the toast creator

// How are we combining the actions with the error message?
// Will API responses for toasts only ever be Success (2xx) or Error (4xx-5xx), or do we need to account for others?
// Are we going by the Swagger API responses at all?
// - if so, would the JSON response returned by Swagger when fetching the info be any use?
// How do we tell the difference for 422 for GET and a 422 for POST from the same sourceType?

// user triggers action
// sourceType and statusCode in the response
// combine sourceType and statusCode to get title and description
// - do we have a list of actions for this particular combination somewhere or is it added to the trigger in the FE?
