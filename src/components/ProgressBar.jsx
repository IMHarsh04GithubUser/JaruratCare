
import "./Progress.css";
import React, { useState } from 'react';


const ProgressBar = () => {
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleAdd = () => {
    if (num < 150) {
      setHistory([...history, num]);
      setRedoStack([]);
      setNum(num + 1);
    }
  };

  const handleSubtract = () => {
    if (num > 0) {
      setHistory([...history, num]);
      setRedoStack([]);
      setNum(num - 1);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousNum = history.pop();
      setRedoStack([...redoStack, num]);
      setNum(previousNum);
      setHistory([...history]);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextNum = redoStack.pop();
      setHistory([...history, num]);
      setNum(nextNum);
      setRedoStack([...redoStack]);
    }
  };

  return (
    <div className="ProgressBar-Container">
      <h1>Number: {num}</h1>
      <div className="buttons">
        <button onClick={handleSubtract}>- Subtract</button>
        <button onClick={handleAdd}>Add +</button>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${(num / 150) * 100}%` }}
        ></div>
      </div>
      <div className="undo-redo-buttons">
        <button onClick={handleUndo} disabled={history.length === 0}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={redoStack.length === 0}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default ProgressBar