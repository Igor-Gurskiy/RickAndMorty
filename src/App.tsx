import { useEffect, useState } from "react";
import { getCharactersApi } from "./Api/Api";
import { Header } from "./Components/Header/Header.tsx";
import { Main } from "./Components/Main/Main.tsx";
import { Pagination } from "./Components/Pagination/Pagination.tsx";

function App() {
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    species: "",
    episode: "",
  });
  const [characters, setCharacters] = useState([]);
  const [curentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchCharacters = async () => {
      const filterCharacters = {
        name: filter.name,
        status: filter.status,
        species: filter.species,
      };
      const characters = await getCharactersApi(filterCharacters, curentPage);
      setCharacters(characters.results);
      setTotalPages(characters.info.pages);
    };

    fetchCharacters();
  }, [filter, curentPage]);

  return (
    <>
      <Header filter={filter} onFilterChange={setFilter} />
      <Main characters={characters} />
      {characters &&
      <Pagination
        currentPage={curentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      }
    </>
  );
}

export default App;
