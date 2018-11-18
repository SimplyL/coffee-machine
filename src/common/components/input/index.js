import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Input extends Component {
  handleChange = evt => this.props.onChange(evt.target.value);

  render() {
    return (
      <div className="input-container">
        <div>{this.props.label}</div>
        <input
          className="input-field"
          {...this.props}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input;
