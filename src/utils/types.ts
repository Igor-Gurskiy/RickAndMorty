export interface Character {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
	like?: boolean;
}

export interface ICharacters {
	characters: Character[];
}

export interface IButton {
	text: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

export interface IInput {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	name: string;
	placeholder: string;
	type?: string;
}

export interface ISelect {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	error?: string;
	options: string[];
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export interface IPage {
	page: number;
	currentPage: number;
	onPageClick: () => void;
}
