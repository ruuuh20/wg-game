import React, { Component } from 'react';

const ShowGuesses = ({ wrongGuesses }) => {
  const renderWrong = (letters) => {
    return (
      letters.map(letter => {
        return <div className='wrong-guess'>{letter}</div>
      })
    )
  }

  return (
    <div className='wrong-guesses'>
      {renderWrong(wrongGuesses)}
    </div>

  )

}

export default ShowGuesses;
