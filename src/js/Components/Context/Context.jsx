import React from 'react'

import AgeProvider from '../Contexts/AgeContext'
import One from '../_shared/One/One'



class CONTXT extends React.Component {


  render() {
    return(
      <article className="container box">

        this is main: 
        <hr />
        <AgeProvider>
          Initiate: <One />
        </AgeProvider>
      </article>
    )
  }
}

export default CONTXT