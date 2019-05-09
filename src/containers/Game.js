import React, { Component } from 'react';
import GuessForm from '../components/GuessForm'
import TheWord from '../components/TheWord';
import ShowGuesses from '../components/ShowGuesses';
import { Link } from 'react-router-dom';
import Diagram from '../components/Diagram';

import hangmanAttempts from "../components/HangmanAttempts";

class Game extends Component {

  state = {
    turns: 6,
    wrongGuesses: [],
    guessValue: '',
    wordLetters: this.props.word.split(''),
    correct: [],
    repeat: '',
    won: false,
    gameStatus: 'start',
    currentUser: 1,
    
  }


  handleGuess = (e) => {
    e.preventDefault();
    const letter = this.state.guessValue.toLowerCase();
    const wrongGuesses = [...this.state.wrongGuesses]
    const correct = [...this.state.correct]
    const wordLetters = [...this.state.wordLetters]

    // guess is a repeat
    if ((this.state.correct.includes(letter) || this.state.wrongGuesses.includes(letter))) {
      this.setState({
        repeat: 'Already guessed that',
        guessValue: ''
      })
    }
        // correct guess
    else if (this.state.wordLetters.includes(letter)) {
        correct.push(letter)
        this.setState({
          guessValue: '',
          correct,
          repeat: '',

        })

        //check if game is won
          // get unique letters from original letters array (remove duplicates)
        const unique = [...new Set(wordLetters)]
        if (unique.every((lett) => correct.includes(lett))) {
          this.setState({
            won: true
          })
        }
      // let checker = (arr, target) => target.every(v => arr.includes(v))
    }

      // wrong guess

    else if (!this.state.wordLetters.includes(letter))  {
        //lost
      wrongGuesses.push(letter)
      if (this.state.turns - 1 === 0) {
        this.setState({
          gameStatus: 'lost'
        })
      } else {
      this.setState((prevState, props) => {  //dependent on old state(counter)
        return {
          turns: prevState.turns - 1,
          wrongGuesses,
          guessValue: '',
          repeat: '',
          gameStatus: '',
          currentUser: prevState.otherUser
        }
      })
      }

      }

  } 

  updateImage = () => {

  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      guessValue: e.target.value
    })
  }

  render() {
    let renderGame = null;
  
  
    if (!this.state.won && this.state.gameStatus !== 'lost') {

    renderGame = (
      <div>
        <h2>
          Current User: {this.state.currentUser}
        </h2>
        <TheWord
          wordLetters={this.state.wordLetters}
          correct={this.state.correct}
          gameStatus={this.state.gameStatus}
        />

        <div className="guess-form">
          <form onSubmit={this.handleGuess}>
            <input
              className="letter-input"
              type="text"
              maxLength="1"
              value={this.state.guessValue}
              onChange={this.handleChange}
            />
            {/* <button type="submit">Enter</button> */}
          </form>
        
        </div>
      </div>
    );
          } else if (this.state.won) { //won
            renderGame = (
              <div>
               <h1>{this.state.currentUser} won!</h1>
              <Link className='play-link' to='/' onClick={this.props.reset}>Play Again</Link>
              </div>
            )
          } else if (this.state.gameStatus === 'lost') { //lost
            renderGame = (
              <div>
               <h1>{this.state.currentUser} lost!</h1>
               <Link className='play-link' to='/' onClick={this.props.reset}>Play Again</Link>
                <TheWord wordLetters={this.state.wordLetters} correct={this.state.correct} gameStatus={this.state.gameStatus} />
              </div>
            )
          }

    return (
      <React.Fragment>
        {renderGame}
        <div className="diagram-section">
          <ShowGuesses wrongGuesses={this.state.wrongGuesses} />
          {hangmanAttempts(this.state.turns)}
        </div>
      </React.Fragment>
    );
  }

}

export default Game;
  