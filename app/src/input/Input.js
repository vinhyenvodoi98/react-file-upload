import React, { Component } from "react";
import InputLable from "../inputlable/InputLable";
import "./Input.css";
import axios from "axios";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.state.data
      //   formData: this.props.location.state.formData
    };
    this.fieldForm = this.fieldForm.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
  }

  fieldForm = () => {
    console.log(this.state.data);
    axios
      .post("http://192.168.43.82:5000/api/form", {
        data: this.state.data
      })
      .then((response) => {
        console.log("done ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onChangeData(value, index) {
    var data = this.state.data;
    data[index].field = value;
    this.setState({ data });
    console.log(this.state.data);
  }

  render() {
    console.log(this.state.data);
    return (
      <div className='Input'>
        <div className='InputCard'>
          <p className='Title'>
            <strong>Student's Information</strong>
          </p>
          {this.state.data.map((lable, index) => (
            <InputLable key={index} data={lable} index={index} onChangeData={this.onChangeData} />
          ))}
          <button onClick={this.fieldForm} className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Input;
