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
  const [words, setWords, wordNo, addLetter] = useBoard(wordLengths);

  const handleDoneClick = () => {
    //let words = getWords(wordNo, words);
    verifyBoard(words, setScore, setMsgColorRed, maxNumberConsonants, setErrorMessage);
    if (errorMessage !== '') {
      console.log('**********', errorMessage);
    }
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
