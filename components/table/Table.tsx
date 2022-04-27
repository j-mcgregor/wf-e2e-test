import Link from 'next/link';
import React from 'react';

import SkeletonRow from '../skeletons/SkeletonRow';
import PaginationBar from './PaginationBar';
import TableCell from './TableCell';
import TableRow from './TableRow';

export interface TableHeadersType {
  name: string;
  selector: string | ((row: any) => any);
  align?: 'left' | 'right' | 'center';
  width?: string;
  contentClassName?: string | ((row: any) => string);
  rowTitle?: string | ((row: any) => string);
}

interface TableProps {
  headers: TableHeadersType[];
  data: any[];
  total: number;
  limit: number;
  skip: (x: number) => void;
  isLoading: boolean;
  pagination?: boolean;
  fillEmptyRows?: boolean;
  rowLink?: string | ((row: any) => string);
}

const Table = ({
  headers,
  data,
  total,
  limit,
  skip,
  isLoading,
  pagination = false,
  fillEmptyRows = false,
  rowLink
}: TableProps) => {
  const maxPages = Math.ceil(total / limit);
  const [page, setPage] = React.useState(1);

  const [blankRows, setBlankRows] = React.useState(limit);

  React.useEffect(() => {
    if (data.length) {
      setBlankRows(limit - data.length);
    }
  }, [data]);

  const handlePageChange = (page: number) => setPage(page);
  const handlePageDown = () => {
    setPage(prev => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };
  const handlePageUp = () => {
    setPage(prev => {
      if (prev < maxPages) {
        return prev + 1;
      }
      return prev;
    });
  };

  React.useEffect(() => {
    skip(page * limit - limit);
  }, [page]);

  return (
    <div className="overflow-hidden">
      <div className="overflow-auto">
        <table
          className="min-w-full text-xs md:text-sm overflow-auto"
          style={{ maxHeight: (limit + 1) * 48 }}
        >
          <thead className="bg-gray-200">
            <tr className="font-semibold">
              {headers.map(
                ({ name, align = 'text-left', width = 'min-w-fit' }) => (
                  <th
                    key={name}
                    scope="col"
                    className={`${align} ${width} text-primary px-3 md:px-7 py-3 whitespace-no-wrap truncate`}
                  >
                    {name}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <SkeletonRow
                cellQty={headers.length}
                className="odd:bg-gray-50 even:bg-gray-100 animate-pulse h-[48px]"
                rowQty={limit}
              />
            )}

            {!isLoading &&
              data?.map((row, rowIndex) => (
                <TableRow key={`table-row-${rowIndex}`}>
                  {headers.map((header, index) => {
                    const { align, selector, contentClassName, rowTitle } =
                      header;

                    const value =
                      typeof selector === 'function'
                        ? selector(row)
                        : row[selector];

                    const contentClass =
                      typeof contentClassName === 'function'
                        ? contentClassName(row)
                        : contentClassName;

                    const link =
                      typeof rowLink === 'function' ? rowLink(row) : rowLink;

                    const contentAlign =
                      align === 'right'
                        ? 'text-right justify-end'
                        : align === 'center'
                        ? 'text-center justify-center'
                        : 'text-left justify-start';

                    const title =
                      typeof rowTitle === 'function' ? rowTitle(row) : rowTitle;

                    return (
                      <TableCell
                        key={`${rowIndex}-${header}-${index}`}
                        className={`whitespace-nowrap truncate text-ellipsis overflow-hidden`}
                        contentClassName={contentClass}
                        rowLink={link}
                        align={contentAlign}
                        title={title}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}

            {/* These are fill rows not loading rows */}
            {!isLoading &&
              fillEmptyRows &&
              blankRows > 0 &&
              blankRows <= limit && (
                <SkeletonRow
                  cellQty={headers.length}
                  className="bg-gray-200 h-[48px]"
                  rowQty={blankRows}
                />
              )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <PaginationBar
          page={page}
          maxPages={maxPages || 0}
          total={total}
          limit={limit}
          handlePageChange={handlePageChange}
          handlePageUp={handlePageUp}
          handlePageDown={handlePageDown}
        />
      )}
    </div>
  );
};

export default Table;
