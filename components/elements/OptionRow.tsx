import React from 'react';

interface OptionRowProps {
  title?: string;
  description?: string;
}
export const OptionRow: React.FC<OptionRowProps> = ({
  children,
  title,
  description
}) => {
  return (
    <div className="flex sm:flex-row flex-col justify-between">
      <div className="pb-2 sm:pb-4">
        <p className="text-lg font-semibold py-1">{title}</p>
        <p>{description}</p>
      </div>
      <div className="sm:w-1/3 sm:pt-2">{children}</div>
    </div>
  );
};
