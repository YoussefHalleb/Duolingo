import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function MatchingSimple({ question, onAnswer, feedback, setConnections }) {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [connections, setConnectionsLocal] = useState({});

  useEffect(() => {
    if (question && question.pairs) {
      setLeftItems(question.pairs.map((pair) => ({ id: pair.word, content: pair.word, type: "word" })));
      setRightItems(
        question.pairs
          .map((pair) => ({
            id: pair.translation,
            content: pair.translation,
            type: "translation",
          }))
          .sort(() => Math.random() - 0.5)
      );
    }
  }, [question]);

  useEffect(() => {
    if (setConnections) {
      setConnections(connections);
    }
  }, [connections, setConnections]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceItems = source.droppableId === "words" ? leftItems : rightItems;
    const destItems = destination.droppableId === "words" ? leftItems : rightItems;

    if (source.droppableId === "words" && destination.droppableId === "translations") {
      const word = sourceItems[source.index].content;
      const translation = rightItems[destination.index].content;
      handleConnect(word, translation);
    } else if (source.droppableId === "translations" && destination.droppableId === "words") {
      const translation = sourceItems[source.index].content;
      const word = leftItems[destination.index].content;
      handleConnect(word, translation);
    }
  };

  const handleConnect = (word, translation) => {
    setConnectionsLocal((prev) => {
      const newConnections = { ...prev };
      Object.keys(newConnections).forEach((key) => {
        if (newConnections[key] === translation) delete newConnections[key];
      });
      if (newConnections[word] !== translation) {
        newConnections[word] = translation;
      } else {
        delete newConnections[word];
      }
      return newConnections;
    });
  };

  const handleClickTranslation = (translation) => {
    const unconnectedWord = leftItems.find(
      (item) => !Object.keys(connections).includes(item.content)
    );
    if (unconnectedWord) {
      handleConnect(unconnectedWord.content, translation);
    }
  };

  if (!question || !question.pairs || question.pairs.length === 0) {
    return <p>Aucune paire disponible pour cet exercice.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">{question.question}</h2>
      <div className="mb-4 flex justify-between text-sm text-gray-500">
        <span>Question {question.order} sur 3</span>
        <span>Score: {question.score}</span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Droppable droppableId="words">
            {(provided) => (
              <div
                className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-md font-medium mb-2 text-gray-700">Mots</h3>
                <div className="space-y-2">
                  {leftItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-2 rounded-lg border cursor-move ${
                            connections[item.content] ? "bg-purple-100 border-purple-500" : "bg-white border-gray-300"
                          } ${snapshot.isDragging ? "bg-gray-200" : ""}`}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="translations">
            {(provided) => (
              <div
                className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-md font-medium mb-2 text-gray-700">Traductions</h3>
                <div className="space-y-2">
                  {rightItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleClickTranslation(item.content)}
                          className={`p-2 rounded-lg border cursor-move ${
                            Object.values(connections).includes(item.content)
                              ? "bg-purple-100 border-purple-500"
                              : "bg-white border-gray-300"
                          } ${snapshot.isDragging ? "bg-gray-200" : ""}`}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <div className="mb-4 space-y-2">
        {question.pairs.map((pair) => (
          <div key={pair.word} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-700">{pair.word}</span>
            <span className="text-gray-500">→</span>
            <span className="text-gray-700">{connections[pair.word] || "?"}</span>
          </div>
        ))}
      </div>

      {feedback && (
        <>
          <p className={feedback.includes("Correct") ? "mt-4 text-green-500 font-bold text-center" : "mt-4 text-red-500 font-bold text-center"}>
            {feedback}
          </p>
          {!feedback.includes("Correct") && (
            <p className="mt-2 text-gray-700 text-center">
              Bonnes réponses : {question.pairs.map((pair) => `${pair.word} → ${pair.translation}`).join(", ")}
            </p>
          )}
        </>
      )}
    </div>
  );
}