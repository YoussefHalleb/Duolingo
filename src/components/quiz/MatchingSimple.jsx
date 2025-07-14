import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function MatchingSimple({ question, onAnswer, feedback }) {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [connections, setConnections] = useState({});

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
    setConnections((prev) => {
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

  const handleSubmit = () => {
    const userAnswer = question.pairs.map((pair) => `${pair.word}:${connections[pair.word] || ""}`);
    const isCorrect = question.pairs.every(
      (pair) => connections[pair.word] === pair.translation
    );
    onAnswer(userAnswer);
  };

  if (!question || !question.pairs || question.pairs.length === 0) {
    return <p>Aucune paire disponible pour cet exercice.</p>;
  }

  return (
    <div className="duolingo-matching">
      <h2 className="duolingo-title mb-4">{question.question}</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="duolingo-match-container">
          <Droppable droppableId="words">
            {(provided) => (
              <div
                className="duolingo-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="duolingo-subtitle">Mots</h3>
                <div className="duolingo-items">
                  {leftItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`duolingo-card ${
                            connections[item.content] ? "duolingo-connected" : ""
                          } ${snapshot.isDragging ? "dragging" : ""}`}
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
                className="duolingo-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="duolingo-subtitle">Traductions</h3>
                <div className="duolingo-items">
                  {rightItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleClickTranslation(item.content)}
                          className={`duolingo-card ${
                            Object.values(connections).includes(item.content)
                              ? "duolingo-connected"
                              : ""
                          } ${snapshot.isDragging ? "dragging" : ""}`}
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

      <div className="duolingo-connections mb-4">
        {question.pairs.map((pair) => (
          <div key={pair.word} className="duolingo-pair">
            <span className="duolingo-word">{pair.word}</span>
            <span className="duolingo-arrow">→</span>
            <span className="duolingo-translation">
              {connections[pair.word] || "?"}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={Object.keys(connections).length !== question.pairs.length}
        className="btn btn-validate"
      >
        Valider
      </button>

      {feedback && (
        <p
          className={`duolingo-feedback mt-2 p-2 rounded text-center ${
            feedback.includes("Correct") ? "duolingo-success" : "duolingo-error"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}