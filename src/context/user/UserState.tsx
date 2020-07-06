import React, { useReducer } from 'react'

import UserContext from './userContext'
import userReducer from './userReducer'
import axios from 'axios'
import { GET_USER_TROPHIES, GET_USER_ABOUT } from '../types'

interface Props {
  children: React.ReactNode
}

const UserState: React.FC<Props> = ({ children }) => {
  const initialState = {
    loading: false,
    test: 'test',
    userData: null,
    userTrophies: null
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const getUserTrophies = async (userName: string) => {
    try {
      const res = await axios.get(
        `https://oauth.reddit.com/api/v1/user/${userName}/trophies`
      )
      console.log(res)
      dispatch({ type: GET_USER_TROPHIES, payload: res.data })
    } catch (err) {
      throw err
    }
  }

  const getUserAbout = async (userName: string) => {
    try {
      const res = await axios.get(
        `https://oauth.reddit.com/user/${userName}/about`
      )
      console.log(res)
      dispatch({ type: GET_USER_ABOUT, payload: res.data })
    } catch (err) {
      throw err
    }
  }

  const getUserInfo = (userName: string) => {
    // setLoading

    getUserAbout(userName)
    getUserTrophies(userName)
  }

  return (
    <UserContext.Provider
      value={{
        userData: state.userData,
        userTrophies: state.userTrophies,
        getUserInfo
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserState
