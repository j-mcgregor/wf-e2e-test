import React from 'react';
import Button from './Button';
import LoadingIcon from '../svgs/LoadingIcon';

interface ToggleUserAccessProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: 'highlight' | 'alt';
  onClick?: () => Promise<boolean>;
}

const ToggleUserAccessButton = ({
  title,
  description,
  buttonText,
  buttonVariant,
  onClick
}: ToggleUserAccessProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (onClick) {
      await onClick();
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-y-4 max-w-sm min-h-full pr-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
      <Button
        variant={buttonVariant}
        newClassName={`w-52 md:w-60 h-10 bg-${buttonVariant} text-white font-semibold flex items-center justify-center`}
        onClick={handleClick}
      >
        {loading ? <LoadingIcon className="text-white" /> : buttonText}
      </Button>
    </div>
  );
};

export default ToggleUserAccessButton;
