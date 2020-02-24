import React from 'react'
import { NavLink } from 'react-router-dom'


class Nav extends React.Component {

  render() {

    return(
      <nav className="nav">
        <NavLink 
          to='/' 
          exact 
          className='nav__link'
          activeStyle={{ fontWeight: 'bold' }}>
            Home
        </NavLink>
        
        <span className="nav__seperator">||</span>
        
        <NavLink 
          to='/routes' 
          className='nav__link'
          activeStyle={{ fontWeight: 'bold' }}>
            Routes
        </NavLink>
        
        <span className="nav__seperator">||</span>
        
        <NavLink 
          to='/context' 
          className='nav__link'
          activeStyle={{ fontWeight: 'bold' }}>
            Context
        </NavLink>
      </nav>
    )
  }
}


export default Nav