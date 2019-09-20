import React from 'react'

import AgeContext from '../Contexts/AgeContext'
import One from '../_shared/One/One'



class CONTXT extends React.Component {


  render() {
    return(
      <article className="container box">

        this is main: 
        <hr />
        <AgeContext>
          Initiate: <One />
        </AgeContext>
      </article>
    )
  }
}

export default CONTXT