import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Upload from "./upload/Upload";
import Input from "./input/Input";
// import Nav from "./nav/Nav";

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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
