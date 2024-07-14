import React from 'react';

const Square = ({
  i,
  remainingAlphabet,
  setRemainingAlphabet,
  setErrorMessage,
  maxNumberConsonants,
  wordLengths,
  squares,
  setSquares,
  addLetter,
}) => {
  const editInput = e => {
    addLetter(
      e,
      i,
      remainingAlphabet,
      setRemainingAlphabet,
      setErrorMessage,
      maxNumberConsonants
    );
  };

  return (
    <div className="cell" style={{ gridRow: squares[i].locationRow, gridColumn: squares[i].locationCol }}>
      <input
        required
        name="cell+square"
        className="yellowsquares"
        type="text"
        value={squares[i].letter}
        maxLength="1"
        onChange={editInput}
      />
    </div>
  );
};

export default Square;
