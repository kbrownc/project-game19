import React, { useState } from 'react';
import Square from './Square';
import useBoard from './useBoard';
import { getWords, verifyBoard } from '../utils';

const Board = ({
  remainingAlphabet,
  setRemainingAlphabet,
  errorMessage,
  setErrorMessage,
  maxNumberConsonants,
  setMsgColorRed,
  wordLengths,
}) => {
  const [score, setScore] = useState(0);
  const [squares, setSquares, wordNo, addLetter] = useBoard(wordLengths);

  const handleDoneClick = () => {
    let words = getWords(wordNo, squares);
    verifyBoard(words, setScore, squares, setMsgColorRed, maxNumberConsonants, setErrorMessage);
  };

  return (
    <div>
      <div className="score"> Score: {score}</div>
      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={i}
            i={i}
            remainingAlphabet={remainingAlphabet}
            setRemainingAlphabet={setRemainingAlphabet}
            setErrorMessage={setErrorMessage}
            maxNumberConsonants={maxNumberConsonants}
            wordLengths={wordLengths}
            squares={squares}
            setSquares={setSquares}
            addLetter={addLetter}
          />
        ))}
      </div>
      <button className="restart" onClick={() => handleDoneClick()}>
        Done
      </button>
    </div>
  );
};

export default Board;
