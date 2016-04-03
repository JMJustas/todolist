
import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      heading: React.PropTypes.string.isRequired
    };
  }

  render() {
    return (
     <header className="container">
       {this.props.heading}
     </header>
    );
  }
}
