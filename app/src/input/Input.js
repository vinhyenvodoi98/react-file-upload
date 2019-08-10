import React, { Component } from "react";
import InputLable from "../inputlable/InputLable";
import "./Input.css";
import axios from "axios";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          lable: "Your name",
          field: ""
        },
        {
          lable: "Your permanent address",
          field: ""
        },
        {
          lable: "Your email address",
          field: ""
        },
        {
          lable: "Your mailing address",
          field: ""
        },
        {
          lable: "Your date of birth",
          field: ""
        },
        {
          lable: "Place of birth (country)",
          field: ""
        }
      ]
    };
    this.fieldForm = this.fieldForm.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
  }

  fieldForm = () => {
    axios
      .post("http://localhost:8000/form", {
        data: this.state.data
      })
      .then(function(response) {
        console.log("done ", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onChangeData(value, index) {
    var data = this.state.data;
    data[index].field = value;
    this.setState({ data });
  }

  render() {
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
