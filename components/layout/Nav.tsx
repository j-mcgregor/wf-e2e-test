import React from "react";
import {classNames, navigation} from "./Layout";

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface NavigationProps {
    name: string;
    href?: string;
    icon?: HeroIcon;
    current?: boolean;
    title?: boolean;
    authAction?: () => void;
}

interface NavStyleProps {
    navStyle?: string;
    aLink?: string;
    itemTitle?: string
    itemIcon?: string;
}

interface NavProps {
    path: string
    navigation: NavigationProps[]
    navStyle?: NavStyleProps;
}


const Nav = ({path, navigation}: NavProps) => {
    return (
        // <nav className={classNames( navStyle.navStyle ? navStyle.navStyle : "flex-1 bg-primary px-2 space-y-1")}>
        //     {navigation.map((item) => {
        //             if (item.title) {
        //                 return (
        //                     <div
        //                         key={item.name}
        //                         className={classNames(navStyle.aLink ? navStyle.aLink : 'text-white ' +
        //                             'rounded-md py-2 px-2 flex ' +
        //                             'items-center text-sm font-medium')}>
        //                         {item.name && item.name}
        //                     </div>)
        //             }
        //             return (
        //                 <a
        //                     key={item.name}
        //                     href={item.href}
        //                     className={classNames(
        //                         (item.href === path) ? 'bg-secondary text-white '
        //                             : 'text-white hover:bg-secondary ' +
        //                             'group rounded-md py-2 px-2 flex ' +
        //                             'items-center text-sm font-medium'
        //                     )}
        //                 >
        //                     {item.icon &&
        //                     <item.icon
        //                         className={classNames(navStyle.itemIcon ? navStyle.itemIcon : 'text-white mr-3 flex-shrink-0 h-6 w-6')}
        //                         aria-hidden="true"
        //                     />}
        //                     {item.name && item.name}
        //                 </a>
        //             )
        //         }
        //     )
        //     }
        // </nav>

        <nav className={'flex-1 bg-primary px-2 space-y-1'}>
            {navigation.map((item) => {
                    if (item.title) {
                        return (
                            <div
                                key={item.name}
                                className={'text-white ' +
                                'rounded-md group py-2 px-2 flex ' +
                                'items-center text-sm font-medium'}>
                                {item.name && item.name}
                            </div>)
                    }
                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                (item.href === path) ? 'bg-secondary text-white '
                                    : 'text-white hover:bg-secondary ',
                                    'group rounded-md py-2 px-2 flex ' +
                                    'items-center text-sm font-medium'
                            )}
                        >
                            {item.icon &&
                            <item.icon
                                className='text-white mr-3 flex-shrink-0 h-6 w-6'
                                aria-hidden="true"
                            />}
                            {item.name && item.name}
                        </a>
                    )
                }
            )
            }
        </nav>
    );
};

export default Nav;
