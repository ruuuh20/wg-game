import React from 'react';
import LetterBlock from './LetterBlock'

const TheWord = (props) => {

  const split = props.wordLetters.map((letter, index) => {
    if (props.gameStatus === 'lost') {
      return ( <
        LetterBlock letter = {letter} key = {index} />
      )
    }
    else if (props.correct.includes(letter)) {
      return (
            <LetterBlock letter={letter} key={index}/>
      )
    } else {
      return (
            <LetterBlock letter={"_"} key={index}/>
      )
    }
  })

  return (
    <div className="word-wrapper">
      {split}
    </div>
  );
}

export default TheWord;
