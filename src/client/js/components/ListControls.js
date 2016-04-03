/**
 * Holds controls for the todos list
 */
'use strict';

import React from 'react';
import InputWithButton from './InputWithButton';

export default class ListControls extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-controls">
        <InputWithButton submitTitle="Add" onSubmit={this.props.onAddEntry}/>
      </div>
      );
  }
}
