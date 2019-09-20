// import React from 'react'
// import { AgeContext } from '../../Contexts/AgeContext'

// class Four extends React.Component {

//   render() {
//     return (
//       <AgeContext.Consumer>
//         {
//           (context) => console.log({context}) || (
//             <div>
//               thsi is Four <br />
//               ----------------- <br />
//               {context.age} <br />
//               ----------------- <br />
//             </div>
//           )
//         }
//       </AgeContext.Consumer>
//     )
//   }
// }

// export default Four


import React , { useContext } from 'react'
import { AgeContext } from '../../Contexts/AgeContext'


function Four() {


  const _ageContext = useContext(AgeContext)

  return(
    <div>
      this is four <br />
      ------------------- <br />
      value of context: {_ageContext.age} <br />
      -------------------
    </div>
  )
}


export default Four