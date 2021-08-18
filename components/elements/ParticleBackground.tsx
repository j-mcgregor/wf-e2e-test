import { ReactNode } from 'react';

import Particles from 'react-particles-js';

interface ParticleProps {
  children: ReactNode;
}

const ParticleBackground = ({ children }: ParticleProps) => {
  return (
    <div className="fixed h-screen w-screen left-0 bg-alt">
      <Particles
        className="h-full fixed z-back"
        params={{
          particles: {
            color: { value: '#ffffff' },
            lineLinked: {
              color: '#ffffff'
            },
            number: {
              value: 50
            },
            size: {
              value: 6
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
      {children}
    </div>
  );
};

export default ParticleBackground;
