import React from 'react';

interface SecondaryNavProps {
  children: React.ReactNode;
  navigation?: React.ReactNode;
  // ^ I made this optional for empty use in the skeleton report <- dan
}

const SecondaryNav = ({ navigation, children }: SecondaryNavProps) => {
  return (
    <div className="flex h-screen overflow-hidden flex-1 relative ">
      <aside className="hidden bg-gray-300 md:flex lg:flex-shrink-0">
        <div className="w-64 flex flex-col">{navigation}</div>
      </aside>

      <div
        id="secondary-layout-container"
        className="z-10 bg-gray-100 w-full px-2 sm:px-4 md:px-8 xl:px-20 overflow-y-auto "
      >

        <div className="max-w-5xl mx-auto">
            {children}
        </div>
      
      </div>
    </div>
  );
};

export default SecondaryNav;
