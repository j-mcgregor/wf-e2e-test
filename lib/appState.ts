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
    reports?:
      | [
          // {
        // id: number;
        // company_name: string;
        // sme_zscore: number;
        // bond_rating: number;
        // created_at: number;
        // }
        ]
      | undefined;
  };
}
const initialAppState = atom<SessionUser>({
  key: 'appState',
  default: {
    user: {}
  }
});

export default initialAppState;
