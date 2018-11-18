import React, { Component } from 'react';

import SimulationController from '../simulation-controller';
import SimulationRunner from '../simulation-runner';
import './styles.css';

class Simulation extends Component {
  constructor() {
    super();

    this.state = {
      isRunning: false,
      settings: null,
    }
  }

  handleClick = (settings) => {
    this.setState({
      settings,
      isRunning: !this.state.isRunning,
    });
  }

  render() {
    return (
      <div className="simulation-container">
        <SimulationController onClick={this.handleClick} isRunning={this.state.isRunning} />
        {this.state.isRunning && <SimulationRunner settings={this.state.settings} />}
      </div>
    );
  }
}

export default Simulation;
