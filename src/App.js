import React, { Component } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Game from './containers/Game'

import './App.css';


// const api = "http://app.linkedin-reach.io/words"

class App extends Component {
  state = {
    word: '',
    difficulty: 1,
    start: false,
  }

  getWords = async (difficulty) => {
    const results = await fetch(`https://mighty-brushlands-54041.herokuapp.com/words?difficulty=${difficulty}`);
    const words = await results.text()

    console.log(words.split('\n')) // data is array of many words
    const wordsArr = words.split('\n')
    const randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    // console.log(randomWord)
    this.setState({
      word: randomWord
    })
  }

  startGame = (e) => {
    e.preventDefault()
    this.setState({
      start: true,
    })
    this.getWords(this.state.difficulty);
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

    if (this.state.start) {
      renderGame = (
        <div>
          <h3 className="message">
            {" "}
            A secret word has been chosen - let 's play
          </h3>{" "}
          <Link
            onClick={this.closeIntro}
            className="play-link"
            to="/play"
          >
            {" "}
            Play{" "}
          </Link>{" "}
        </div>
      );
    } else {
      renderGame = (
        <div className="right-main">
          <div>Difficulty: </div>
          <input type="range"
              min="1"
              max="18"
              value={this.state.difficulty}
              className="difficulty-slider"
              onChange={this.handleDifficulty}
              />
          <button className="start-game" onClick={this.startGame}>
            {" "}
            Shuffle Words{" "}
          </button>{" "}
          <h2 className="message">
            {" "}
            To play, first select a difficulty level and shuffle for a
            secret word{" "}
          </h2>{" "}
        </div>
      );
    }
    return ( <
      div className = "App" >
      <
      Header start = {
        this.state.start
      }
      difficulty = {
        this.state.difficulty
      }
      /> <
      BrowserRouter >
      <
      Route exact path = '/play'
      render = {
        props => < Game {
          ...props
        }
        word = {
          this.state.word
        }
        reset = {
          this.reset
        }
        />}/ > {
          renderGame
        } <
        /BrowserRouter> <
        /div>
      );
    }
  }

export default App;
