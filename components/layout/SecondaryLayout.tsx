import React from 'react';

interface SecondaryNavProps {
  children: React.ReactNode;
  navigation: React.ReactNode;
}

const SecondaryNav = ({ navigation, children }: SecondaryNavProps) => {
  return (
    <div className="flex h-screen overflow-hidden flex-1 relative ">
      <aside className="hidden bg-gray-300 md:flex lg:flex-shrink-0">
        <div className="w-64 flex flex-col">{navigation}</div>
      </aside>

     
      <div
        id="report-container"
        className="z-10 bg-gray-100 w-full lg:px-20 overflow-y-auto"
      >
        {children}
      </div>
     
    </div>
  );
};

export default SecondaryNav;
