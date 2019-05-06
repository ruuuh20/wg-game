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
    console.log("fetching")

    console.log(words.split('\n')) // data is array of many words
    const wordsArr = words.split('\n')
    const randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    // console.log(randomWord)
    this.setState({
      word: randomWord
    })
  }

  startGame = (e) => {
    // e.preventDefault()
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
    
    return (
      <div className="App">
        <Header
          start={this.state.start}
          difficulty={this.state.difficulty}
        />{" "}
        <BrowserRouter>
        <Route exact path="/" render={() => {
          return (
            <div className="right-main">
              <div className="choose-difficulty">Difficulty: </div>
              <input
                type="range"
                min="1"
                max="10"
                value={this.state.difficulty}
                className="difficulty-slider"
                onChange={this.handleDifficulty}
              />
              <Link
                onClick={this.startGame}
                className="play-link"
                to="/play"
              >
                
                Play
              </Link>
            </div>
          );
        }} />
          <Route exact path="/play" render={props => (
            this.state.word == '' ? "loading" : 
              <Game {...props} word={this.state.word} reset={this.reset} />
            )}
          />
        
        </BrowserRouter>
      </div>
    );
    }
  }

export default App;
