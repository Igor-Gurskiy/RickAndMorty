import React, { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCharacter } from '../services/slices/MainSlice';
import { type Character } from '../../utils/types';
import { Input } from './Input';
import { Button } from '../Button/Button';
import { Select } from './Select';

export const CreateCharacter = memo(() => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		status: '',
		species: '',
		type: '',
		gender: '',
		origin: { name: '', url: '' },
		location: { name: '', url: '' },
		image: '',
		episode: [''],
		url: '',
		like: false,
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const validateForm = useCallback(() => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Имя обязательно';
		} else if (formData.name.length < 2) {
			newErrors.name = 'Имя должно быть не менее 2 символов';
		}

		if (!formData.status) {
			newErrors.status = 'Статус обязателен';
		}

		if (!formData.species.trim()) {
			newErrors.species = 'Вид обязателен';
		}

		if (!formData.gender) {
			newErrors.gender = 'Пол обязателен';
		}

		if (!formData.origin.name.trim()) {
			newErrors.originName = 'Название происхождения обязательно';
		}

		if (!formData.location.name.trim()) {
			newErrors.locationName = 'Название локации обязательно';
		}

		if (!formData.image.trim()) {
			newErrors.image = 'Изображение обязательно';
		} else if (!/^https?:\/\/.+/i.test(formData.image)) {
			newErrors.image = 'Введите корректный URL изображения';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData]);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			if (validateForm()) {
				const newCharacter: Character = {
					id: Date.now(),
					name: formData.name,
					status: formData.status,
					species: formData.species,
					type: formData.type,
					gender: formData.gender,
					origin: {
						name: formData.origin.name,
						url: formData.origin.url || '#',
					},
					location: {
						name: formData.location.name,
						url: formData.location.url || '#',
					},
					image: formData.image,
					episode: formData.episode.filter((ep) => ep.trim() !== ''),
					url: formData.url || '#',
					created: new Date().toISOString(),
					like: formData.like,
				};

				dispatch(addCharacter(newCharacter));
				void navigate('/characters');
			}
		},
		[formData, validateForm, dispatch, navigate]
	);

	const handleChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>
		) => {
			const { name, value } = e.target;

			if (name.startsWith('origin.')) {
				const field = name.split('.')[1];
				setFormData((prev) => ({
					...prev,
					origin: { ...prev.origin, [field]: value },
				}));
			} else if (name.startsWith('location.')) {
				const field = name.split('.')[1];
				setFormData((prev) => ({
					...prev,
					location: { ...prev.location, [field]: value },
				}));
			} else {
				setFormData((prev) => ({ ...prev, [name]: value }));
			}

			if (errors[name]) {
				setErrors((prev) => ({ ...prev, [name]: '' }));
			}
		},
		[errors]
	);

	const addEpisode = useCallback(() => {
		setFormData((prev) => ({
			...prev,
			episode: [...prev.episode, ''],
		}));
	}, []);

	const removeEpisode = useCallback((index: number) => {
		setFormData((prev) => ({
			...prev,
			episode: prev.episode.filter((_, i) => i !== index),
		}));
	}, []);

	const handleEpisodeChange = useCallback(
		(index: number, value: string) => {
			const newEpisodes = [...formData.episode];
			newEpisodes[index] = value;
			setFormData((prev) => ({ ...prev, episode: newEpisodes }));
		},
		[formData.episode]
	);

	const statusOptions = useMemo(() => ['Alive', 'Dead', 'unknown'], []);
	const genderOptions = useMemo(
		() => ['Female', 'Male', 'Genderless', 'unknown'],
		[]
	);

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-8 text-center">Создать персонажа</h1>

			<form
				onSubmit={handleSubmit}
				className="space-y-6 bg-white p-6 rounded-lg shadow-md"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="Имя *"
						value={formData.name}
						onChange={handleChange}
						error={errors.name}
						name="name"
						placeholder="Введите имя персонажа"
					/>
					<Select
						label="Статус *"
						name="status"
						value={formData.status}
						onChange={handleChange}
						error={errors.status}
						options={statusOptions}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="Вид *"
						value={formData.species}
						onChange={handleChange}
						error={errors.species}
						name="species"
						placeholder="Введите вид"
					/>
					<Input
						label="Тип"
						value={formData.type}
						onChange={handleChange}
						name="type"
						placeholder="Введите тип"
					/>
				</div>

				<Select
					label="Пол *"
					name="gender"
					value={formData.gender}
					onChange={handleChange}
					error={errors.gender}
					options={genderOptions}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="Происхождение (название) *"
						value={formData.origin.name}
						onChange={handleChange}
						error={errors.originName}
						name="origin.name"
						placeholder="Название места происхождения"
					/>
					<Input
						label="Происхождение (URL)"
						value={formData.origin.url}
						onChange={handleChange}
						name="origin.url"
						placeholder="URL места происхождения"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="Локация (название) *"
						value={formData.location.name}
						onChange={handleChange}
						error={errors.locationName}
						name="location.name"
						placeholder="Название локации"
					/>
					<Input
						label="Локация (URL)"
						value={formData.location.url}
						onChange={handleChange}
						name="location.url"
						placeholder="URL локации"
					/>
				</div>

				<Input
					label="URL изображения *"
					value={formData.image}
					onChange={handleChange}
					error={errors.image}
					name="image"
					placeholder="https://example.com/image.jpg"
					type="url"
				/>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Эпизоды
					</label>
					{formData.episode.map((episode, index) => (
						<div key={index} className="flex gap-2 mb-2">
							<input
								type="url"
								value={episode}
								onChange={(e) => handleEpisodeChange(index, e.target.value)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="https://example.com/episode/1"
							/>
							{formData.episode.length > 1 && (
								<Button text="X" onClick={() => removeEpisode(index)} />
							)}
						</div>
					))}
					<Button text="+ Добавить эпизод" onClick={addEpisode} />
				</div>
				<Input
					label="URL персонажа"
					value={formData.url}
					onChange={handleChange}
					name="url"
					placeholder="https://example.com/character/1"
					type="url"
				/>

				<div className="flex justify-between pt-4">
					<Button text="Создать персонажа" type="submit" />
					<Button text="Отмена" onClick={() => void navigate(-1)} />
				</div>
			</form>
		</div>
	);
});
