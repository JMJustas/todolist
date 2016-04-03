import React from 'react';

import Entry from './Entry';

/**
 * Takes care of rendering List of todos. Filters out completed todos
 */
export default class EntriesList extends React.Component {

  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      entries: React.PropTypes.array,
      onComplete: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      entries: []
    };
  }

  render() {

    const entries = this.props.entries;
    const entryComponents = entries
      .filter((entry) => !entry.completed)
      .map((entry) => {
        return <Entry key={entry.id}
                      entry={entry}
                      onComplete={this.props.onComplete}
               />;
      });

    return (
      <ul className="entries-list">
        {entryComponents}
      </ul>
      );
  }
}
