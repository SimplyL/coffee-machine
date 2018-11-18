import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.css';

const ListWrapper = (props) => (
  <div className={classnames('engineer-list-container', 'container-border')}>
    <h3>{props.title}</h3>
    {props.children}
  </div>
);

ListWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default ListWrapper;
