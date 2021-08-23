import { atom } from 'recoil';
import { DefaultSession } from 'next-auth';
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
  };
} 
const initialAppState = atom<SessionUser>({
  key: 'appState',
  default: {
    user: {}
  }
});

export default initialAppState;
