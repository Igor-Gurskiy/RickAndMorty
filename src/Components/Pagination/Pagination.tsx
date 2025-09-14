import { memo, useCallback, useMemo } from 'react';
import type { PaginationProps } from '../../utils/types';
import { Page } from './Page';

export const Pagination = memo(
	({ currentPage, totalPages, onPageChange }: PaginationProps) => {
		const { pages, showFirst, showLast, showLeftDots, showRightDots } =
			useMemo(() => {
				const showFirst = currentPage > 2;
				const showLast = currentPage < totalPages - 1;
				const showLeftDots = currentPage > 3;
				const showRightDots = currentPage < totalPages - 2;

				let startPage = Math.max(1, currentPage - 1);
				let endPage = Math.min(totalPages, currentPage + 1);

				if (currentPage === 1) {
					endPage = Math.min(totalPages, 3);
				} else if (currentPage === totalPages) {
					startPage = Math.max(1, totalPages - 2);
				}

				const pages = [];
				for (let i = startPage; i <= endPage; i++) {
					pages.push(i);
				}

				return { pages, showFirst, showLast, showLeftDots, showRightDots };
			}, [currentPage, totalPages]);

		const handlePageClick = useCallback(
			(page: number) => () => {
				onPageChange(page);
			},
			[onPageChange]
		);

		return (
			<div className="flex justify-center my-4 gap-2 items-center">
				{showFirst && (
					<>
						<Page
							page={1}
							currentPage={currentPage}
							onPageClick={handlePageClick(1)}
						/>
						{showLeftDots && <span className="px-2">...</span>}
					</>
				)}

				{pages.map((page) => (
					<Page
						key={page}
						page={page}
						currentPage={currentPage}
						onPageClick={handlePageClick(page)}
					/>
				))}

				{showLast && (
					<>
						{showRightDots && <span className="px-2">...</span>}
						<Page
							page={totalPages}
							currentPage={currentPage}
							onPageClick={handlePageClick(totalPages)}
						/>
					</>
				)}
			</div>
		);
	}
);
