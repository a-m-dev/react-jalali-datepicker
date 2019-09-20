import React from 'react'
import { Link } from 'react-router-dom'



class Routes extends React.Component {


  render() {

    return(
      <article className="routes container box">

        <header>
          <h1>Routes</h1>
        </header>

        <section>
          <Link to='/'>Home</Link>
          <Link to='/routes'>Routes</Link>
        </section>

      </article>
    )
  }
  
}


export default Routes