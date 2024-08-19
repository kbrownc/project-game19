import { useState, useEffect } from 'react';
import { getRandomNumber, loadWord, switchCell, notVowel } from '../utils';
import { totalNumberOfConsonants, maxGameSize } from '../constants';

const useBoard = wordLengths => {
  const [words, setWords] = useState([]);
  //const [squares, setSquares] = useState([]);
  const [wordNo, setWordNo] = useState(1);

  // calculate board size   Turn this into the func that totals an array**************
  const isBoardTooLarge = workWords => {
    if (workWords.length === 0) return;
    const x = workWords.reduce((totalX, word) => {
      if (word.direction === 'row') {
        return totalX + word.length;
      } else {
        return totalX + 1;
      }
    }, 0);
    const y = workWords.reduce((totalY, word) => {
      if (word.direction === 'column') {
        return totalY + word.length;
      } else {
        return totalY + 1;
      }
    }, 0);
    if (x > maxGameSize || y > maxGameSize) {
      return true;
    } else {
      return false;
    }
  };

  // create an empty board
  useEffect(() => {
    let workWords = JSON.parse(JSON.stringify(words));
    let workWordNo = wordNo;
    let direction = 'row';
    let randomNumber;
    let posX = 1;
    let posY = 1;
    for (let i = 0; i < wordLengths.length; i++) {
      if (isBoardTooLarge(workWords)) {
        break;
      }
      [workWords, posX, posY] = loadWord(
        posX,
        posY,
        workWords,
        direction,
        workWordNo,
        wordLengths[i],
        randomNumber
      );
      // reset position back to last letter of last word
      direction === 'row' ? posX-- : posY--;
      // randomly adjust if you build the next word on the current word's last or 2nd last letter
      randomNumber = getRandomNumber(1, 2);
      if ((randomNumber === 1 && i === 0 && wordLengths[i] > 2 && posY === 1) ||
         (randomNumber === 1 && i > 0 && wordLengths[i - 1] > 3 && wordLengths[i] !== 2)) {
        if (direction === 'row') {
          posX--;
        } else {
          posY--;
        }
      }
      direction = direction === 'row' ? 'column' : 'row';
      workWordNo++;
      if (i === wordLengths.length - 1) {
        i = -1;
      } // Re-loop through wordlengths if board is not max size
    }
    // Update statr values
    setWords(workWords);
    setWordNo(workWordNo--);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // add a letter to the board
  const addLetter = (e, i, j, remainingAlphabet, setRemainingAlphabet, setErrorMessage, maxNumberConsonants) => {
    const newWords = JSON.parse(JSON.stringify(words));
    const workRemainingAlphabet = JSON.parse(JSON.stringify(remainingAlphabet));
    let newLetter = e.target.value.replace(/[^a-z]/gi, '').toUpperCase();

    // Check to see if you have reached the extent of your letter useage
    let workErrorMessage = '';
    if (maxNumberConsonants < totalNumberOfConsonants - remainingAlphabet.length + 1 && notVowel(newLetter)) {
      workErrorMessage = 'You have reached the extent of your letter useage... please start over';
      newLetter = '';
    }
    // Ensure input is a letter and available for selection
    console.log('target',e.target.value)
    if (
      workRemainingAlphabet.indexOf(e.target.value.toUpperCase()) === -1 &&
      e.target.value !== '' &&
      workErrorMessage === '' &&
      notVowel(newLetter)
    ) {
      workErrorMessage = 'Letter is not available';
      newLetter = '';
    }
    setErrorMessage(workErrorMessage);
    // Add letter to available list if removed from game
    // if (newSquares[i].letter !== '' && e.target.value === '' && notVowel(newSquares[i].letter)) {
    //   workRemainingAlphabet.push(newSquares[i].letter);
    // }
    // if letter entered was not '' and was not a vowel, remove it from alphabet list
    if (newLetter !== '') {
      if (notVowel(newLetter)) {
        workRemainingAlphabet.splice(workRemainingAlphabet.indexOf(newLetter), 1);
      }
    }
    // update letter
    console.log('newWords',newWords, i , j)

    let tempNewWords = newWords[i].word.split('')
    console.log('tempNewWords',tempNewWords)
    tempNewWords[j] = newLetter;
    console.log('tempNewWords',tempNewWords)
    newWords[i].word = tempNewWords.join('')

    //newWords[i].word[j] = newLetter;
    // save state
    setWords(newWords);
    setRemainingAlphabet(workRemainingAlphabet);
  };

  return [words, setWords, wordNo, addLetter];
};

export default useBoard;
