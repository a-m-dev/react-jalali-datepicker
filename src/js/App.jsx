import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'


import '../sass/app.scss'

import Index from './Components/Index'


ReactDOM.render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>,
  document.getElementById('app')
);