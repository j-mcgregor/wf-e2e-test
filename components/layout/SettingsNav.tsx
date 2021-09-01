import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {scroller} from 'react-scroll';

import {useSettingsNavItems} from "../../hooks/useNavigation";
import IconTag from "../icons/IconTag";

const SettingsNav = () => {
    const [activeSettingsItem, setActiveSettingsItem] = useState<string>('personal information');
    const navItems = useSettingsNavItems();
    const router = useRouter();


    const handleSettingsNavClick = (headerText: string) => {
        const path = router.asPath.replace(/#[\w+ -]+/, '');
        const snakedHeader = headerText.replace(/\s/g, '-').toLowerCase();
        setActiveSettingsItem(headerText);

        // handles the smooth scrolling
        scroller.scrollTo(`${snakedHeader}-id`, {
            duration: 400,
            delay: 0,
            smooth: true,
            // refers to the container in the secondary layout
            containerId: 'report-container'
        });

        // shallow push to avoid forcing re-render
        return router.push(`${path}#${snakedHeader}`, undefined, {shallow: true});
    };

    // monitor the changes to the # path and update the menu based on the # path ids
    useEffect(() => {
        const dynamicPath = router.asPath.replace(/#[\w+ -]+/, '');
        const path = router.asPath.replace(`${dynamicPath}#`, '');
        const header = path.replace(/-/g, ' ').toLowerCase();
        setActiveSettingsItem(header);
    }, [router.asPath]);

    return (
        <div className="px-6 pt-8 flex flex-col h-full">
            <div className="flow-root mt-8 ">
                <ul className="text-sm p-2">
                    {navItems.map(({title,icon}, index) => {
                        const lowerHeading = title.toLowerCase();
                        const isActive = activeSettingsItem === lowerHeading;
                        return (
                            <li key={index}>
                                <button
                                    className={`${
                                        isActive ? 'bg-gray-100' : ''} pt-2 px-1 rounded cursor-pointer w-full hover:text-alt`}
                                    onClick={() => handleSettingsNavClick(lowerHeading)}
                                >
                                    <div className="relative pb-2 h-full">
                                        <div className="relative flex items-center">

                                            {icon && <IconTag icon={icon} className={"h-5 w-5 mr-2"}/>}
                                            <p
                                                className={`${
                                                    isActive ? 'text-highlight' : ''
                                                } ml-5 z-10 text-center`}
                                            >
                                                {title}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SettingsNav;
