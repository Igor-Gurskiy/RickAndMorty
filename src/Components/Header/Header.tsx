import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/store';
import {
	selectShowOnlyLiked,
	toggleShowOnlyLiked,
} from '../services/slices/MainSlice';
import { Button } from '../Button/Button';
import { memo, useCallback } from 'react';

export const Header = memo(() => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const showOnlyLiked = useSelector(selectShowOnlyLiked);

	const handleNewCharacter = useCallback(() => {
		void navigate(`/create-character`);
	}, [navigate]);
	const handleToggleFilter = useCallback(() => {
		dispatch(toggleShowOnlyLiked());
	}, [dispatch]);
	return (
		<div className="flex flex-col gap-4 my-2">
			<h1 className="text-3xl font-bold text-center">Вселенная Рик и Морти</h1>
			<div className="container mx-auto flex flex-row justify-end gap-15">
				<Button
					text={
						showOnlyLiked
							? 'Показать все персонажи'
							: 'Показать только лайкнутых'
					}
					onClick={handleToggleFilter}
				/>
				<Button text="Добавить персонажа" onClick={handleNewCharacter} />
			</div>
		</div>
	);
});
