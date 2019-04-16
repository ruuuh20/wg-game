import React, { Component } from 'react';

const ShowGuesses = ({ wrongGuesses }) => {
  const renderWrong = (letters) => {
    return (
      letters.map(letter => {
        return <h1>{letter}</h1>      
      })
    )
  }

  return (
    <div>
    {renderWrong(wrongGuesses)}
    </div>

  )

}

export default ShowGuesses;
