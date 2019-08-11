import React, { Component } from "react";
import "./Image.css";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.location.state.uri_result,
      download: this.props.location.state.download
    };

    this.download = this.download.bind(this);
  }

  onChangeData = (event) => {
    this.props.onChangeData(event.target.value, this.props.index);
  };

  download = () => {
    var url = "http://192.168.43.82:5000" + this.state.download;
    window.open(url, "_blank");
  };

  render() {
    console.log(this.state.download);
    return (
      <div className='Image'>
        <div className='download'>
          <button className='button-down' onClick={this.download}>
            <img
              className='download-button'
              alt='download'
              src='https://media.istockphoto.com/vectors/download-icon-isolated-vector-vector-id844294300?b=1&k=6&m=844294300&s=170x170&h=PJYj3qPn7fw7kD3RJ69J2KCISM949mLClsi78FT_djA='
            />
          </button>
        </div>
        <div className='ImageCard'>
          <img
            className='Image-center'
            alt='img'
            src={"http://192.168.43.82:5000" + this.state.url}
          />
        </div>
      </div>
    );
  }
}

export default Image;
