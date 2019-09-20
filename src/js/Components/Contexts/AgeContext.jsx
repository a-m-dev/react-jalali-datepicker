import React from 'react'



export const AgeContext = React.createContext()


class AgeProvider extends React.Component {

  state = {
    age: 50
  }

  render() {


    const _context = {
      age: this.state.age,
      // setAge: this.setState(prevState => ({ age: prevState.age + 10 }))
    }

    return(
      <AgeContext.Provider value={_context}>
        {this.props.children}
      </AgeContext.Provider>
    )
  }
}

export default AgeProvider