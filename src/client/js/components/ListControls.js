/**
 * Holds controls for the todos list
 */
import React from 'react';
import InputWithButton from './InputWithButton';

export default class ListControls extends React.Component {

  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onAddEntry: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      onSubmit: function () {}
    };
  }

  render() {
    return (
      <div className="list-controls">
        <InputWithButton submitTitle="Add" onSubmit={this.props.onAddEntry}/>
      </div>
      );
  }
}
