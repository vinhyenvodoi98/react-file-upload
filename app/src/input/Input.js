import React, { Component } from "react";
import { Link } from "react-router-dom";

import InputLable from "../inputlable/InputLable";
import "./Input.css";
import axios from "axios";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.state.data.data,
      isSendDone: false,
      uri: this.props.location.state.data.img_uri,
      uri_result: "",
      download: ""
    };
    this.fieldForm = this.fieldForm.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
  }

  fieldForm = () => {
    console.log(this.state.uri);
    axios
      .post("http://192.168.43.82:5000/api/form", {
        data: this.state.data,
        img_uri: this.state.uri
      })
      .then(async (response) => {
        console.log("done ", response);
        await this.setState({
          isSendDone: true,
          uri_result: response.data.upload,
          download: response.data.download
        });
      })
      .catch((error) => {
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
          <div className='upload-file-button-area'>
            <button onClick={this.fieldForm} className='btn btn-primary'>
              Submit
            </button>
            {this.state.isSendDone ? (
              <Link
                className='image'
                to={{
                  pathname: "/image",
                  state: {
                    uri_result: this.state.uri_result,
                    download: this.state.download
                  }
                }}>
                Show result
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
