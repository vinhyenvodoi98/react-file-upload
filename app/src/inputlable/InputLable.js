import React, { Component } from "react";
import "./InputLable.css";

class InputLable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeData = (event) => {
    this.props.onChangeData(event.target.value, this.props.index);
  };

  render() {
    return (
      <div className='InputLable'>
        <p>
          <strong>{this.props.data.label}</strong>
        </p>
        <input
          type='text'
          className='form-control'
          onChange={this.onChangeData}
          placeholder={"Enter " + this.props.data.label}
        />
      </div>
    );
  }
}

export default InputLable;
