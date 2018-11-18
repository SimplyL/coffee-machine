import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../../components/input';
import {
  LABEL_ENGINEER_NUMBER,
  LABEL_CHANCE,
  LABEL_BUSY_PERIOD,
  BUTTON_TEXT_START,
  BUTTON_TEXT_STOP,
} from './constants';
import './styles.css';

class SimulationController extends Component {
  constructor(props) {
    super();

    this.state = {
      numberOfEngineers: '',
      busyChance: '',
      period: '',
    }
  }

  handleEngineersChange = value => this.setState({ numberOfEngineers: value });

  handleBusyChanceChange = value => this.setState({ busyChance: value });

  handleBusyPeriodChange = value => this.setState({ period: value });

  handleClick = () => this.props.onClick(this.state);

  render() {
    return (
      <div className={classnames('controller-container', 'container-border')}>
        <Input
          type="number"
          label={LABEL_ENGINEER_NUMBER}
          value={this.state.numberOfEngineers}
          onChange={this.handleEngineersChange}
        />
        <Input
          type="number"
          label={LABEL_CHANCE}
          value={this.state.busyChance}
          onChange={this.handleBusyChanceChange}
        />
        <Input
          type="number"
          label={LABEL_BUSY_PERIOD}
          value={this.state.period}
          onChange={this.handleBusyPeriodChange}
        />
        {this.props.isRunning ?
          <button className={classnames("button", "stop-button")} onClick={this.handleClick}>
            {BUTTON_TEXT_STOP}
          </button> :
          <button className={classnames("button", "start-button")} onClick={this.handleClick}>
            {BUTTON_TEXT_START}
          </button>
        }
      </div >
    );
  }
}

SimulationController.propTypes = {
  isRunning: PropTypes.bool.isRequired,
};

export default SimulationController;
