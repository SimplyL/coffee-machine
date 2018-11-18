import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import moment from 'moment';
import GotNames from 'game_of_thrones-names';

import Timer from '../../components/timer';
import Engineer from '../../components/engineer';
import ListWrapper from '../../components/list-wrapper';
import { hasTimePassed } from '../../utils/formatters';
import {
  STATUS_WORKING,
  STATUS_WAITING,
  STATUS_MAKING_COFFE,
} from '../../shared/constants';
import {
  DELAY_15_SEC,
  DELAY_1_HOUR,
  TITLE_WROKING,
  TITLE_WAITING,
  TITLE_MAKING_COFFE,
} from './constants';
import './styles.css';

class SimulationRunner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workingEngineers: this.initializeEngineerList(props.settings.numberOfEngineers),
      coffeeQueue: [],
      engineerMakingCoffe: null,
    }
  }

  setInitialEngineer = (modifier) => {
    return {
      name: GotNames.random(),
      id: shortid.generate(),
      shouldBecomeBusy: this.shouldBecomeBusy(this.props.settings.busyChance),
      busy: null,
      status: STATUS_WORKING,
      actionTime: moment().add(DELAY_15_SEC + modifier, 's'),
    }
  }

  initializeEngineerList = (numberOfEngineers) => {
    const engineers = [];

    for (let i = 0; i < numberOfEngineers; i++) {
      engineers.push(this.setInitialEngineer(i));
    };
    return engineers;
  }

  shouldBecomeBusy = percent => percent > (Math.random() * 100);

  handleTick = (currentTime) => {
    const working = this.handleEngineerQueue(currentTime);
    let firstInLine = { ...this.state.engineerMakingCoffe };

    if (this.state.engineerMakingCoffe && hasTimePassed(currentTime, this.state.engineerMakingCoffe.actionTime)) {
      const engineer = { ...this.state.engineerMakingCoffe };
      engineer.actionTime = moment().add(DELAY_1_HOUR, 'h');
      engineer.status = STATUS_WORKING;
      working.push(engineer);
      firstInLine = this.handleFirstInLine();
    }

    if (!this.state.engineerMakingCoffe) {
      firstInLine = this.handleFirstInLine();
    }

    this.setState({
      workingEngineers: working,
      engineerMakingCoffe: firstInLine,
    });
  }

  handleFirstInLine = () => {
    const engineer = this.state.coffeeQueue[0] || null;

    if (engineer) {
      this.removeFirstFromQueue();
      engineer.actionTime = moment().add(DELAY_15_SEC, 's');
      engineer.status = STATUS_MAKING_COFFE;
    }
    return engineer;
  }

  setCoffeeQueue = queue => this.setState({ coffeeQueue: queue });

  removeFirstFromQueue = () => {
    const queue = [...this.state.coffeeQueue];

    queue.shift();
    this.setCoffeeQueue(queue);
  }

  handleEngineerQueue = currentTime => {
    const working = [];
    const queue = [...this.state.coffeeQueue];

    this.state.workingEngineers.forEach((engineer) => {
      engineer.busy = this.setBusyPeriod(currentTime, engineer);

      hasTimePassed(currentTime, engineer.actionTime) ?
        this.prioritizeEngineers(queue, engineer) :
        working.push(engineer)
    });

    return working;
  };

  setBusyPeriod = (currentTime, engineer) => {
    const { actionTime, shouldBecomeBusy, busy } = engineer;
    const becomeBusyTime = actionTime.clone().subtract(10, 'seconds');

    if (busy && hasTimePassed(currentTime, busy)) return null;
    if (shouldBecomeBusy && hasTimePassed(currentTime, becomeBusyTime)) {
      return moment().add(this.props.settings.period, 's');
    }
    return busy;
  }

  prioritizeEngineers = (queue, engineer) => {
    const index = queue.findIndex(({ busy }) => !busy);
    engineer.status = STATUS_WAITING;
    (index !== -1 && engineer.busy) ?
      queue.splice(index, 0, engineer) :
      queue.push(engineer);

    this.setCoffeeQueue(queue);
  };

  renderEngineer = engineer => <Engineer key={engineer.id} {...engineer} />;

  render() {
    return (
      <Fragment>
        <Timer onTick={this.handleTick} />
        <div className="runner-container">
          <ListWrapper title={TITLE_WROKING}>
            {this.state.workingEngineers.map(this.renderEngineer)}
          </ListWrapper>
          <ListWrapper title={TITLE_WAITING}>
            {this.state.coffeeQueue.map(this.renderEngineer)}
          </ListWrapper>
          <ListWrapper title={TITLE_MAKING_COFFE}>
            {!!this.state.engineerMakingCoffe && <Engineer {...this.state.engineerMakingCoffe} />}
          </ListWrapper>
        </div>
      </Fragment>
    );
  }
}

SimulationRunner.propTypes = {
  settings: PropTypes.object.isRequired,
}

export default SimulationRunner;
