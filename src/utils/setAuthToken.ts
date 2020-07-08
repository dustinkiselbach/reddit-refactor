import axios from 'axios'

export const setAuthToken = (token?: string) => {
  if (token) {
    // apply to every request
    console.log(token)

    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
}

axios.interceptors.request.use(
  config => {
    let exp = localStorage.getItem('exp')
    let now = new Date()

    if (exp) {
      if (new Date(exp) < now) {
        console.log('expired')
        localStorage.clear()
        window.location.reload()
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
