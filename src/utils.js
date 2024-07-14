import { wordDictionary2 } from './letters/WordDictionary2';
import { wordDictionary3 } from './letters/WordDictionary3';
import { wordDictionary4 } from './letters/WordDictionary4';
import { wordDictionary5 } from './letters/WordDictionary5';
import { letterPoints } from './letters/LetterPoints';
import { vowels, maxConsonantsPlayable } from './constants';

// Look in correct dictionary to see if word exists
function validWord(word) {
  let wordDictionArray = [wordDictionary2, wordDictionary3, wordDictionary4, wordDictionary5];
  let wordDictionary = wordDictionArray[word.length - 2];
  return !!wordDictionary.find(item => {
    return item === word.toLowerCase();
  });
}

// get letters from board and put each word into an array
//    the squares which contain 1's,2's,3's,..... etc. defines each word
//    then create an array of words
function getWords(wordNo, squares) {
  let singleWord;
  let wordsList = [];
  let result = '';
  for (let i = 1; i < wordNo + 1; i++) {
    singleWord = [];
    for (let j = 0; j < squares.length; j++) {
      singleWord = squares.filter(event => {
        if (event.wordNums.length === 1) {
          return event.wordNums[0] === i;
        } else if (event.wordNums.length === 2) {
          return event.wordNums[0] === i || event.wordNums[1] === i;
        } else {
          return false;
        }
      });
    }
    // combine letters from each word
    result = singleWord.reduce((word, item) => {
      return word + item.letter;
    }, '');
    wordsList.push(result);
  }
  return wordsList;
}

const getRandomNumber = (start, end) => {
  let random = Math.floor(Math.random() * end + start);
  while (random > end) {
    random = Math.floor(Math.random() * end + start);
  }
  return random;
};

const loadCell = (x, y, workSquares, doubleWord, workWordNo) => {
  let newSquare = {};
  let wordNums = [workWordNo];
  if (doubleWord) {
    wordNums = [workWordNo, workWordNo - 1];
  }
  newSquare = {
    letter: '',
    locationCol: x + ' / ' + (x + 1),
    locationRow: y + ' / ' + (y + 1),
    wordNums: wordNums,
  };
  workSquares.push(newSquare);
  return workSquares;
};

const switchCell = workSquares => {
  let savedLetter = workSquares[workSquares.length - 2].letter;
  let savedWordNums = workSquares[workSquares.length - 2].wordNums;
  workSquares[workSquares.length - 2].letter = workSquares[workSquares.length - 1].letter;
  workSquares[workSquares.length - 2].wordNums = workSquares[workSquares.length - 1].wordNums;
  workSquares[workSquares.length - 1].letter = savedLetter;
  workSquares[workSquares.length - 1].wordNums = savedWordNums;
  return workSquares;
};

const calculateScore = (words, maxNumberConsonants) => {
  // assign bonus points based on max Number Consonants selected
  let workScore = maxConsonantsPlayable - maxNumberConsonants;
  words.forEach(value => {
    value.split('').forEach(char => {
      workScore =
        workScore +
        letterPoints.find(item => {
          return item.letter === char.toUpperCase();
        }).point;
    });
  });
  return workScore;
};

const notVowel = newLetter => {
  return vowels.indexOf(newLetter) === -1;
};

const checkWords = words => {
  let invalidWord = '';
  let isWordValid = true;
  for (let j = 0; j < words.length; j++) {
    if (validWord(words[j]) === false) {
      isWordValid = false;
      invalidWord = words[j];
      break;
    }
  }
  return [isWordValid, invalidWord];
};

function verifyBoard(words, setScore, squares, setMsgColorRed, maxNumberConsonants, setErrorMessage) {
  let workErrorMessage = '';
  // Are all squares filled in?
  if (
    squares.some(item => {
      return item.letter === '';
    })
  ) {
    workErrorMessage = 'Fill in all squares';
  }
  // are all words real words
  if (workErrorMessage === '') {
    const [isWordValid, invalidWord] = checkWords(words);
    if (!isWordValid) {
      setMsgColorRed(true);
      workErrorMessage = invalidWord + ' is not valid';
    } else {
      workErrorMessage = 'You win!!!';
      setMsgColorRed(false);
      setScore(calculateScore(words, maxNumberConsonants));
    }
  }
  setErrorMessage(workErrorMessage);
}

function isMobile() {
  return /Android|iPhone/i.test(navigator.userAgent);
}

export {
  validWord,
  getWords,
  getRandomNumber,
  loadCell,
  switchCell,
  calculateScore,
  notVowel,
  checkWords,
  verifyBoard,
  isMobile
};
