import React from 'react';

/**
 * Generic text input with submit button
 */
export default class InputWithButton extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {value: ''};
  }

  static get propTypes() {
    return {
      submitTitle: React.PropTypes.string,
      onSubmit: React.PropTypes.func,
      placeholder: React.PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      onSubmit: function () {},
      submitTitle: 'Submit',
      placeholder: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  onInputChange(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  render() {

    return (
      <div className="input-group">
        {this.renderInput()}
        <span className="input-group-btn">
          {this.renderButton()}
        </span>
      </div>
      );
  }

  renderInput() {
    return (
      <input className="form-control"
             type="text"
             placeholder={this.props.placeholder}
             onChange={this.onInputChange}
             value={this.state.value}
      />
    );
  }

  renderButton() {
    return (
      <button className="btn-submit btn btn-secondary"
              onClick={this.onSubmit}
      >{this.props.submitTitle}</button>
    );
  }
}
