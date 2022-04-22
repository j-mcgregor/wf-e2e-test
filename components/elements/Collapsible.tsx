/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ChevronDownIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
}
export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="my-6">
      <h3
        className="text-xl font-semibold mb-4 cursor-pointer flex items-center"
        onClick={() => setOpen(!open)}
      >
        <span className="mr-2">{title}</span>
        {open ? (
          <ChevronDownIcon width={22} />
        ) : (
          <ChevronRightIcon width={22} />
        )}
      </h3>
      {open && (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-3">{children}</div>
      )}
    </div>
  );
};
