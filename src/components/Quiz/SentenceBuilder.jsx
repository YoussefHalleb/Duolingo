import { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SentenceBuilder({
  question,
  onDrop,
  onDragOver,
  droppedWords,
  setDroppedWords,
  feedback,
  onVerify,
}) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData("text/plain", word.trim());
  };

  const handleDropLocal = (e) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain").trim();
    if (word && !droppedWords.includes(word)) {
      setDroppedWords([...droppedWords, word]);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const newDroppedWords = Array.from(droppedWords);
    const [removed] = newDroppedWords.splice(source.index, 1);
    newDroppedWords.splice(destination.index, 0, removed);
    setDroppedWords(newDroppedWords);
  };

  const shuffledWords = useMemo(() => {
    return [...question.targetWords]
      .map((word) => word.trim())
      .sort(() => Math.random() - 0.5);
  }, [question.targetWords]);

  const handleVerify = () => {
    setIsVerifying(true);
    onVerify(droppedWords); 
    setIsVerifying(false);
  };

  const getDropZoneClass = () => {
  
    return "bg-gray-50";
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Construisez la phrase</h2>
      <p className="text-md text-center mb-6 text-gray-700">
        Traduis cette phrase : <strong>{question.nativeSentence}</strong>
      </p>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2 text-gray-700">Mots disponibles :</h3>
        <div className="flex flex-wrap gap-2">
          {shuffledWords
            .filter((word) => !droppedWords.includes(word))
            .map((word, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-move shadow-md hover:bg-blue-600 transition"
              >
                {word}
              </div>
            ))}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dropZone">
          {(provided) => (
            <div
              className={`border-2 border-dashed p-4 mb-6 min-h-[100px] text-center ${getDropZoneClass()}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
              onDragOver={onDragOver}
              onDrop={(e) => {
                onDrop(e);
                handleDropLocal(e);
              }}
            >
              <h3 className="text-md font-semibold mb-2 text-gray-700">Zone de dépôt :</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {droppedWords.map((word, index) => (
                  <Draggable key={word + index} draggableId={word + index} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md cursor-move"
                      >
                        {word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleVerify}
        disabled={isVerifying || droppedWords.length === 0}
        className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isVerifying ? "Vérification..." : "Vérifier"}
      </button>

      {feedback && (
        <>
          <p
            className={
              feedback.includes("Correct")
                ? "mt-4 text-green-500 font-bold text-center"
                : "mt-4 text-red-500 font-bold text-center"
            }
          >
            {feedback}
          </p>
          {!feedback.includes("Correct") && (
            <p className="mt-2 text-gray-700 text-center">
              Bonne réponse : {question.targetWords.map((w) => w.trim()).join(" ")}
            </p>
          )}
        </>
      )}
    </div>
  );
}