import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Upload from "./upload/Upload";
import Input from "./input/Input";
import Image from "./image/Image";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <div className='App'>
              {/* <Nav /> */}
              <div className='Card'>
                <Upload />
              </div>
            </div>
          </Route>
          <Route path='/input' component={Input} />
          <Route path='/image' component={Image} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
