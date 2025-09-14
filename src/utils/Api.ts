import type { Character } from './types';

const URL = import.meta.env.VITE_API_BASE_URL;

export const getAllCharactersApi = async () => {
	const allCharacters: Character[] = [];

	let nextPage: string = `${URL}/character`;

	do {
		const response = await fetch(nextPage, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		if (data.results && Array.isArray(data.results)) {
			allCharacters.push(...data.results);
		}

		nextPage = data.info && data.info.next;
	} while (nextPage);

	return allCharacters;
};
