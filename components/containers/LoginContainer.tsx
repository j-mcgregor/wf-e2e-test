import Particles from 'react-tsparticles';

import tailwindConfig from '../../tailwind.config.js';

interface LoginProps {
  children: React.ReactNode;
}

const LoginContainer = ({ children }: LoginProps) => {
  return (
    <div className="absolute min-h-screen w-screen left-0 bg-alt z-10 flex justify-center items-center">
      <Particles
        className="h-full min-h-screen w-full fixed top-0 bg-gray-300 pointer-events-none"
        params={{
          fps_limit: 60,
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onClick: { enable: true, mode: 'push' },
              onHover: { enable: true, mode: 'repulse' },
              resize: true
            },
            modes: {
              push: { particles_nb: 4 },
              repulse: { distance: 200, duration: 0.4 }
            }
          },
          particles: {
            color: { value: tailwindConfig.theme.extend.colors.primary },
            links: {
              color: tailwindConfig.theme.extend.colors.primary,
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1
            },
            move: {
              bounce: false,
              direction: 'none',
              enable: true,
              outMode: 'out',
              random: false,
              speed: 1.5,
              straight: false
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { random: true, value: 5 }
          },
          detectRetina: true
        }}
      />
      <div
        className={`${
          children ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500 z-20 w-full px-2 h-screen flex items-center`}
      >
        <div className="w-full sm:max-w-xl bg-black text-white flex mx-auto flex-col px-12 sm:px-20 py-6 sm:py-14 sm:text-left my-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
