import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import { getAccessToken } from '../auth-service'
// import Profile from '../routes/profile'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      user: undefined
    }
  }

  componentDidMount () {
    window.fetch('/user/info', {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    })
      .then(res => res.json())
      .then(user => {
        console.log('user', user)
        this.setState({ user })
      })
  }

  render () {
    return (
      <div id='app'>
        <Header user={this.state.user} />
        <Router>
          <Home path='/' user={this.state.user} />
        </Router>
      </div>
    )
  }
}
