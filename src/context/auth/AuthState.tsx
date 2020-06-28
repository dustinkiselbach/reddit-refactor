import React, { useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AuthContext from './authContext'
import authReducer from './authReducer'

import { TEST_TYPE } from '../types'
import { Props, State } from './authTypes'
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import moment from 'moment'
import { setAuthToken } from '../../utils/setAuthToken'

// const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&state=12345678&redirect_uri=http://localhost:3000&scope=identity`
const AuthState: React.FC<Props> = ({ children }) => {
  const initialState: State = {
    test: 'test',
    stateToken: uuidv4()
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    console.log('rolllling')
    if (localStorage.getItem('token')) {
      setAuthToken(`bearer ${localStorage.getItem('token')}`)

      const currentTime = moment()

      if (moment(localStorage.getItem('exp')) < currentTime) {
        localStorage.clear()
        applicationOnlyAuth()
      }
    } else {
      applicationOnlyAuth()
    }
  })

  const tryTest = () => {
    dispatch({ type: TEST_TYPE })
  }

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
      console.log(res.data)

      const exp = moment().add(res.data.expires_in, 's')

      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('exp', exp.toString())

      setAuthToken(`bearer ${res.data.access_token}`)
    } catch (err) {
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        test: state.test,
        tryTest
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
