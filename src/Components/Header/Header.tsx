import { useMemo } from "react";
import { type Filter } from "../../Api/Api";

interface HeaderProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}
export const Header = ({ filter, onFilterChange }: HeaderProps) => {
  const handleInputChange = useMemo(
    () => (key: keyof Filter, value: string) => {
      onFilterChange({
        ...filter,
        [key]: value,
      });
    },
    [filter, onFilterChange]
  );

  const validateInput = (value: string) => {
    return value.replace(/[^a-zA-Z0-9\s\-']/g, "");
  };
  const handleValidInputChange = (key: "name" | "episode", value: string) => {
    const filteredValue = validateInput(value);
    handleInputChange(key, filteredValue);
  };

  const statuses = ["Alive", "Dead", "unknown"];
  const species = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological Creature",
    "unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
  ];

  return (
    <div className="flex flex-col gap-4 my-2">
      <h1 className="text-3xl font-bold text-center">Вселенная Рик и Морти</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-auto sm:grid-rows-3 max-w-3xl mx-auto gap-2">
        <div className="flex flex-col justify-center sm:col-span-2">
          <label htmlFor="name-input" className="text-gray-600 font-medium">
            Имя персонажа
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-4 mt-4"
            id="name-input"
            type="text"
            placeholder="Rick"
            value={filter.name}
            onChange={(e) => handleValidInputChange("name", e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="name-input" className="text-gray-600 font-medium">
            Жив?
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-4 mt-4"
            value={filter.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value=""></option>
            {statuses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="name-input" className="text-gray-600 font-medium">
            Раса
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-4 mt-4"
            value={filter.species}
            onChange={(e) => handleInputChange("species", e.target.value)}
          >
            <option value=""></option>
            {species.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            {}
          </select>
        </div>
        <div className="flex flex-col justify-center sm:col-span-2">
          <label htmlFor="name-input" className="text-gray-600 font-medium">
            Эпизод
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-4 mt-4"
            type="text"
            placeholder="S01E05"
            value={filter.episode}
            onChange={(e) => handleValidInputChange("episode", e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
};
