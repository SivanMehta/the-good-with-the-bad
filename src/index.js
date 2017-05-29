import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { browserHistory } from 'react-router'

import configureStore from './configure-redux/configure-store'
import {Provider} from 'react-redux'
const store = configureStore()

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      issue: 'lol'
    }

    this.search = this.search.bind(this)
  }


  search(e) {
    this.setState({issue: e.target.value})
  }

  render() {
    return(
      <Router history={browserHistory}>
        <div>
          <h2>The Good with the Bad</h2>
          <p>Search for an issue:</p>
          <input ref = 'issue' onChange = { this.search }></input>
          <Link to={ "/" + this.state.issue }>Go</Link>

          <Route path="/:id" component={Child}/>
        </div>
      </Router>
    )
  }
}

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
