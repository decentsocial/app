import * as ApiService from './api-service'

import create from 'zustand'

export default create(set => ({
  user: undefined,
  async getUserInfo () {
    return ApiService.getUserInfo()
      .then(user => set({ user }))
      .catch(err => {
        window.debug && console.error(err.message)
        set({ user: null })
      })
  }
}))
