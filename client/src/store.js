import * as ApiService from './api-service'

import create from 'zustand'

export default create((set, get) => ({
  alert: undefined,
  user: undefined,
  async getUserInfo () {
    return ApiService.getUserInfo()
      .then(user => set({ user }))
      .catch(err => {
        window.debug && console.error(err.message)
        set({ user: null })
      })
  },
  timeline: [],
  since: undefined,
  loadCachedTimeline () {
    let cachedTimeline = window.localStorage.getItem('timeline')
    if (cachedTimeline && cachedTimeline.length > 0) {
      cachedTimeline = JSON.parse(cachedTimeline)
      const since = cachedTimeline.reduce((newest, curr) => newest < +new Date(curr.time) ? +new Date(curr.time) : newest, +new Date(cachedTimeline[0].date))
      set({ timeline: cachedTimeline, since })
    }
  },
  async getUserTimeline () {
    const since = get().since
    const cachedTimeline = get().timeline
    set({ alert: 'Loading updates..' })
    ApiService.getUserTimeline({ since })
      .then(newTimeline => {
        const timeline = newTimeline
        if (cachedTimeline && cachedTimeline.length > 0) timeline.push(...cachedTimeline)
        const since = timeline.reduce((newest, curr) => newest < +new Date(curr.time) ? +new Date(curr.time) : newest, +new Date(timeline[0].date))
        set({ timeline, since, alert: "You're up to date." })
        window.localStorage.setItem('timeline', JSON.stringify(timeline))
        setTimeout(() => { set({ alert: undefined }) }, 1500)
      })
      .catch(err => {
        console.error(err)
        set({ timeline: [], alert: undefined })
      })
  }
}))
