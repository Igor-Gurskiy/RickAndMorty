import { memo } from 'react';
import type { IButton } from '../../utils/types';

export const Button = memo(({ text, onClick, type = 'button' }: IButton) => {
	return (
		<div className="flex justify-center">
			<button
				type={type}
				onClick={onClick}
				className={`px-4 py-2 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300`}
			>
				{text}
			</button>
		</div>
	);
});
