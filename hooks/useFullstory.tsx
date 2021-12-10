import { useEffect } from 'react';
import * as FullStory from '@fullstory/browser';

import useLocalStorage from '../hooks/useLocalStorage';

const useFullstory = () => {
  const [user] = useLocalStorage('user', '');
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FULLSTORY_ID && user) {
      FullStory.init({ orgId: process.env.NEXT_PUBLIC_FULLSTORY_ID });
      FullStory.identify(user, {
        email: user
      });
    }
  }, [user]);
};

export default useFullstory;
