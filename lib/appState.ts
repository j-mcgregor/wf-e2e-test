import { atom } from 'recoil';

import { StatDataType } from '../types/global';

interface SessionUser {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    recent_usage?: {
      reports_ran: StatDataType;
      api_requests: StatDataType;
      last_login: StatDataType;
    };
    reports?: [] | null;
  };
}

// https://github.com/facebookexperimental/Recoil/issues/733
// separate files for state issues NextJS

const appState = atom<SessionUser>({
  key: 'appState',
  default: {
    user: {}
  }
});

export default appState;
