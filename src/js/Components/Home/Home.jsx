import React, { Component } from "react";

import Img from "../../../img/react.png";

export default class Home extends Component {
  render() {
    return (
      <article className="center">
        <img src={Img} alt="" onClick={this.click} />
        <h1>React Js Lite</h1>
        <p>Here is a simple boilerplate for React Js.</p>
        <p className="publisher">
          Publisher:
          <a href="https://github.com/a-m-dev" target="_blacnk">
            @a-m-dev
          </a>
        </p>
      </article>
    );
  }
}
