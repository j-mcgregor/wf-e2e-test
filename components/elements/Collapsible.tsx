/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ChevronDownIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
  collapsed: boolean;
}
export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  collapsed = false
}) => {
  const [open, setOpen] = useState(!collapsed);

  return (
    <div className="my-6">
      <button onClick={() => setOpen(!open)}>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">{title}</span>
          <ChevronRightIcon
            width={22}
            className={`${open ? 'rotate-90' : ''} transition duration-150`}
          />
        </h3>
      </button>

      <div
        className={`${
          !open
            ? '-translate-y-5 opacity-0 h-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        } transition duration-150`}
      >
        {children}
      </div>
    </div>
  );
};
