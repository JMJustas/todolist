'use strict';
import React from 'react';

import Entry from './Entry';

export default class EntriesList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {entries: props.entries}
  }

  render () {

    const entries = this.state.entries || [];
    const entryComponents = entries
      .filter((entry) => !entry.completed)
      .map((entry) => {
        return <Entry key={entry.id} entry={entry} onComplete={this.props.onComplete}/>
      });

    return (
      <div className="entries-list">
        {entryComponents}
      </div>
      );
  }
}
