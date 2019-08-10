import React, { Component } from "react";
import "./InputLable.css";

class InputLable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeData = (event) => {
    // console.log(event.target.value);
    this.props.onChangeData(event.target.value, this.props.index);
  };

  render() {
    console.log(this.props.data.field);
    return (
      <div className='InputLable'>
        <p>
          <strong>{this.props.data.lable}</strong>
        </p>
        <input
          type='text'
          className='form-control'
          id='exampleInputEmail1'
          onChange={this.onChangeData}
          placeholder={"Enter" + this.props.data.lable}
        />
      </div>
    );
  }
}

export default InputLable;
