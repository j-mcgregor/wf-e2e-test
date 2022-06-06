import { useHasNewDeploy } from 'next-deploy-notifications';
import React from 'react';
import config from '../../config';

const NewDeploymentNotification = () => {
  let { hasNewDeploy } = useHasNewDeploy({
    endpoint: `${config.URL}/api/has-new-deploy`
  });

  return hasNewDeploy ? (
    <article className="fixed top-0 w-full text-center py-4 z-40  bg-gray-100 shadow-xl">
      A new version of Wiserfunding&apos;s Risk Platform is available.
      <button
        className="text-highlight inline-block ml-4"
        onClick={() => window.location.reload()}
      >
        Load latest version
      </button>
    </article>
  ) : null;
};

export default NewDeploymentNotification;
