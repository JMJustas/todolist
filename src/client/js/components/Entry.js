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
      <li className="entry">
        {completeButton}
        <span className="entry-title">
          {entry.title}
        </span>

      </li>
      );
  }

  renderButton() {
    return (
      <button className="btn-complete btn btn-default " onClick={this.onClick}>
        <span className="fa fa-check"></span>
      </button>
    );
  }

  onClick(e) {
    e.preventDefault();
    this.props.onComplete(this.props.entry.id);
  }

}
