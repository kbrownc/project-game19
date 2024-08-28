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

const getRandomNumber = (start, end) => {
  let random = Math.floor(Math.random() * end + start);
  while (random > end) {
    random = Math.floor(Math.random() * end + start);
  }
  return random;
};

const loadWord = (x, y, workWords, direction, workWordNo, length, randomNumber) => {
  let newWord = {};
  newWord = {
    id: workWordNo,
    relatedLetter: { x: 0, y: 0 },
    word: ''.padStart(length, ' '),
    direction: direction,
    length: length,
    position: { x: x, y: y },
  };
  workWords.push(newWord);
  direction === 'row' ? (x = x + length) : (y = y + length);
  return [workWords, x, y];
};

const updateWord = (x, y, workWords, i) => {
  workWords[i].relatedLetter.x = x;
  workWords[i].relatedLetter.y = y;
  return workWords;
};

const copyLetter = (newWords, newLetter, i, j) => {
  //console.log('copy', newLetter, 'word', i, 'offset', j);
  let posJustPlayedX = 0;
  let posJustPlayedY = 0;
  if (newWords[i].direcyion === 'row') {
    posJustPlayedX = newWords[i].position.x + j;
    posJustPlayedY = newWords[i].position.y;
  } else {
    posJustPlayedX = newWords[i].position.x;
    posJustPlayedY = newWords[i].position.y + j;
  }
  for (let y = 0; y < newWords.length; y++) {
    if (y !== i) {
      for (let z = 0; z < newWords[y].length; z++) {
        if (newWords[y].direction === 'row') {
          if (posJustPlayedX === newWords[y].position.x + z && posJustPlayedY === newWords[y].position.y) {
            let tempNewWord = newWords[y].word.split('');
            tempNewWord[z] = newLetter;
            newWords[y].word = tempNewWord.join('');
          }
        } else {
          if (posJustPlayedX === newWords[y].position.x && posJustPlayedY === newWords[y].position.y + z) {
            let tempNewWord = newWords[y].word.split('');
            tempNewWord[z] = newLetter;
            newWords[y].word = tempNewWord.join('');
          }
        }
      }
    }
  }
  return newWords;
};

const calculateScore = (words, maxNumberConsonants) => {
  // assign bonus points based on max Number Consonants selected
  let workScore = maxConsonantsPlayable - maxNumberConsonants;
  words.forEach(value => {
    value.word.split('').forEach(char => {
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
    if (validWord(words[j].word) === false) {
      isWordValid = false;
      invalidWord = words[j].word;
      break;
    }
  }
  return [isWordValid, invalidWord];
};

function verifyBoard(words, setScore, setMsgColorRed, maxNumberConsonants, setErrorMessage) {
  let workErrorMessage = '';
  // Are all squares filled in?
  if (
    words.some(item => {
      return item.word.indexOf(' ') >= 0;
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
  getRandomNumber,
  loadWord,
  updateWord,
  copyLetter,
  calculateScore,
  notVowel,
  checkWords,
  verifyBoard,
  isMobile,
};
