import Link from 'next/link';
import React from 'react';

interface ITableCellProps {
  className: string;
  children: React.ReactNode;
  contentClassName?: string;
  cellLink?: string;
  rowLink?: string;
  align?:
    | 'text-left justify-start'
    | 'text-right justify-end'
    | 'text-center justify-center';
}

const TableCell = ({
  className,
  contentClassName,
  rowLink,
  align = 'text-left justify-start',
  children
}: ITableCellProps) => {
  const ContentComponent = ({ children }: { children: React.ReactNode }) =>
    rowLink ? (
      <Link href={`${rowLink}`}>{children}</Link>
    ) : (
      <div>{children}</div>
    );
  return (
    <td className={`${className}`}>
      <ContentComponent>
        <div
          className={`${
            rowLink
              ? 'group-hover:cursor-pointer group-hover:text-highlight'
              : ''
          } w-full h-full`}
        >
          <div className={`md:px-7 px-3 flex ${align}`}>
            <div className={`${contentClassName}`}>{children}</div>
          </div>
        </div>
      </ContentComponent>
    </td>
  );
};

export default TableCell;
