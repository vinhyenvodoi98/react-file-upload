import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Dropzone from "../dropzone/Dropzone";
import Progress from "../progress/Progress";

import "./Upload.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      data: [],
      uri: ""
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.getRes = this.getRes.bind(this);
  }

  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("photo", file, file.name);

      req.open("POST", "http://192.168.43.82:5000/api/ocr");
      req.send(formData);
      this.getRes(formData);
    });
  }

  getRes = (formData) => {
    var data;
    axios({
      method: "post",
      url: "http://192.168.43.82:5000/api/ocr",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(async (response) => {
        //handle success
        data = response.data;
        await this.setState({ data: data, uri: response.img_uri });
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className='ProgressWrapper'>
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className='CheckIcon'
            alt='done'
            src='baseline-check_circle_outline-24px.svg'
            style={{
              opacity: uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <div className='upload-file-button-area'>
          <Link
            className='link'
            to={{
              pathname: "/input",
              state: {
                data: this.state.data,
                uri: this.state.uri
              }
            }}>
            Input
          </Link>
          <button onClick={() => this.setState({ files: [], successfullUploaded: false })}>
            Clear
          </button>
        </div>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}>
          Upload
        </button>
      );
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <div className='Upload'>
        <span className='Title'>Upload Files</span>
        <div className='Content'>
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className='Files'>
            {this.state.files.map((file) => {
              return (
                <div key={file.name} className='Row'>
                  <span className='Filename'>{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className='Actions'>{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;
