/* eslint-disable sonarjs/cognitive-complexity */
import { useEffect, useState, useCallback } from 'react';
import Script from 'next/script';
import { UserType } from '../types/global';

const useHubspotChat = (portalId: string, load = true, user?: UserType) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [canLoadScript, setCanLoadScript] = useState(false);
  // const [ activeConversation, setActiveConversation ] = useState(false);
  const [hubspotChat, setHubspotChat] = useState(null);

  if (!portalId) {
    throw new Error('You must provide a portalId');
  }

  useEffect(() => {
    const hsConversationsSettings = {
      loadImmediately: false
    };

    if (load && !!user?.email && !!user?.id) {
      window.hsConversationsSettings = hsConversationsSettings;
      // @ts-ignore
      var _hsq = (window._hsq = window._hsq || []);
      _hsq.push([
        'identify',
        {
          email: user?.email,
          first_name: user.full_name?.split(' ')?.[0] || '',
          id: user.id
        }
      ]);
      setCanLoadScript(true);
    }
  }, [user]);

  const awaitWindow = typeof window !== 'undefined' ? window : {};

  useEffect(() => {
    if (hasLoaded) {
      window?.HubSpotConversations?.widget?.load();
    }

    //@ts-ignore
  }, [awaitWindow?.HubSpotConversations]);

  const HubspotScript = () =>
    load && canLoadScript ? (
      <Script
        type="text/javascript"
        strategy={'afterInteractive'}
        async={true}
        defer={true}
        id={'hs-script-loader'}
        src={`//js.hs-scripts.com/${portalId}.js`}
        onLoad={e => {
          setHasLoaded(true);
          // @ts-ignore
          setHubspotChat(window?.HubSpotConversations);
        }}
      ></Script>
    ) : null;

  const openHandler = useCallback(() => {
    if (hubspotChat) {
      // @ts-ignore
      hubspotChat?.widget?.open();
    }
  }, [hubspotChat]);

  const closeHandler = useCallback(() => {
    if (hubspotChat) {
      // @ts-ignore
      hubspotChat?.widget?.close();
    }
  }, [hubspotChat]);

  return {
    HubspotScript,
    hasLoaded,
    hubspotChat,
    openHandler,
    closeHandler
  };
};

export default useHubspotChat;
