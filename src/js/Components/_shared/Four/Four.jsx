import React from 'react'
import { AgeContext } from '../../Contexts/AgeContext'

class Four extends React.Component {

  render() {
    return (
      <AgeContext.Consumer>
        {
          (context) => console.log({context}) || (
            <div>
              thsi is Four <br />
              ----------------- <br />
              {context.age} <br />
              ----------------- <br />
            </div>
          )
        }
      </AgeContext.Consumer>
    )
  }
}

export default Four