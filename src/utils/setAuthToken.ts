import axios, { AxiosRequestConfig } from 'axios'
import moment from 'moment'
import qs from 'qs'

export const setAuthToken = (token?: string) => {
  if (token) {
    // apply to every request

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
        return applicationOnlyAuth().then((token: string) => {
          setAuthToken(token)
          return Promise.resolve(config)
        })
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

const applicationOnlyAuth = async () => {
  const body = {
    grant_type: 'client_credentials'
  }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: process.env.REACT_APP_CLIENT_ID!,
      password: process.env.REACT_APP_SECRET_KEY!
    }
  }

  try {
    const res = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      qs.stringify(body),
      config
    )

    const exp = moment().add(res.data.expires_in, 's')

    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('exp', exp.toString())

    return res.data.access_token
  } catch (err) {
    throw err
  }
}
