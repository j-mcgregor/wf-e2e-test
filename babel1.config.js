// being used for WDYR tests - if not in use there is a 1 infront

// babel.config.js
module.exports = function (api) {
  const isServer = api.caller(caller => caller?.isServer);
  const isCallerDevelopment = api.caller(caller => caller?.isDev);

  const presets = [
    [
      'next/babel',
      {
        'preset-react': {
          importSource:
            !isServer && isCallerDevelopment
              ? '@welldone-software/why-did-you-render'
              : 'react'
        }
      }
    ]
  ];

  return { presets };
};
