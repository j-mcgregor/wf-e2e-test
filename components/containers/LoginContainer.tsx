import Particles from 'react-particles-js';

type LayoutProps = {
  children: React.ReactNode;
};

const LoginContainer = ({ children }: LayoutProps) => {
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
      <div className="h-screen flex items-center">
        <div className="w-11/12 md:w-136 bg-black text-white flex flex-col mx-auto px-10 md:px-20 py-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
