import React from 'react';

interface ITableRowProps {
  className?: string;
  newClassName?: string;
  children?: React.ReactNode;
  title?: string;
}

const TableRow = ({
  className,
  newClassName,
  title,
  children
}: ITableRowProps) => {
  return (
    <tr
      title="table-row"
      className={
        newClassName
          ? newClassName
          : `${className} min-w-full bg-white font-semibold hover:bg-gray-50 group h-[48px] active-row`
      }
    >
      {children}
    </tr>
  );
};

export default TableRow;
