import { h, Component } from 'preact'
import { Router } from 'preact-router'

import * as ApiService from '../api-service'
import Header from './header'
import style from './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Settings from '../routes/settings'
// import Profile from '../routes/profile'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      user: undefined
    }
  }

  componentDidMount () {
    ApiService.getUserInfo()
      .then(user => {
        console.log('user', user)
        this.setState({ user })
      })
      .catch(err => {
        console.error(err.message)
        this.setState({ user: null })
      })
  }

  render () {
    if (window.location.hash !== '') return null
    return (
      <div id={style.app} class=''>
        <Header user={this.state.user} />
        <Router>
          <Home path='/' user={this.state.user} />
          <Settings path='/settings' user={this.state.user} />
        </Router>
      </div>
    )
  }
}
