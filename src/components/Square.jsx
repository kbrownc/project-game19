import React from 'react';

const Square = ({
  i,
  j,
  remainingAlphabet,
  setRemainingAlphabet,
  setErrorMessage,
  maxNumberConsonants,
  wordLengths,
  words,
  setWords,
  addLetter,
  direction,
  position,
  singleLetter,
}) => {
  const editInput = e => {
    addLetter(e, i, j, remainingAlphabet, setRemainingAlphabet, setErrorMessage, maxNumberConsonants);
  };

  if (singleLetter === ' ') singleLetter = ''

  return (
      <input
        style={{
          gridColumn:
            direction === 'row' 
              ? `${position.x + j}/${position.x + j}` 
              : `${position.x}/${position.x + 1}`,
          gridRow:
            direction === 'column'
              ? `${position.y + j}/${position.y + j}`
              : `${position.y}/${position.y + 1}`,
        }}
        required
        key={j}
        name="cell+square"
        className="yellowsquares"
        type="text"
        value={singleLetter}
        maxLength="1"
        onChange={editInput}
      />
  );
};

export default Square;
