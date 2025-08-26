const URL = import.meta.env.VITE_API_BASE_URL;

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Filter {
  name?: string;
  status?: string;
  species?: string;
  episode?: string;
}

export const getIdCharactersFromEpisodes = async (filter: Filter = {}) => {
  const charactersId = new Set<string>();
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const params = new URLSearchParams({ ...filter, page: page.toString() });
    const url = `${URL}/episode?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.results && Array.isArray(data.results)) {
      data.results.forEach((episode: Episode) => {
        episode.characters.forEach((characterUrl) => {
          const id = characterUrl.split("/").pop();
          if (id) {
            charactersId.add(id);
          }
        });
      });
    }

    hasMorePages = data.info && data.info.next !== null;
    page++;
  }

  return Array.from(charactersId);
};

export const getCharactersApi = async (filter = {}) => {
  const allCharacters = [];
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const params = new URLSearchParams({ ...filter, page: page.toString() });
    const url = `${URL}/character?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.results && Array.isArray(data.results)) {
      allCharacters.push(...data.results);
    }

    hasMorePages = data.info && data.info.next !== null;
    page++;
  }

  return allCharacters;
};

export const getFilteredCharacters = async (filter: Filter = {}) => {
  let episodeCharacterIds: string[] = [];
  if (filter.episode) {
    episodeCharacterIds = await getIdCharactersFromEpisodes({
      episode: filter.episode,
    });
  }

  const charactersFilter = {
    name: filter.name,
    status: filter.status,
    species: filter.species,
  };
  const allCharacters = await getCharactersApi(charactersFilter);

  let filteredCharacters = allCharacters;

  if (filter.episode) {
    filteredCharacters = filteredCharacters.filter((character) =>
      episodeCharacterIds.includes(character.id.toString())
    );
  }

  if (filter.species) {
    filteredCharacters = filteredCharacters.filter(
      (character) =>
        character.species.toLowerCase() === filter.species!.toLowerCase()
    );
  }

  return filteredCharacters;
};
