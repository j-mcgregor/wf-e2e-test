import React from 'react';

import SkeletonMenu from './SkeletonMenu';

const SkeletonLayout = ({ noNav }: { noNav?: boolean }) => {
  return (
    <div>
      <div className="h-screen bg-bg overflow-hidden flex md:flex-row flex-col ">
        {!noNav && (
          <>
          <aside className="hidden  md:w-56 px-4 bg-gray-200 animate-pulse md:flex flex-col h-full justify-between py-8">
            <SkeletonMenu items={4} />
            <SkeletonMenu items={5} />
          </aside>
          <aside className="w-full h-12 bg-gray-200 md:hidden">
          </aside>
          </>
        )}
        <main
          className={`flex-1 relative overflow-y-auto focus:outline-none py-12 md:py-32 px-4`}
        >
          <div className={`max-w-4xl mx-auto grid grid-cols-2 grid-rows-2 h-full w-full gap-4`}>
            <div className="h-full w-full rounded bg-gray-200 animate-pulse"></div>
            <div className="h-full w-full rounded bg-gray-300 animate-pulse"></div>
            <div className="h-full w-full rounded bg-gray-300 animate-pulse"></div>
            <div className="h-full w-full rounded bg-gray-200 animate-pulse"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkeletonLayout;
