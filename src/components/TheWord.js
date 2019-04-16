import React from 'react';
import LetterBlock from './LetterBlock'

const TheWord = (props) => {
  const handleClick = () => {};

  const split = props.wordLetters.map((letter, index) => {
    if (props.correct.includes(letter)) {
      return (
            <LetterBlock letter={letter} key={index}/>
      )
    } else {
      return (
            <LetterBlock letter={"_"} key={index}/>
      )
    }
  }

  )


  return (
    <div className="word-wrapper" onClick={handleClick}>
      {split}
    </div>
  );
}

export default TheWord;
