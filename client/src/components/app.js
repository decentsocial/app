import { h, Component } from 'preact'
import { Router } from 'preact-router'

import * as ApiService from '../api-service'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'animate.css/animate.min.css'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Settings from '../routes/settings'
// import Profile from '../routes/profile'

// import Alert from '../components/alert'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      user: undefined,
      timeline: [],
      lastIndex: undefined,
      alert: undefined
    }
  }

  componentDidMount () {
    ApiService.getUserInfo()
      .then(user => {
        this.setState({ user })
      })
      .catch(err => {
        console.error(err.message)
        this.setState({ user: null })
      })

    const lastIndex = +window.localStorage.getItem('lastIndex')
    console.log('local',{lastIndex})
    if (Number.isFinite(lastIndex)) this.setState({ lastIndex })
    let cachedTimeline = window.localStorage.getItem('timeline')
    let since
    if (cachedTimeline && cachedTimeline.length > 0) {
      cachedTimeline = JSON.parse(cachedTimeline)
      since = cachedTimeline.reduce((newest, curr) => newest < +new Date(curr.time) ? +new Date(curr.time) : newest, +new Date(cachedTimeline[0].date))
      this.setState({ timeline: cachedTimeline })
    }

    this.setState({ alert: 'Loading timeline' })

    ApiService.getUserTimeline({ since })
      .then(newTimeline => {
        const timeline = []
        timeline.push(...newTimeline)
        if (cachedTimeline && cachedTimeline.length > 0) timeline.push(...cachedTimeline)
        this.setState({ timeline })
        window.localStorage.setItem('timeline', JSON.stringify(timeline))
        setTimeout(() => { this.setState({ alert: undefined }) }, 3000)
      })
      .catch(err => {
        console.error(err)
        this.setState({ timeline: [] })
      })
  }

  render () {
    if (window.location.hash !== '') return null
    return (
      <div class=''>
        <Header user={this.state.user} />
        <Router>
          <Home path='/' user={this.state.user} timeline={this.state.timeline} lastIndex={this.state.lastIndex} />
          <Settings path='/settings' user={this.state.user} />
        </Router>
        {/* <Alert alert={this.state.alert} /> */}
      </div>
    )
  }
}
