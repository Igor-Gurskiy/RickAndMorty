const URL = import.meta.env.VITE_API_BASE_URL;

export const getCharactersApi = (filter = {}, page = 1) => {
  return fetch(
    `${URL}/character?${new URLSearchParams(filter).toString()}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
};

export const getEpisodesApi = (filter = {}) =>
  fetch(`${URL}/episode?${new URLSearchParams(filter).toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
