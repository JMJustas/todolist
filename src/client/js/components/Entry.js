'use strict';
import React from 'react';

export default class Entry extends React.Component {

  constructor (props) {
    super(props);
    if (!this.props.entry)
      throw new Error('"entry" prop must be passed!');

    this.onClick = this.onClick.bind(this);
  }

  onClick (e) {
    e.preventDefault();
    this.props.onComplete && this.props.onComplete(this.props.entry.id);
  }

  render () {
    const entry = this.props.entry;
    let completeButton = null;
    if (!entry.completed) {
      completeButton = (
        <button className="btn-complete"
                onClick={this.onClick}
        >COMPLETE</button>
      );
    }

    return (
      <div className="entry">
        <span className="entry-title">
          {entry.title}
        </span>

        {completeButton}

      </div>
      );
  }
}
