import React, { Component } from "react";
import "./Image.css";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: this.props.location.state.uri
    };
  }

  onChangeData = (event) => {
    this.props.onChangeData(event.target.value, this.props.index);
  };

  render() {
    return (
      <div className='Image'>
        <div className='ImageCard'>
          <img alt='img' src={this.state.uri} />
        </div>
      </div>
    );
  }
}

export default Image;
