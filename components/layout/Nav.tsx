import React, { Fragment } from 'react';
import Image from 'next/image';
import { Transition, Dialog } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline';
import WiserfundingLogo from '../../public/images/logos/wiserfunding-logo.svg';
import WFLogo from '../../public/images/logos/wf-logo.svg';
import { siteNavigation } from '../../lib/settings/navigation.settings';
import Link from '../elements/Link';

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;
export type IconProps = (props: React.ComponentProps<'svg'>) => React.ReactNode;

interface NavigationProps {
  name: string;
  href?: string;
  icon?: HeroIcon | undefined
  current?: boolean;
  title?: boolean;
  onClick?: () => Promise<undefined> | void;
}

interface NavStyleProps {
  navStyle?: string;
  aLink?: string;
  itemTitle?: string;
  itemIcon?: string;
}

interface NavListProps {
  path: string;
  navigation: NavigationProps[];
  navStyle?: NavStyleProps;
  noText?: boolean;
}

type NavProps = {
  path: string
}

const { primaryNavigation, secondaryNavigation } = siteNavigation;

const Nav = ({ path }: NavProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
            <div className="relative max-w-xs w-full bg-primary pt-5 pb-4 flex-1 flex flex-col">
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
                    onClick={closeSidebar}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 px-4 flex items-center">
                <div className="relative w-40 h-10">
                  <Image
                    alt={'Wiserfunding Logo'}
                    layout="fill"
                    objectFit="contain"
                    src={WiserfundingLogo}
                  />
                </div>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <NavItems
                  path={path}
                  navigation={primaryNavigation}
                  navStyle={{
                    navStyle: 'px-2 space-y-1',
                    aLink: '',
                    itemIcon: '',
                    itemTitle: ''
                  }}
                />
              </div>
              <div className="flex-shrink-0 flex border-gray-200">
                <NavItems path={path} navigation={secondaryNavigation} />
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden bg-primary lg:flex lg:flex-shrink-0">
        <div className="w-64 flex flex-col">
          <div className="border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
            <div className="flex-shrink-0 px-4 flex items-center relative">
              <div className="relative w-40 h-10">
                <Image
                  alt={'Wiserfunding Logo'}
                  layout="fill"
                  objectFit="contain"
                  src={WiserfundingLogo}
                />
              </div>
            </div>
            <div className="flex-grow mt-5 flex flex-col">
              <NavItems path={path} navigation={primaryNavigation} />
            </div>
            <div className="flex-shrink-0 flex border-gray-200">
              <NavItems path={path} navigation={secondaryNavigation} />
            </div>
          </div>
        </div>
      </div>

      {/* Menu for Tablet */}
      <div className="hidden bg-primary sm:flex sm:flex-shrink-0 lg:hidden">
        <div className="w-14 flex flex-col">
          <div className="border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
            <div className="flex-shrink-0 px-3 flex items-center relative">
              <div className="relative w-20 h-10">
                <Image
                  alt={'Wiserfunding Logo'}
                  layout="fill"
                  objectFit="contain"
                  src={WFLogo}
                />
              </div>
            </div>
            <div className="flex-grow mt-5 flex flex-col">
              <NavItems
                path={path}
                navigation={primaryNavigation}
                noText={true}
              />
            </div>
            <div className="flex-shrink-0 flex flex-col border-gray-200">
              <NavItems
                path={path}
                navigation={secondaryNavigation}
                noText={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute w-full   md:px-8 xl:px-0 sm:hidden">
        <div className="relative z-10 flex-shrink-0 h-12 bg-primary border-gray-200 flex">
          <button
            type="button"
            className="px-4 text-bg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-highlight md:hidden"
            onClick={openSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="ml-auto mt-2 relative w-12 h-8 ">
            <Image
              alt={'Wiserfunding Logo'}
              layout="fill"
              objectFit="contain"
              src={WFLogo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;

const NavItems = ({ path, navigation, noText }: NavListProps) => {
  return (
    <nav className={'flex-1 bg-primary px-2 space-y-1'}>
      {navigation.map(({title, name, href, onClick, ...item}) => {

        if (title && !noText) {
          return (
            <div
              key={name}
              className={
                'text-white rounded-md group py-2 px-2 flex items-center text-sm font-medium'
              }
            >
              {name && name}
            </div>
          );
        }
        if (title && noText) return <hr />
        return (
          <Link
            key={name}
            linkTo={href}
            onClick={onClick}
            className={`
              ${
                href === path
                  ? 'bg-secondary text-white '
                  : 'text-white hover:bg-secondary '
              } group rounded-md py-2 px-2 flex items-center text-sm font-medium relative w-full

            `}
          >
            {item.icon && (
              <item.icon
                className="text-white flex-shrink-0 h-6 w-6 mr-2"
                aria-hidden="true"
              />
            )}
            {!noText && name}
          </Link>
        );
      })}
    </nav>
  );
};
