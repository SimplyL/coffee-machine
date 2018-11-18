import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  STATUS_WORKING,
  STATUS_WAITING,
  STATUS_MAKING_COFFE,
} from '../../shared/constants';
import {
  MESSAGE_WAITING,
  MESSAGE_WORKING,
  MESSAGE_MAKING_COFFE,
  MESSAGE_BUSY,
} from './constants';

import { formatTime } from '../../utils/formatters';
import './styles.css';

class Engineer extends Component {
  renderStatus = (status, actionTime) => (
    <div>
      {status === STATUS_WORKING && `${MESSAGE_WORKING} ${formatTime(actionTime)}`}
      {status === STATUS_MAKING_COFFE && `${MESSAGE_MAKING_COFFE} ${formatTime(actionTime)}`}
      {status === STATUS_WAITING && MESSAGE_WAITING}
    </div>
  );

  render() {
    const { name, actionTime, busy, status } = this.props;

    return (
      <div className={classnames('engineer-container', 'container-border')}>
        <div>{name}</div>
        {busy && <div className="status">{MESSAGE_BUSY}</div>}
        {this.renderStatus(status, actionTime)}
      </div>
    );
  }
}

Engineer.defaultProps = {
  busy: null,
}

Engineer.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  busy: PropTypes.object,
  actionTime: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
}

export default Engineer;
