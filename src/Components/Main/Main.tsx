import { memo, useCallback, useEffect } from 'react';
import { Pagination } from '../Pagination/Pagination';
import {
	fetchCharacters,
	selectAllCharacters,
	selectCurrentCharacters,
	selectCurrentPage,
	selectLoadind,
	selectShowOnlyLiked,
	selectTotalPages,
	setCurrentPage,
} from '../services/slices/MainSlice';
import { useDispatch, useSelector } from '../services/store';
import { Preloader } from '../preloader/preloader';
import { Characters } from '../Characters/Characters';

export const Main = memo(() => {
	const dispatch = useDispatch();
	const currentCharacters = useSelector(selectCurrentCharacters);
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const isLoading = useSelector(selectLoadind);
	const allCharacters = useSelector(selectAllCharacters);
	const showOnlyLiked = useSelector(selectShowOnlyLiked);

	useEffect(() => {
		if (allCharacters.length === 0) {
			dispatch(fetchCharacters())
				.unwrap()
				.catch((error) => {
					console.error('Failed to fetch characters:', error);
				});
		}
	}, [dispatch, allCharacters.length]);

	const handlePageChange = useCallback(
		(page: number) => {
			dispatch(setCurrentPage(page));
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		[dispatch]
	);

	if (isLoading) {
		return <Preloader />;
	}

	return (
		<>
			<Characters characters={currentCharacters} />
			{currentCharacters && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
			{showOnlyLiked && currentCharacters.length === 0 && (
				<div className="text-center text-gray-500 py-8">
					Нет персонажей с лайками
				</div>
			)}
		</>
	);
});
