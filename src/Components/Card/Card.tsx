import { useEffect } from "react";

interface ICard {
  character: TCharacter;
  visible: boolean;
  onClose: () => void;
}
export const Card = ({ character, visible, onClose }: ICard) => {
  const handleVisible = () => {
    onClose();
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={handleVisible}
      >
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-md overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-2">
            <h2 className="text-xl font-bold text-gray-800">
              {character.name}
            </h2>
            <button
              onClick={handleVisible}
              className="w-8 h-8 flex items-center justify-center text-black text-xl"
            >
              X
            </button>
          </div>

          <img
            src={character.image}
            alt={character.name}
            className="w-full object-contain"
          />

          <div className="space-y-2 text-lg text-gray-600 p-2">
            <p>
              <span className="font-semibold">Status: </span>
              <span
                className={`ml-1 ${
                  character.status === "Alive"
                    ? "text-green-600"
                    : character.status === "Dead"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {character.status}
              </span>
            </p>

            <p>
              <span className="font-semibold">Species:</span>{" "}
              {character.species}
            </p>

            {character.type && (
              <p>
                <span className="font-semibold">Type:</span> {character.type}
              </p>
            )}

            <p>
              <span className="font-semibold">Gender:</span> {character.gender}
            </p>

            <p>
              <span className="font-semibold">Origin:</span>{" "}
              {character.origin?.name}
            </p>

            <p>
              <span className="font-semibold">Location:</span>{" "}
              {character.location?.name}
            </p>

            {character.episode && (
              <p>
                <span className="font-semibold">Episodes:</span>{" "}
                {character.episode.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
