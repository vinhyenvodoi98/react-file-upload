import React, { Component } from "react";
import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='Nav'>
        <div>
          <img
            className='bedrock-logo'
            alt='bedrock'
            src='https://images.squarespace-cdn.com/content/v1/5c7391024d87113b3acf54a7/1551548100849-VXBX1ENI1PK7N8PU8I18/ke17ZwdGBToddI8pDm48kL_1vpEpztQGzjxZLK7P8YoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcOsQxEAt40oHeX5NttAdmFpSMW2BJVHpM9nYsksUzMQZdD2tERkhVBafArauTbsJe/bedrock-logo-trans-bg.png?format=500w'
          />
        </div>
      </div>
    );
  }
}

export default Nav;
