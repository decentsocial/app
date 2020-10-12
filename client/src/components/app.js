import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { GlobalHotKeys } from 'react-hotkeys'

import * as ApiService from '../api-service'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'animate.css/animate.min.css'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Settings from '../routes/settings'
// import Profile from '../routes/profile'

import Alert from '../components/alert'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      user: undefined,
      timeline: [],
      lastIndex: undefined,
      alert: undefined,
      search: undefined
    }
  }

  componentDidMount () {
    ApiService.getUserInfo()
      .then(user => {
        this.setState({ user })
      })
      .catch(err => {
        window.debug && console.error(err.message)
        this.setState({ user: null })
      })

    const lastIndex = +window.localStorage.getItem('lastIndex')
    if (Number.isFinite(lastIndex)) this.setState({ lastIndex })
    let cachedTimeline = window.localStorage.getItem('timeline')
    let since
    if (cachedTimeline && cachedTimeline.length > 0) {
      cachedTimeline = JSON.parse(cachedTimeline)
      since = cachedTimeline.reduce((newest, curr) => newest < +new Date(curr.time) ? +new Date(curr.time) : newest, +new Date(cachedTimeline[0].date))
      this.setState({ timeline: cachedTimeline })
    }

    this.setState({ alert: 'Loading updates..' })

    ApiService.getUserTimeline({ since })
      .then(newTimeline => {
        const timeline = newTimeline
        if (cachedTimeline && cachedTimeline.length > 0) timeline.push(...cachedTimeline)
        this.setState({ timeline, alert: "You're up to date." })
        window.localStorage.setItem('timeline', JSON.stringify(timeline))
        cachedTimeline = timeline
        setTimeout(() => { this.setState({ alert: undefined }) }, 1500)
      })
      .catch(err => {
        console.error(err)
        this.setState({ timeline: [], alert: undefined })
      })
  }
  keyMap = { 
    SEARCH: 'alt+s'
  }
  handlers = {
    SEARCH: () => {
      console.log('SEARCH pressed', this)
      this.setState({ search: true })
    }
  }

  performSearch (e) {
    const search = e.target.value.toLowerCase()
    console.log('performSearch', search)
    this.setState({
      filteredTimeline: this.state.timeline
        .filter(t => t.author.toLowerCase().includes(search) || t.text.toLowerCase().includes(search))
    })
  }

  render () {
    if (window.location.hash) return null
    return (
      <div class=''>
        <Header user={this.state.user} />
        <Router>
          <Home path='/' user={this.state.user} timeline={this.state.filteredTimeline || this.state.timeline} lastIndex={this.state.lastIndex} />
          <Settings path='/settings' user={this.state.user} />
        </Router>
        <Alert alert={this.state.alert} />
        <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers} />
        {this.state.search && 
          <div style='position: fixed; top: 0; left: 0; right: 0; background: lightgrey; padding: 3em 2em;'>
            <div class="container">
              <div class="row">
                <div class="col-md-9">
                  <div class="input-group m-0">
                  <span class="input-group-text">Search</span>
                    <input autoFocus={true} onInput={(e) => this.performSearch(e)} class="form-control" type="text" placeholder="Type in your search terms" />
                  </div>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-md" onClick={() => this.setState({search: false, filteredTimeline: undefined})}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
