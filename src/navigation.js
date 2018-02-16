import React from 'react'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton';

import { Link } from 'react-router-dom'
// import { AuthButton } from './auth/components'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      target: '',
      dataSource: []
    }

    this.getValidationState = this.getValidationState.bind(this)
    this.updateLink = this.updateLink.bind(this)
  }

  updateLink(e) {
    this.setState({target: e.target.value})
  }

  getValidationState() {
    const length = this.state.target.length
    return this.length > 0 ? 'success' : null
  }

  renderTitle() {
    return(
      <span>
        <Link to = '/'>The Good with the Bad</Link>
        <AutoComplete
            hintText="Look for a point"
            dataSource={ [] }
          />
        <IconButton iconClassName="muidocs-icon-custom-github" />
      </span>
    )
  }

  render() {
    return (
      <AppBar title = { this.renderTitle() }
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />)
  }
}

//   render2() {
//     return(
//       <Navbar>
//         <Navbar.Header>
//           <Navbar.Brand>
//             <Link to = '/'>The Good with the Bad</Link>
//           </Navbar.Brand>
//         </Navbar.Header>
//         <Navbar.Collapse>
//           <Nav>
//             <Navbar.Form>
//               <form onSubmit = {e => e.preventDefault()}>
//                 <FormGroup validationState={this.getValidationState()}>
//                   <FormControl
//                   type="text"
//                   value={this.state.target}
//                   placeholder=""
//                   onChange={this.updateLink} />
//
//                 </FormGroup>
//                 {' '}
//                 <Link to = { '/argument/' + this.state.target }>
//                   <Button type = 'submit'>
//                     Search
//                   </Button>
//                 </Link>
//               </form>
//             </Navbar.Form>
//           </Nav>
//           <Nav pullRight>
//             <AuthButton />
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     )
//   }
// }
