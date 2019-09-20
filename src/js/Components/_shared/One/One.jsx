import React from 'react'

import Two from '../Two/Two'


class One extends React.Component {

  render() {
    return (
      <div>
        thsi is one


        <hr />
        Two inside one: <Two />
      </div>
    )
  }
}

export default One