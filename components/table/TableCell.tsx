import Link from 'next/link';
import React from 'react';

interface ITableCellProps {
  className: string;
  children: React.ReactNode;
  contentClassName?: string;
  cellLink?: string;
  rowLink?: string;
  align?: string;
  title?: string;
}

const TableCell = ({
  className,
  contentClassName,
  rowLink,
  align = 'text-left justify-start',
  children,
  title
}: ITableCellProps) => {
  const ContentComponent = ({ children }: { children: React.ReactNode }) =>
    rowLink ? (
      <Link href={`${rowLink}`}>{children}</Link>
    ) : (
      <div>{children}</div>
    );
  return (
    <td className={`${className}`} title={title}>
      <ContentComponent>
        <div
          className={`${
            rowLink
              ? 'group-hover:cursor-pointer group-hover:text-highlight'
              : ''
          } w-full h-full`}
        >
          <div className={`flex ${align}`}>
            <div className={`${contentClassName} overflow-x-hidden`}>
              {children}
            </div>
          </div>
        </div>
      </ContentComponent>
    </td>
  );
};

export default TableCell;
