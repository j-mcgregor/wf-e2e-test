import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/solid';
import React from 'react';

interface PaginationButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hoverClassName?: string;
}

const PaginationButton = ({
  active,
  onClick,
  children,
  hoverClassName
}: PaginationButtonProps) => (
  <button
    className={`${
      active ? 'bg-highlight bg-opacity-30 text-highlight' : 'bg-white'
    } ${
      hoverClassName
        ? hoverClassName
        : 'hover:bg-highlight hover:bg-opacity-30 hover:text-highlight'
    } flex text-center justify-center items-center h-full w-8 cursor-pointer px-1`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface PaginationBarProps {
  page: number;
  maxPages: number;
  total: number;
  limit: number;
  handlePageChange: (page: number) => void;
  handlePageUp: () => void;
  handlePageDown: () => void;
}

const PaginationBar = ({
  page,
  maxPages,
  total,
  limit,
  handlePageChange,
  handlePageDown,
  handlePageUp
}: PaginationBarProps) => {
  return (
    <div className="flex flex-col-reverse gap-2 md:flex-row justify-between items-end md:items-center my-2 bg-transparent">
      <p className="text-primary text-xs md:text-sm">
        Showing{' '}
        <span className="font-medium">
          {total > 0 ? page * limit - limit + 1 : 0}
        </span>{' '}
        to <span className="font-medium">{Math.min(limit * page, total)}</span>{' '}
        of <span className="font-medium">{total}</span> results
      </p>
      <div className="flex items-center h-9 text-xs md:text-sm text-gray-400 bg-white w-min rounded overflow-hidden">
        <PaginationButton
          onClick={() => handlePageChange(1)}
          hoverClassName="bg-gray-200"
        >
          <ChevronDoubleLeftIcon className="h-5 w-8" />
        </PaginationButton>
        <PaginationButton onClick={handlePageDown}>
          <ChevronLeftIcon className="h-5 w-8" />
        </PaginationButton>
        {[...Array(maxPages)]
          .map((_, index) => (
            <PaginationButton
              active={page === index + 1}
              onClick={() => handlePageChange(index + 1)}
              key={`page-${index}`}
            >
              {index + 1}
            </PaginationButton>
          ))
          .slice(
            Math.max(
              page - (page > maxPages - 3 ? Math.abs(page + 5 - maxPages) : 3),
              0
            ),
            Math.min(page + (page < 3 ? 5 - page : 2), maxPages)
          )}
        <PaginationButton onClick={handlePageUp}>
          <ChevronRightIcon className="h-5 w-8" />
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(maxPages)}
          hoverClassName="bg-gray-200"
        >
          <ChevronDoubleRightIcon className="h-5 w-8" />
        </PaginationButton>
      </div>
    </div>
  );
};

export default PaginationBar;
