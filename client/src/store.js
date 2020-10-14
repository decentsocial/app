import * as ApiService from './api-service'

import create from 'zustand'

export default create((set, get) => ({
  loading: false,
  setLoading (loading) { set({ loading }) },
  user: undefined,
  async getUserInfo () {
    set({ loading: true })
    return ApiService.getUserInfo()
      .then(user => set({ user }))
      .catch(err => {
        window.debug && console.error(err.message)
        set({ user: null })
      })
      .finally(() => set({ loading: false }))
  },
  async updateUserSettings ({ twitterHandle, following } = {}) {
    set({ loading: true })
    return ApiService.updateUserSettings({ twitterHandle, following })
      .then(settings => set({ user: { ...get().user, settings } }))
      .catch(err => {
        window.debug && console.error(err.message)
        // set({ user: null })
      })
      .finally(() => set({ loading: false }))
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
    set({ loading: true })
    ApiService.getUserTimeline({ since })
      .then(newTimeline => {
        const timeline = newTimeline.map(t => Object.assign(t, { status: '/status' + t.link.replace(/.*\/status/, '').replace(/#.*/, '') }))
        if (cachedTimeline && cachedTimeline.length > 0) timeline.push(...cachedTimeline)
        const since = timeline.reduce((newest, curr) => newest < +new Date(curr.time) ? +new Date(curr.time) : newest, +new Date(timeline[0].date))
        set({ timeline, since, loading: false })
        window.localStorage.setItem('timeline', JSON.stringify(timeline))
        setTimeout(() => { set({ loading: false }) }, 1500)
      })
      .catch(err => {
        console.error(err)
        set({ timeline: [], loading: false })
      })
  }
}))
