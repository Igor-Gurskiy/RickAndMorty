import { memo } from 'react';
import type { IPage } from '../../utils/types';

export const Page = memo(({ page, currentPage, onPageClick }: IPage) => {
	return (
		<button
			onClick={onPageClick}
			className={`px-3 py-1 border rounded cursor-pointer ${
				page === currentPage ? 'bg-blue-500 text-white' : ''
			}`}
		>
			{page}
		</button>
	);
});
