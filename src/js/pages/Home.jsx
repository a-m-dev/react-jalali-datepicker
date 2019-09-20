import React, { Component } from 'react';
import { Link } from 'react-router-dom'


import Img from '../../img/react.png';

export default class App extends Component {

  componentDidMount() {
    document.title = "Hi there"
  }
  
  click = e => {
    console.log({e})
  }
  

  render() {
    return (
      <div className="center">
        <img src={Img} alt="" onClick={this.click}/>
        <h1>React Js Boilerplate</h1>
        <p>Here is a simple  xxxxxxxxxx for React Js. it is simple to start.</p>
        {/* <Link to='/show-routes'>Go To Routes list</Link> */}
      </div>
    )
  }
}
