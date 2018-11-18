import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './styles.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      this.tick,
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick = () => {
    this.setState({
      time: moment(),
    }, this.props.onTick(this.state.time));
  };

  render() {
    return (
      <div className="timer-container">{this.state.time.format('LTS')}</div>
    );
  }
}

Timer.propTypes = {
  onTick: PropTypes.func.isRequired,
}

export default Timer;
