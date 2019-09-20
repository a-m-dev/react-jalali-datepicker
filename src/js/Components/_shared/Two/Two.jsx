import React from 'react'

import Three from '../Three/Three'

class Two extends React.Component {

  render() {
    return (
      <div>
        thsi is Two


        <hr />
        three inside two: <Three />
      </div>
    )
  }
}

export default Two