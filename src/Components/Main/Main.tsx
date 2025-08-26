import { Card } from "../Card/Card";
import { useState } from "react";
import { type Character } from "../../Api/Api";
interface IMain {
  characters: Character[];
}
export const Main = ({ characters }: IMain) => {
  const [visible, setVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const cardOnClick = (character: Character) => {
    setVisible(true);
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Найдено</h1>
        <div className="flex flex-col gap-4 w-2/3 sm:w-1/2 mx-auto">
          {characters &&
            characters.map((character: Character, index: number) => (
              <div
                key={character.id}
                className={`flex flex-col sm:flex-row justify-center items-center text-center p-3 gap-4 cursor-pointer ${
                  index !== characters.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
                onClick={() => cardOnClick(character)}
              >
                <h2 className="text-lg font-bold">{character.name}</h2>
                <p className="text-gray-600">Status: {character.status}</p>
                <p className="text-gray-600">Species: {character.species}</p>
              </div>
            ))}
        </div>
        {selectedCharacter && (
          <Card
            character={selectedCharacter}
            visible={visible}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};
