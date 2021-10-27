import React, { useState } from 'react';
import { Link } from 'react-scroll';

import { useSettingsNavItems } from '../../hooks/useNavigation';
import IconTag from '../icons/IconTag';

const nonTestingProps = {
  containerId: 'secondary-layout-container'
};

const SettingsNav = ({ isTesting = false }: { isTesting?: boolean }) => {
  const [activeSettingsItem, setActiveSettingsItem] = useState<string>(
    'personal_information'
  );
  const navItems = useSettingsNavItems();

  return (
    <div className="px-6 pt-8 flex flex-col h-full">
      <div className="flow-root mt-8 ">
        <ul className="text-sm p-2">
          {navItems.map(({ title, icon, id }, index) => {
            const isActive = activeSettingsItem === id;
            return (
              <li
                key={index}
                className={`my-4 py-2 pl-2 ${
                  isActive && 'bg-primary'
                } rounded-lg`}
              >
                {/* Scroll handling link */}
                <Link
                  to={id}
                  spy={true}
                  offset={-50}
                  smooth={true}
                  activeClass={'bg-gray-400'}
                  duration={300}
                  className={`rounded cursor-pointer w-full hover:text-alt`}
                  onSetActive={() => setActiveSettingsItem(id)}
                  // prevents testing failures for issues with type requirement
                  // https://github.com/fisshy/react-scroll/issues/352
                  {...(isTesting ? {} : nonTestingProps)}
                >
                  <div className="relative  h-full">
                    <div
                      className={`relative flex items-center ${
                        isActive ? 'text-highlight' : ''
                      }`}
                    >
                      {icon && (
                        <IconTag icon={icon} className={'h-5 w-5 mx-1'} />
                      )}
                      <p className={` ml-2 z-10 text-center`}>{title}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SettingsNav;
