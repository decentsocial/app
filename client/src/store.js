import * as ApiService from './api-service'

const store = {
  user: undefined
}

export default store
export const events = {
  async getUserInfo () {
    return ApiService.getUserInfo()
      .then(user => Object.assign(store, { user }))
      .catch(err => {
        window.debug && console.error(err.message)
        return Object.assign(store, { user: null })
      })
  }
}
