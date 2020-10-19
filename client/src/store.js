import * as ApiService from './api-service'

import create from 'zustand'

export default create((set, get) => ({
  loading: false,
  headerClosed: true,
  toggleHeaderClosed () {
    set({ headerClosed: !get().headerClosed })
  },
  icon: undefined,
  setLoading (loading) { set({ loading }) },
  user: undefined,
  async getUserInfo () {
    return ApiService.getUserInfo()
      .then(user => set({ user }))
      .catch(err => {
        window.debug && console.error(err.message)
        set({ user: null })
      })
  },
  async updateUserSettings ({ twitterHandle, following } = {}) {
    set({ loading: true })
    return ApiService.updateUserSettings({ twitterHandle, following })
      .then(settings => {
        set({ user: { ...get().user, settings }, loading: false })
      })
      .catch(err => {
        set({ loading: false })
        window.debug && console.error(err.message)
      })
  },
  timeline: [],
  since: undefined,
  loadCachedTimeline () {
    let cachedTimeline = []
    let since
    const cached = window.localStorage.getItem('timeline')
    if (cached && cached.length > 0) {
      try {
        cachedTimeline = JSON.parse(cached)
        if (Array.isArray(cachedTimeline) && cachedTimeline.length > 0) {
          since = cachedTimeline.reduce((newest, curr) => newest < +new Date(curr.time) ? +new Date(curr.time) : newest, +new Date(cachedTimeline[0].date))
        }
      } catch (err) {
      }
      set({ timeline: cachedTimeline, since })
    }
  },
  async getUserTimeline ({ force = false } = {}) {
    set({ loading: true })
    let since = force ? undefined : get().since
    return ApiService.getUserTimeline({ since })
      .then(timeline => {
        const cachedTimeline = get().timeline
        if (!force) {
          if (cachedTimeline && cachedTimeline.length > 0) timeline.push(...cachedTimeline)
        }
        if (timeline && timeline.length > 0) {
          since = timeline.reduce((newest, curr) => newest < +new Date(curr.time) ? +new Date(curr.time) : newest, +new Date(timeline[0].date))
        }
        set({ timeline, since, loading: false, icon: svgCheck() })
        setTimeout(() => set({ icon: undefined }), 1000)
        window.localStorage.setItem('timeline', JSON.stringify(timeline))
      })
      .catch(err => {
        console.error(err)
        set({ icon: undefined, loading: false })
      })
  }
}))

function svgCheck () {
  return (
    <svg width='24' height='24' viewBox='0 0 16 16' class='bi bi-check2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
      <path fill-rule='evenodd' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
    </svg>
  )
}
