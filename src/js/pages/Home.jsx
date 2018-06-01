import React, { Component } from 'react';

import Img from '../../img/react.png';

export default class App extends Component {

  componentDidMount() {
    document.title = "Hi there"
  }
  

  render() {
    return (
      <div className="center">
        <img src={Img} alt=""/>
        <h1>React Js Boilerplate</h1>
        <p>Here is a simple boilerpate for React Js. it is simple to start.</p>
      </div>
    )
  }
}
