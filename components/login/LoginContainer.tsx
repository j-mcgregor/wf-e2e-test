type LayoutProps = {
  children: React.ReactNode;
};

const LoginContainer = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex items-center">
      <div className="w-10/12 md:w-136 bg-black text-white flex flex-col mx-auto px-20 py-14">
        {children}
      </div>
    </div>
  );
};

export default LoginContainer;
