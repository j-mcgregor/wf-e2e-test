import React, {Fragment, useState} from 'react'
import {useRouter} from 'next/router';
import {Dialog, Transition} from '@headlessui/react'

import Nav from './Nav';
import Seo from './Seo';
import Image from "next/image";
import WFLogo from "../../public/images/logos/wiserfunding-logo.svg";

import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'
import {MenuAlt2Icon} from "@heroicons/react/solid";


type LayoutProps = {
    children: React.ReactNode;
    title?: string;
    pageTitle?: string;
    description?: string;
    noMenu?: boolean | undefined;
    noNav?: boolean | undefined;
}

export const navigation = [
    {name: 'Dashboard', href: `/`, icon: HomeIcon, current: true},
    {name: 'Reports', href: '/reports', icon: UsersIcon, current: false},
    {name: 'Our Tools', title: true},
    {name: 'Automated Reports', href: '/automatedreports', icon: FolderIcon, current: false},
    {name: 'Batched Reports', href: '/batchedreports', icon: CalendarIcon, current: false},
    {name: 'SME Prospector', href: '/smeprospector', icon: InboxIcon, current: false},
    {name: 'Manual Reporting', href: '/manualreporting', icon: ChartBarIcon, current: false},
    {name: 'API Documentation', href: '/apidocs', icon: ChartBarIcon, current: false},
]
const logout = ():void  => alert('<<<<<<<=====!!!!!!youve been logged out !!!!!!=====>>>>>');

//FIXME: need to decide if we are passing a page or function to sign out.
export const bottomNavigation = [
    {name: 'Updates', href: '/updates'},
    {name: 'Settings', href: '/settings'},
    {name: 'Support', href: '/support'},
    {name: 'Log Out', href: '/logout'},
    {name: 'Log Out', authAction: () => logout()},
]

//FIXME: presumably logout will be a Function not an href path

export function classNames(...classes: string[]) {
    console.log('classes: ', ...classes)

    return classes.filter(Boolean).join(' ')
}

const Layout = ({children, noNav, title, description, pageTitle}: LayoutProps) => {
    const router = useRouter();
    const path: string = router.pathname
    const [sidebarOpen, setSidebarOpen] = useState(false)

    console.log(path)

    //FIXME: remove this, not needed, only needed for render sake
    noNav = true;

    return (
        <div>
            <Seo title={title} description={description} path={path}/>
            {/*{!noNav && <Nav path={path} navStyle={} navigation={}/>}*/}
            <div className="h-screen bg-white overflow-hidden flex">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 px-4 flex items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                        alt="Workflow"
                                    />
                                    <Image
                                        className="h-8 w-auto"
                                        alt={'Wiserfunding Logo'}
                                        layout="fixed"
                                        src={WFLogo}
                                    />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">

                                    <Nav path={path} navigation={navigation} navStyle={{navStyle:"px-2 space-y-1", aLink:"", itemIcon:"", itemTitle:"" }} />
                                    {/*<nav className="px-2 space-y-1">*/}
                                    {/*    {navigation.map((item) => (*/}
                                    {/*        <a*/}
                                    {/*            key={item.name}*/}
                                    {/*            href={item.href}*/}
                                    {/*            className={classNames(*/}
                                    {/*                item.current*/}
                                    {/*                    ? 'bg-gray-100 text-gray-900'*/}
                                    {/*                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',*/}
                                    {/*                'group rounded-md py-2 px-2 flex items-center text-base font-medium'*/}
                                    {/*            )}*/}
                                    {/*        >{item.icon &&*/}
                                    {/*        <item.icon*/}
                                    {/*            className={classNames(*/}
                                    {/*                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',*/}
                                    {/*                'mr-4 flex-shrink-0 h-6 w-6'*/}
                                    {/*            )}*/}
                                    {/*            aria-hidden="true"*/}
                                    {/*        />}*/}
                                    {/*            {item.name}*/}
                                    {/*        </a>*/}
                                    {/*    ))}*/}
                                    {/*</nav>*/}
                                </div>
                                <div className="flex-shrink-0 flex border-gray-200">

                                    <Nav path={path} navigation={bottomNavigation} />
                                    {/*<a href="#" className="flex-shrink-0 group block">*/}
                                    {/*    <div className="flex items-center">*/}
                                    {/*        <div>*/}
                                    {/*            <img*/}
                                    {/*                className="inline-block h-10 w-10 rounded-full"*/}
                                    {/*                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                                    {/*                alt=""*/}
                                    {/*            />*/}
                                    {/*        </div>*/}
                                    {/*        <div className="ml-3">*/}
                                    {/*            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>*/}
                                    {/*            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        </Transition.Child>
                        <div
                            className="flex-shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden bg-primary md:flex md:flex-shrink-0">
                    <div className="w-64 flex flex-col">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
                            <div className="flex-shrink-0 px-4 flex items-center">
                                <Image
                                    className="h-8 w-auto"
                                    alt={'Wiserfunding Logo'}
                                    layout="fixed"
                                    src={WFLogo}
                                />
                            </div>
                            <div className="flex-grow mt-5 flex flex-col">
                              <Nav  path={path} navigation={navigation}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 max-w-4xl mx-auto w-0 flex flex-col md:px-8 xl:px-0">
                    {/*<div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">*/}
                    <div className="relative z-10 flex-shrink-0 h-16 bg-white border-gray-200 flex">
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                        <div className="flex-1 flex justify-between px-4 md:px-0">
                            {/*search  bar*/}
                            <div className="ml-4 flex items-center md:ml-6">
                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
                                {/*>*/}
                                {/*    <span className="sr-only">View notifications</span>*/}
                                {/*    <BellIcon className="h-6 w-6" aria-hidden="true"/>*/}
                                {/*</button>*/}

                                {/* Profile dropdown */}
                                {/*<Menu as="div" className="ml-3 relative">*/}
                                {/*    <div>*/}
                                {/*        <Menu.Button*/}
                                {/*            className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">*/}
                                {/*            <span className="sr-only">Open user menu</span>*/}
                                {/*            <img*/}
                                {/*                className="h-8 w-8 rounded-full"*/}
                                {/*                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                                {/*                alt=""*/}
                                {/*            />*/}
                                {/*        </Menu.Button>*/}
                                {/*    </div>*/}
                                {/*    <Transition*/}
                                {/*        as={Fragment}*/}
                                {/*        enter="transition ease-out duration-100"*/}
                                {/*        enterFrom="transform opacity-0 scale-95"*/}
                                {/*        enterTo="transform opacity-100 scale-100"*/}
                                {/*        leave="transition ease-in duration-75"*/}
                                {/*        leaveFrom="transform opacity-100 scale-100"*/}
                                {/*        leaveTo="transform opacity-0 scale-95"*/}
                                {/*    >*/}
                                {/*        <Menu.Items*/}
                                {/*            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">*/}
                                {/*            {userNavigation.map((item) => (*/}
                                {/*                <Menu.Item key={item.name}>*/}
                                {/*                    {({active}) => (*/}
                                {/*                        <a*/}
                                {/*                            href={item.href}*/}
                                {/*                            className={classNames(active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700')}*/}
                                {/*                        >*/}
                                {/*                            {item.name}*/}
                                {/*                        </a>*/}
                                {/*                    )}*/}
                                {/*                </Menu.Item>*/}
                                {/*            ))}*/}
                                {/*        </Menu.Items>*/}
                                {/*    </Transition>*/}
                                {/*</Menu>*/}
                            </div>
                        </div>
                    </div>





                    <main className="flex-1 relative overflow-y-auto focus:outline-none">
                        <div className="py-6">
                            <div className="px-4 sm:px-6 md:px-0">
                                {pageTitle && <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>}
                            </div>
                            <div className="px-4 sm:px-6 md:px-0">
                                <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {/*<main className="relative">{children}</main>*/}
        </div>
    );
};

export default Layout;
