import React from 'react';
import Button from './Button';
import LoadingIcon from '../svgs/LoadingIcon';

interface ToggleUserAccessProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: 'highlight' | 'alt';
  isLoading?: boolean;
  onClick?: () => void;
}

const ToggleUserAccessButton = ({
  title,
  description,
  isLoading,
  buttonText,
  buttonVariant,
  onClick
}: ToggleUserAccessProps) => {
  return (
    <div className="flex flex-col justify-between gap-y-4 max-w-sm min-h-full pr-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
      <Button
        variant={buttonVariant}
        newClassName={`w-52 md:w-60 h-10 bg-${buttonVariant} text-white rounded  font-semibold flex items-center justify-center transition duration-300`}
        onClick={onClick}
      >
        {isLoading ? <LoadingIcon className="text-white" /> : buttonText}
      </Button>
    </div>
  );
};

export default ToggleUserAccessButton;
