import Particles from 'react-particles-js';

import tailwindConfig from '../../tailwind.config.js';

type LayoutProps = {
  children: React.ReactNode;
};

const LoginContainer = ({ children }: LayoutProps) => {
  return (
    <div className="absolute min-h-screen w-screen left-0 bg-alt z-10 flex justify-center items-center">
      <Particles
        className="h-full min-h-screen w-full fixed top-0 bg-gray-300"
        params={{
          particles: {
            color: { value: tailwindConfig.theme.extend.colors.primary },
            lineLinked: {
              color: tailwindConfig.theme.extend.colors.primary
            },
            number: {
              value: 50
            },
            size: {
              value: 4
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              }
            }
          }
        }}
      />

      {/* w-11/12 md:w-136 bg-black text-white flex flex-col mx-auto px-10 md:px-20 py-14 */}
      <div className="z-20 w-full px-2">
        <div className="w-full sm:max-w-xl bg-black text-white flex mx-auto flex-col px-12 sm:px-20 py-6 sm:py-14 sm:text-left my-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
