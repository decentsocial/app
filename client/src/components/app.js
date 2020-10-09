import { h, Component } from 'preact'
import { Router } from 'preact-router'

import * as ApiService from '../api-service'
import Header from './header'
import style from './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'animate.css/animate.min.css'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Settings from '../routes/settings'
// import Profile from '../routes/profile'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      user: undefined,
      timeline: []
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
    ApiService.getUserTimeline()
      .then(newTimeline => {
        console.log('newTimeline', newTimeline)
        this.setState({ timeline: newTimeline })
      })
      .catch(err => {
        console.error(err)
        this.setState({ timeline: [] })
      })
  }

  render () {
    if (window.location.hash !== '') return null
    return (
      <div id={style.app} class=''>
        <Header user={this.state.user} />
        <Router>
          <Home path='/' user={this.state.user} timeline={this.state.timeline} />
          <Settings path='/settings' user={this.state.user} />
        </Router>
      </div>
    )
  }
}
