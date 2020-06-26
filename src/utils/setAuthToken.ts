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
