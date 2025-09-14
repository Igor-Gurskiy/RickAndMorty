import { useParams, Link } from 'react-router-dom';
import { useSelector } from '../services/store';
import { selectCharacterByID } from '../services/slices/MainSlice';
import { memo } from 'react';

export const CharacterDetailPage = memo(() => {
	const { id } = useParams<{ id: string }>();
	const character = useSelector((state) =>
		selectCharacterByID(state, parseInt(id || ''))
	);

	if (!character) {
		return (
			<div className="container mx-auto p-4">
				<div className="text-center py-8">
					<h2 className="text-2xl font-bold mb-4">Персонаж не найден</h2>
					<Link
						to="/characters"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Вернуться к списку
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<Link
				to="/characters"
				className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6"
			>
				← Назад к списку персонажей
			</Link>

			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				<div className="md:flex">
					<div className="md:w-1/3">
						<img
							src={character.image}
							alt={character.name}
							className="w-full h-64 md:h-full object-cover"
							loading="lazy"
						/>
					</div>

					<div className="md:w-2/3 p-6">
						<h1 className="text-3xl font-bold mb-4">{character.name}</h1>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<p>
									<span className="font-semibold text-gray-700">Status:</span>
									<span
										className={`ml-2 font-medium ${
											character.status === 'Alive'
												? 'text-green-600'
												: character.status === 'Dead'
													? 'text-red-600'
													: 'text-yellow-600'
										}`}
									>
										{character.status}
									</span>
								</p>

								<p>
									<span className="font-semibold text-gray-700">Species:</span>
									<span className="ml-2">{character.species}</span>
								</p>

								{character.type && (
									<p>
										<span className="font-semibold text-gray-700">Type:</span>
										<span className="ml-2">{character.type}</span>
									</p>
								)}

								<p>
									<span className="font-semibold text-gray-700">Gender:</span>
									<span className="ml-2">{character.gender}</span>
								</p>
							</div>

							<div className="space-y-2">
								<p>
									<span className="font-semibold text-gray-700">Origin:</span>
									<span className="ml-2">{character.origin?.name}</span>
								</p>

								<p>
									<span className="font-semibold text-gray-700">Location:</span>
									<span className="ml-2">{character.location?.name}</span>
								</p>

								{character.episode && (
									<p>
										<span className="font-semibold text-gray-700">
											Episodes:
										</span>
										<span className="ml-2">{character.episode.length}</span>
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
