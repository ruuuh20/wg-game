import React, { Component } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Game from './containers/Game'

import './App.css';

const api = "http://app.linkedin-reach.io/words"

class App extends Component {
  constructor() {
    super();
    this.state = {
      word: '',
      difficulty: 1,
      start: false,

    }
  }


getWords = async (difficulty) => {
  // const diff = this.state.difficulty
  const results = await fetch(`http://localhost:3000/words?difficulty=${difficulty}`);
  const words = await results.text()

    console.log(words.split('\n'))  // works - data is array of many words
    const wordsArr = words.split('\n')
    const randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    console.log(randomWord)
    this.setState({
      word: randomWord

    })
}

startGame = (e) => {
  e.preventDefault()
  this.setState({
    start: true,
    intro: false
  })
  this.getWords(this.state.difficulty);
}

  onInputChange = (event) => {
    console.log(event)
  }

  handleDifficulty = (e) => {
    this.setState({
      difficulty: e.target.value
    })
  }

  reset = () => {
    this.setState({
      word: '',
      difficulty: 1,
      start: false
    })
  }

  render() {
    let renderGame = null;
    // if (this.state.start) {
    //   renderGame =
    // }
    if (this.state.start) {
      renderGame = (
        <div><h3 className="message">A secret word has been chosen - let's play</h3>
              <Link className='play-link' to='/play'>Play</Link>
        </div>

    )
  }
  else {
    renderGame = (
      <div className='right-main'>
      <div className="select">Choose difficulty:
        <select value={this.state.difficulty} onChange={this.handleDifficulty}>
          {[...Array(10).keys()].map((n, i) => {
            return (
              <option key={i} value={n}>
                {n}
              </option>
            );
          })}
        </select>
      </div>
        <button className='start-game' onClick={this.startGame}>Shuffle Words</button>
        <h2 className='message'>Choose a difficulty level and shuffle to choose a word</h2>
      </div>
    )
  }
    return (
      <div className="App">
              <Header start={this.state.start} difficulty={this.state.difficulty}/>
      <BrowserRouter>
        <Route exact path ='/play' render={props => <Game {...props} word={this.state.word} reset={this.reset} />}/>
        {renderGame}
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
