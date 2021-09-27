import { atom } from 'recoil';

import { SessionUser } from '../types/global';

// https://github.com/facebookexperimental/Recoil/issues/733
// separate files for state issues NextJS

const appState = atom<SessionUser>({
  key: 'appState',
  default: {
    user: {
      name: null,
      email: null,
      image: null,
      recent_usage: {
        reports_ran: '',
        api_requests: '',
        last_login: ''
      },
      is_SSO: false,
      contact_information: {
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        street_address: '',
        city: '',
        state: '',
        postcode: '',
        company_name: '',
        company_HQ_Location: ''
      },
      preferences: {
        localisation: '',
        default_currency: '',
        default_login_screen: '',
        default_reporting_country: '',
        communication: { comments: false, candidates: false, offers: false }
      },
      reports: []
    }
  }
});

export default appState;
