import React from 'react';

interface PlaceholderBoxProps {
  icon?: React.ReactNode;
  message: string;
}

export const PlaceholderBox = ({ icon, message }: PlaceholderBoxProps) => {
  return (
    <div className="bg-gray-200 px-4 py-5 flex flex-row items-center text-gray-600 text-sm">
      {icon}
      {message}
    </div>
  );
};
