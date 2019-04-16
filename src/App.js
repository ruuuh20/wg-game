import React, { Component } from 'react';
import Logo from './components/Logo';
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
      data: null,
      start: false
    }
  }

  componentDidMount() {
    // this.getWords();

    // fetch('http://localhost:3000')
    // .then(res => res)
    // .then(console.log)
    // const x = this.callBackendAPI()
    // console.log(x)
   // .then(res => this.setState({
   //   data: res.data
   // }))
   // .then(res => console.log(res.data))
   // .catch(err => console.log(err));
  }


//   callBackendAPI = async () => {
//   const response = await fetch('http://localhost:3000/words');
//   const body = await response.text();
//   console.log(body)
//
//   return body;
// };

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
    start: true
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

  render() {
    let renderGame = null;
    // if (this.state.start) {
    //   renderGame =
    // }
    if (this.state.start) {
      renderGame = (

      <Link to='/play'>Play</Link>
    )
  } else {
    renderGame = "hi"
  }
    return (
      <div className="App">
      <BrowserRouter>
      <h2>{this.state.word, this.state.difficulty}</h2>
        <button onClick={this.startGame}>Shuffle Words </button>
        <select value={this.state.difficulty} onChange={this.handleDifficulty}>
          {[...Array(10).keys()].map((n, i) => {
            return (
              <option key={i} value={n}>
                {n}
              </option>
            );
          })}
        </select>

        <Logo />
        <Route path ='/play' render={props => <Game {...props} word={this.state.word} />}/>
        {renderGame}
      </BrowserRouter>
      </div>
    );
  }
}


// {this.state.start ? <Game {...this.state} startGame={this.startGame} /> : <h1>not started</h1>}
export default App;
