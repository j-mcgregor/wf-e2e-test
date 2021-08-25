import React, {FC} from 'react';

const SecondaryLayout: FC = ({children}) => {
    return (
        <>
            {/*FIXME: instead of adding a new colour ive used a tw bg*/}
            <aside className="hidden bg-gray-300 lg:flex lg:flex-shrink-0">
                <div className="w-60 flex flex-col">
                    {children}
                </div>
            </aside>
            <div className="z-10 bg-gray-100 w-full p-10">overflow scroll container
                <main className="bg-gray-900 text-white w-full">main content</main>
            </div>
        </>
    );
}

export default SecondaryLayout;