import { memo } from 'react';
import type { ISelect } from '../../utils/types';

export const Select = memo(
	({ label, name, value, onChange, error, options }: ISelect) => {
		const cleanLabel = label.replace(' *', '');
		return (
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					{label}
				</label>
				<select
					name={name}
					value={value}
					onChange={onChange}
					className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						error ? 'border-red-500' : 'border-gray-300'
					}`}
				>
					<option value="">Выберите {cleanLabel.toLowerCase()}</option>
					{options.map((option: string, index: number) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
					<option value="Female">Female</option>
					<option value="Male">Male</option>
					<option value="Genderless">Genderless</option>
					<option value="unknown">unknown</option>
				</select>
				{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
			</div>
		);
	}
);
