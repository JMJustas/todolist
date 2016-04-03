import React from 'react';

/**
 * Renders an entry with a "complete" button
 */
export default class Entry extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  static get propTypes() {
    return {
      entry: React.PropTypes.object.isRequired,
      onComplete: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      onComplete: function () {}
    };
  }


  render() {
    const entry = this.props.entry;
    let completeButton = entry.completed ? '' : this.renderButton();

    return (
      <div className="entry">
        <span className="entry-title">
          {entry.title}
        </span>

        {completeButton}
      </div>
      );
  }

  renderButton() {
    return (
      <button className="btn-complete" onClick={this.onClick} >COMPLETE</button>
    );
  }

  onClick(e) {
    e.preventDefault();
    this.props.onComplete(this.props.entry.id);
  }

}
