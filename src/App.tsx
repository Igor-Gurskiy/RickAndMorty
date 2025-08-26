import { useEffect, useState, useMemo } from "react";
import { getFilteredCharacters } from "./Api/Api";
import { Header } from "./Components/Header/Header.tsx";
import { Main } from "./Components/Main/Main.tsx";
import { Pagination } from "./Components/Pagination/Pagination.tsx";
import { useLocalStorage } from "./hooks/localStorage.ts";
import type { Character, Filter } from "./Api/Api";

function App() {
  const [filter, setFilter] = useLocalStorage<Filter>("rickAndMortyFilter", {
    name: "",
    status: "",
    species: "",
    episode: "",
  });

  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useLocalStorage<number>(
    "rickAndMortyCurrentPage",
    1
  );
  const [itemsPerPage] = useState(20);
  const totalPages = Math.ceil(characters.length / itemsPerPage);

  const currentCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return characters.slice(startIndex, endIndex);
  }, [characters, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getFilteredCharacters(filter);
      setCharacters(characters);
    };

    fetchCharacters();
  }, [filter]);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    if (
      newFilter.name !== filter.name ||
      newFilter.status !== filter.status ||
      newFilter.species !== filter.species ||
      newFilter.episode !== filter.episode
    ) {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header filter={filter} onFilterChange={handleFilterChange} />
      <Main characters={currentCharacters} />
      {characters && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default App;
