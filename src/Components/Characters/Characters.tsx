import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../services/store';
import { deleteCharacter, toggleLike } from '../services/slices/MainSlice';
import { memo, useCallback } from 'react';
import type { Character, ICharacters } from '../../utils/types';

export const Characters = memo(({ characters }: ICharacters) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cardOnClick = useCallback(
		(character: Character) => {
			void navigate(`/characters/${character.id}`);
		},
		[navigate]
	);
	const handleToggleLike = useCallback(
		(characterId: number) => {
			dispatch(toggleLike(characterId));
		},
		[dispatch]
	);
	const handleDeleteCharacter = useCallback(
		(characterId: number) => {
			dispatch(deleteCharacter(characterId));
		},
		[dispatch]
	);

	return (
		<>
			<div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
					{characters &&
						characters.map((character: Character) => (
							<div
								key={character.id}
								className={`flex flex-col justify-center items-center text-center p-3 gap-4 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer`}
								onClick={() => cardOnClick(character)}
							>
								<img
									onClick={() => cardOnClick(character)}
									className="w-24 h-24 rounded-full cursor-pointer"
									src={character.image}
									alt={character.name}
									loading="lazy"
								/>
								<h2
									onClick={() => cardOnClick(character)}
									className="text-lg font-bold cursor-pointer"
								>
									{character.name}
								</h2>
								<div className="flex gap-5">
									<button
										className="icon-button top-2 left-2 text-black cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleToggleLike(character.id);
										}}
									>
										<svg
											className="w-5 h-5"
											fill={character.like ? 'currentColor' : 'none'}
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
									</button>

									<button
										className="icon-button top-2 right-2 text-black cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteCharacter(character.id);
										}}
									>
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							</div>
						))}
				</div>
			</div>
		</>
	);
});
