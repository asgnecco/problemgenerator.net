import React, { Component } from 'react';
import './App.css';
import Heading from './components/heading/heading.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading title="ProblemGenerator.net" pageTitle="Antiderivatives"/>
      </div>
    );
  }
}

export default App;