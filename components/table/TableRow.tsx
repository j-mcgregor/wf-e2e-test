import React from 'react';

interface ITableRowProps {
  className?: string;
  newClassName?: string;
  children?: React.ReactNode;
}

const TableRow = ({ className, newClassName, children }: ITableRowProps) => {
  return (
    <tr
      className={
        newClassName
          ? newClassName
          : `${className} min-w-full bg-white font-semibold hover:bg-gray-50 group h-[48px]`
      }
    >
      {children}
    </tr>
  );
};

export default TableRow;
