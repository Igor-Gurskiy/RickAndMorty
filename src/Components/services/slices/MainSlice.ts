import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { type Character } from '../../../utils/types';
import { getAllCharactersApi } from '../../../utils/Api';

export const fetchCharacters = createAsyncThunk(
	'characters/fetchCharacters',
	getAllCharactersApi
);

type TMainState = {
	characters: Character[];
	loading: boolean;
	error: string | null;
	currentPage: number;
	itemsPerPage: number;
	totalPages: number;
	currentCharacters: Character[];
	showOnlyLiked: boolean;
};

const initialState: TMainState = {
	characters: [],
	loading: false,
	error: null,
	currentPage: 1,
	itemsPerPage: 20,
	totalPages: 0,
	currentCharacters: [],
	showOnlyLiked: false,
};

const updateCurrentCharacters = (state: TMainState) => {
	const filteredCharacters = state.showOnlyLiked
		? state.characters.filter((character) => character.like)
		: state.characters;

	state.totalPages = Math.ceil(filteredCharacters.length / state.itemsPerPage);

	if (state.currentPage > state.totalPages && state.totalPages > 0) {
		state.currentPage = state.totalPages;
	}
	if (state.currentPage < 1 && state.totalPages > 0) {
		state.currentPage = 1;
	}

	const startIndex = (state.currentPage - 1) * state.itemsPerPage;
	const endIndex = startIndex + state.itemsPerPage;
	state.currentCharacters = filteredCharacters.slice(startIndex, endIndex);
};

export const MainSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;

			updateCurrentCharacters(state);
		},
		toggleLike: (state, action) => {
			const characterId = action.payload;
			const character = state.characters.find((c) => c.id === characterId);
			if (character) {
				character.like = !character.like;
				updateCurrentCharacters(state);
			}
		},
		toggleShowOnlyLiked: (state) => {
			state.showOnlyLiked = !state.showOnlyLiked;
			state.currentPage = 1;
			updateCurrentCharacters(state);
		},
		deleteCharacter: (state, action) => {
			const characterId = action.payload;
			state.characters = state.characters.filter((c) => c.id !== characterId);
			state.totalPages = Math.ceil(
				state.characters.length / state.itemsPerPage
			);
			if (state.currentPage > state.totalPages && state.totalPages > 0) {
				state.currentPage = state.totalPages;
			}
			updateCurrentCharacters(state);
		},
		addCharacter: (state, action) => {
			state.characters.push(action.payload);
			state.totalPages = Math.ceil(
				state.characters.length / state.itemsPerPage
			);
			updateCurrentCharacters(state);
		},
	},
	selectors: {
		selectLoadind: (state) => state.loading,
		selectCharacters: (state) => state.characters,
		selectCurrentPage: (state) => state.currentPage,
		selectTotalPages: (state) => state.totalPages,
		selectAllCharacters: (state) => state.characters,
		selectCharactersWithLike: (state) =>
			state.characters.filter((character) => character.like),
		selectShowOnlyLiked: (state) => state.showOnlyLiked,
		selectCurrentCharacters: (state) => state.currentCharacters,
		selectCharacterByID: (state, id: number): Character | undefined =>
			state.characters.find((character) => character.id === id),
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCharacters.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchCharacters.fulfilled,
				(state, action: PayloadAction<Character[]>) => {
					state.loading = false;
					state.characters = action.payload.map((character: Character) => ({
						...character,
						like: character.like || false,
					}));
					state.totalPages = Math.ceil(
						state.characters.length / state.itemsPerPage
					);
					updateCurrentCharacters(state);
				}
			)
			.addCase(fetchCharacters.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch characters';
			});
	},
});

export const {
	selectLoadind,
	selectCharacters,
	selectCurrentPage,
	selectTotalPages,
	selectCurrentCharacters,
	selectCharacterByID,
	selectAllCharacters,
	selectCharactersWithLike,
	selectShowOnlyLiked,
} = MainSlice.selectors;
export const {
	setCurrentPage,
	toggleLike,
	deleteCharacter,
	toggleShowOnlyLiked,
	addCharacter,
} = MainSlice.actions;
export default MainSlice.reducer;
