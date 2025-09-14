import { CharacterDetailPage } from './Components/CharacterDetailPage/CharacterDetailPage.tsx';
import { Header } from './Components/Header/Header.tsx';
import { Main } from './Components/Main/Main.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CreateCharacter } from './Components/CreateCharacter/CreateCharacter';
function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to="/characters" replace />} />
				<Route path="/characters" element={<Main />} />
				<Route path="/characters/:id" element={<CharacterDetailPage />} />
				<Route path="/create-character" element={<CreateCharacter />} />
			</Routes>
		</>
	);
}

export default App;
