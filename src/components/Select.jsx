import React from 'react';
import { lengthList } from '../constants';

const SelectNumber = ({
  maxNumberConsonants,
  setMaxNumberConsonants,
  setShowBoard,
  wordLengths,
  setWordLengths,
  setErrorMessage,
}) => {
  const editInput = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value > 20) return;
    if (value === '0') {
      setErrorMessage('Number of letters selected is 0');
    }
    setMaxNumberConsonants(value);
  };

  function handleCheckboxChange(lth) {
    let newWordLengths = [...wordLengths];
    if (wordLengths.filter(item => item === lth).length > 0) {
      newWordLengths = wordLengths.filter(item => item !== lth);
    } else {
      newWordLengths.push(lth);
    }
    setWordLengths(newWordLengths);
  }

  const saveClicked = () => {
    if (maxNumberConsonants === '') {
      setErrorMessage('Number of letters not selected');
      return;
    }
    if (wordLengths.length === 0) {
      setErrorMessage('Lengths of words not selected');
      return;
    }
    setErrorMessage('');
    setShowBoard(true);
  };

  return (
    <>
      <div className="instructions">
        Enter a number betwen 1 & 20 which
        <br />
        limits the number of consonents you
        <br />
        can play. Select the word sizes you
        <br />
        want the board to be composed of.
        <br />
      </div>
      <br />
      <div className="inputdev">
        <input
          required
          name="value"
          className="selected"
          type="text"
          value={maxNumberConsonants}
          maxLength="2"
          onChange={editInput}
        />
        <span className="instructionsNum">Enter number here</span>
      </div>
      <div>
        {lengthList.map(lth => (
          <div key={lth}>
            <input
              type="checkbox"
              name="select"
              key="{lth}"
              checked={wordLengths.filter(item => item === lth).length > 0 ? 'checked' : ''}
              value={lengthList.filter(item => item === lth)}
              onChange={() => handleCheckboxChange(lth)}
            />
            <label className="modal-label">{lth + ' letter word size'}</label>
          </div>
        ))}
      </div>
      <button className="done" onClick={() => saveClicked()}>
        Save choices
      </button>
    </>
  );
};

export default SelectNumber;
