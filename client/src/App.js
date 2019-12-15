import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './tower-3416601_1280.png';
import './App.css';
import LinkStationFinder from './LinkStationFinder';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h4 className="App-title">Link-Station-Finder</h4>
            <p className="App-text">
              Find most suitable Link Station for your device!
            </p>
          </header>
          <div className="App-body">
            <Route exact path="/" component={LinkStationFinder} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
