import React, { Component } from 'react';
import Simulation from './common/containers/simulation';
import './styles/global-styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Simulation />
      </div>
    );
  }
}

export default App;
