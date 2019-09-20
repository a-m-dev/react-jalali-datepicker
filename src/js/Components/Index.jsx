import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import Routes from './Routes/Routes'

import Nav from './_shared/Nav/Nav'

import Img from '../../img/react.png';




export default class Index extends Component {

  componentDidMount() {
    document.title = "Hi there"
  }
  
  click = e => {
    console.log({e})
  }
  

  render() {
    return (
      <article>

        <Nav />
        <main>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/routes' exact component={Routes} />
          </Switch>
        </main>
      </article>
    )
  }
}
