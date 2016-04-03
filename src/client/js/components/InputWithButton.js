import React from 'react';

export default class InputWithButton extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {value: ''};
  }

  onClick(e) {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
  }

  onInputChange(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  render() {

    return (
      <div className="entry">
        <input type="text"
          placeholder={this.props.placeholder}
          onChange={this.onInputChange}
          value={this.state.value}
        />

        <button className="btn-submit"
                onClick={this.onClick}
          >{this.props.submitTitle}</button>
      </div>
      );
  }
}
