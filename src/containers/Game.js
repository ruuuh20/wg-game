import React, { Component } from 'react';
import GuessForm from '../components/GuessForm'
import TheWord from '../components/TheWord';
import ShowGuesses from '../components/ShowGuesses'

class Game extends Component {

  state = {
    turns: 6,
    wrongGuesses: [],
    guessValue: '',
    wordLetters: this.props.word.split(''),
    correct: [],
    repeat: '',
    won: false
  }

  componentDidMount() {
    //shouldn't call setstate in here
    // const wordLetters = this.props.word.split('')
    // this.setState({
    //   wordLetters: wordLetters
    // })
    // console.log(this.props + wordLetters)
  }

  startGame = (e) => {
    e.preventDefault()

    console.log(this.props.history)
      // this.props.history.push('/play');

  }

  gameWon = () => {

  }

  gameLost = () => {

  }

  handleGuess = (e) => {
    e.preventDefault();
    const letter = this.state.guessValue
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

    else if (this.state.wordLetters.includes(letter)) {
        // correct guess
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
    else if (!this.state.wordLetters.includes(letter)) {
      console.log(letter, this.state.wordLetters.includes(letter))
      wrongGuesses.push(letter)
      this.setState((prevState, props) => {  //dependent on old state(counter)
        return {
        turns: prevState.turns - 1,
        wrongGuesses,
        guessValue: '',
        repeat: '',
        gameStatus: ''
      }
      })
    }

  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      guessValue: e.target.value
    })
  }

  render() {
    const renderGame = null;

    return (
      <div>
      { this.state.won ? <h1>You won</h1> : <h1>You have {this.state.turns} turns left</h1> }
      <TheWord wordLetters={this.state.wordLetters} correct={this.state.correct} wrongGuesses={this.state.wrongGuesses}/>

          <div className="guess-form">
          <form onSubmit={this.handleGuess}>
            {'Guess a letter'}
            <input type='text'
            maxLength="1"
                    value={this.state.guessValue}
                    onChange={this.handleChange}
            />
            <button type="submit"></button>
            </form>

            <ShowGuesses wrongGuesses={this.state.wrongGuesses}/>
            {this.state.wordLetters.includes(this.state.guessValue) ? 'yes' : 'no'}

          </div>
      </div>
    );
  }

}

export default Game;