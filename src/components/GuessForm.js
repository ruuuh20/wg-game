import React from 'react';


const GuessForm = ({ onInputChange, onSubmit }) => {
  const handleClick = () => {};
  return (
    <form onSubmit={this.handleGuess}>
      {'Guess a letter'}
      <input type='text'
              maxLength="1"
              value={this.state.guessValue}
              onChange={this.handleChange}
      />
      <button type="submit"></button>


      </form>
  );

}



export default GuessForm;
