import { atom } from 'recoil';

import { SessionUser } from '../types/global';

// https://github.com/facebookexperimental/Recoil/issues/733
// separate files for state issues NextJS

const appState = atom<SessionUser>({
  key: 'appState',
  default: {
    user: {}
  }
});

export default appState;
