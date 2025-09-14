import { memo } from 'react';
import type { IInput } from '../../utils/types';

export const Input = memo(
	({
		label,
		value,
		onChange,
		error,
		name,
		placeholder,
		type = 'text',
	}: IInput) => {
		return (
			<div className="">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					{label}
				</label>
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						error ? 'border-red-500' : 'border-gray-300'
					}`}
					placeholder={placeholder}
				/>
				{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
			</div>
		);
	}
);
