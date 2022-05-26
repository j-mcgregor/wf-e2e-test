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
  tableName: string;
  headers: TableHeadersType[];
  data: any[] | null;
  limit: number;
  isLoading: boolean;
  total: number;
  skip?: number;
  setSkip?: (x: number) => void;
  pagination?: boolean;
  fillEmptyRows?: boolean;
  rowLink?: string | ((row: any) => string);
}

const Table = ({
  tableName,
  headers,
  data,
  total,
  limit,
  skip,
  setSkip,
  isLoading,
  pagination = false,
  fillEmptyRows = false,
  rowLink
}: TableProps) => {
  const [page, setPage] = React.useState((skip && skip / limit + 1) || 1);
  const [maxPages, setMaxPages] = React.useState(1);
  const [tableTotal, setTableTotal] = React.useState(total);
  // const maxPages = Math.ceil(tableTotal / limit);
  const length = data?.length || 0;

  const blankRows = limit - length;

  React.useEffect(() => {
    !isLoading && total !== tableTotal && setTableTotal(total);
    !isLoading && total && limit && setMaxPages(Math.ceil(total / limit));
  }, [total, isLoading]);

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
    if (setSkip) {
      setSkip(page * limit - limit);
    }
  }, [page]);

  const getAlignment = (align?: 'right' | 'left' | 'center') => {
    return align === 'right'
      ? 'text-right justify-end pr-3 md:pr-5'
      : align === 'center'
      ? 'text-center justify-center'
      : 'text-left justify-start pl-3 md:pl-5';
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-auto">
        <table
          className="min-w-full text-xs md:text-sm overflow-auto table-fixed"
          style={{ maxHeight: (limit + 1) * 48 }}
          id={tableName}
        >
          <thead className="bg-gray-200">
            <tr className="font-semibold w-full">
              {headers.map(({ name, align = 'left', width = '' }) => {
                const contentAlignment = getAlignment(align);
                return (
                  <th
                    key={name}
                    scope="col"
                    className={`${contentAlignment} ${width} text-primary py-3 whitespace-no-wrap truncate `}
                  >
                    {name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <SkeletonRow
                cellQty={headers.length}
                className="even:bg-gray-50 odd:bg-gray-100 animate-pulse h-[48px]"
                widths={headers.map(header => header.width)}
                rowQty={limit}
              />
            )}

            {!isLoading && tableTotal === 0 && (
              <tr
                style={{
                  height: limit * 48
                }}
              >
                <td
                  colSpan={headers?.length}
                  className="bg-gray-50 text-center"
                >
                  No {tableName}
                </td>
              </tr>
            )}

            {!isLoading &&
              tableTotal > 0 &&
              data?.map((row, rowIndex) => (
                <TableRow key={`table-row-${rowIndex}`}>
                  {headers.map((header, index) => {
                    const {
                      align,
                      selector,
                      contentClassName,
                      rowTitle,
                      width
                    } = header;

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

                    const title =
                      typeof rowTitle === 'function' ? rowTitle(row) : rowTitle;

                    const contentAlignment = getAlignment(align);

                    return (
                      <TableCell
                        key={`${rowIndex}-${header}-${index}`}
                        className={`whitespace-nowrap truncate text-ellipsis overflow-hidden ${width}`}
                        contentClassName={contentClass}
                        rowLink={link}
                        align={contentAlignment}
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
              tableTotal > 0 &&
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
          total={tableTotal}
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
