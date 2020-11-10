import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { GlobalHotKeys } from 'react-hotkeys'

import { trackEvent } from '../analytics'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from '../routes/home'
import Settings from '../routes/settings'
import Status from '../routes/status'
import Pro from '../routes/pro'

import useStore from '../store'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      search: undefined,
      filteredTimeline: undefined
    }
    this.intervalHandle = undefined
  }

  componentDidMount () {
    const state = useStore.getState()

    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    if (sessionId) {
      console.log('main -> completing payment process with session id', sessionId)
      return state.checkoutSession(sessionId)
        .catch(err => {
          console.error('main -> an error occurred', err)
        })
    }
  
    state.getUserInfo()
    state.getStripeSetup()
    state.loadCachedTimeline()
    state.getUserTimeline()
    this.intervalHandle = setInterval(() => state.getUserTimeline(), 1000 * 60 * 5)
  }
  componentWillUnmount () {
    clearInterval(this.intervalHandle)
  }
  
  keyMap = { 
    EXIT: 'esc',
    SEARCH: 'shift+/',
  }
  handlers = {
    EXIT: () => {
      console.log('EXIT pressed', this)
      this.setState({ search: undefined, filteredTimeline: undefined })
    },
    SEARCH: () => {
      console.log('SEARCH pressed', this)
      this.setState({ search: true })
    }
  }

  performSearch (e, timeline = []) {
    const search = e.target.value.toLowerCase()
    console.log('performSearch', search)
    trackEvent('performed-search')
    this.setState({
      filteredTimeline: timeline
        .filter(t => t.author.toLowerCase().includes(search) || t.text.toLowerCase().includes(search))
    })
  }

  render () {
    if (window.location.hash && window.location.hash.length > 1) return null
    trackEvent('rendered-timeline')
    const state = useStore.getState()
    const user = useStore(state => state.user)
    const timeline = useStore(state => state.timeline)
    const loading = useStore(state => state.loading)
    const loadingTimeline = useStore(state => state.loadingTimeline)
    const icon = useStore(state => state.icon)
    const headerClosed = useStore(state => state.headerClosed)
    return (
      <div class=''>
        <Header user={user} closed={headerClosed} toggle={() => state.toggleHeaderClosed()} loading={loading} icon={icon} />
        <Router>
          <Home path='/' user={user} timeline={this.state.filteredTimeline || timeline} loadingTimeline={loadingTimeline} />
          <Settings path='/settings' user={user} />
          <Pro path='/pro' user={user} />
          <Status path='/status/:id' timeline={timeline} />
        </Router>
        <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers} />
        {this.state.search && 
          <div style='position: fixed; top: 0; left: 0; right: 0; background: white; padding: 3em 2em; box-shadow: 5px 5px 5px #ddd;'>
            <div class="container">
              <div class="row">
                <div class="col-md-9">
                  <div class="input-group m-0">
                  <span class="input-group-text">Search</span>
                    <input autofocus onInput={(e) => this.performSearch(e, timeline)} class="form-control" type="text" placeholder="Type in your search terms" />
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
