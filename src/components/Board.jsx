import React, { useState } from 'react';
import Square from './Square';
import useBoard from './useBoard';
import { verifyBoard } from '../utils';

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
  const [words, setWords, addLetter] = useBoard(wordLengths);

  const handleDoneClick = () => {
    verifyBoard(words, setScore, setMsgColorRed, maxNumberConsonants, setErrorMessage);
  };

  return (
    <div>
      <div className="score"> Score: {score}</div>
      <div className="board">
        {words.map(({ word, position, direction }, i) => {
          return word.split('').map((singleLetter, j) => {
            return (
              <Square
                key={j}
                i={i}
                j={j}
                remainingAlphabet={remainingAlphabet}
                setRemainingAlphabet={setRemainingAlphabet}
                setErrorMessage={setErrorMessage}
                maxNumberConsonants={maxNumberConsonants}
                wordLengths={wordLengths}
                words={words}
                setWords={setWords}
                addLetter={addLetter}
                direction={direction}
                position={position}
                singleLetter={singleLetter}
              />
            );
          });
        })}
      </div>
      <button className="restart" onClick={() => handleDoneClick()}>
        Done
      </button>
    </div>
  );
};

export default Board;
