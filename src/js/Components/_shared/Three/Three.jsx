import React from 'react'

import { AgeContext } from '../../Contexts/AgeContext'
import Four from '../Four/Four'

class Three extends React.Component {

  static contextType = AgeContext

  state = {
    name: 'Tom Hardy'
  }

  componentDidMount() {
    const _val = this.context 
    const { name } = this.state


    console.log({
      valFromThree: _val,
      name
    })
  }



  render() {
    return (
      <div>
        >>>>

        <AgeContext.Consumer>
          { context => (
            <sup><b>{context.age}</b></sup>
          )}
        </AgeContext.Consumer>

        <hr />
        four inside three: <Four />
      </div>
    )
  }
}

// Three.contextType = AgeContext

export default Three


