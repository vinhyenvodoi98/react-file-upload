import React, { Component } from "react";
import "./Image.css";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.location.state.url
    };
  }

  onChangeData = (event) => {
    this.props.onChangeData(event.target.value, this.props.index);
  };

  render() {
    return (
      <div className='Image'>
        <div className='ImageCard'>
          <img className='Image-center' alt='img' src={this.state.url} />
        </div>
      </div>
    );
  }
}

export default Image;
