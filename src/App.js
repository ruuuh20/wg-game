import React, { Component } from 'react';
import Logo from './components/Logo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
    this.getWords();

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

getWords = async () => {
  const results = await fetch('http://localhost:3000/words');
  const words = await results.text()

    console.log(words.split('\n')[2])  // works
    this.setState({
      word: words.split('\n')[2],

    })
}

startGame = (e) => {
  e.preventDefault()
  this.setState({
    start: true
  })
}

  onInputChange = (event) => {
    console.log(event)
  }

  render() {
    // let renderGame = null;
    // if (this.state.start) {
    //   renderGame =
    // }
    return (
      <div className="App">
      <BrowserRouter>
        <button onClick={this.startGame}>Get word </button>
        {this.state.word}
        <Logo />
        <Route path ='/play' render={props => <Game {...props} word={this.state.word} />}/>
        {this.state.start ? <Game {...this.state} /> : <h1>not started</h1>}
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
