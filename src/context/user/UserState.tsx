import React, { useReducer } from 'react'

import UserContext from './userContext'
import userReducer from './userReducer'
import axios from 'axios'

interface Props {
  children: React.ReactNode
}

const UserState: React.FC<Props> = ({ children }) => {
  const initialState = {
    test: 'test'
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const getUserTrophies = async (userName: string) => {
    try {
      const res = await axios.get(
        `https://oauth.reddit.com/api/v1/user/${userName}/trophies`
      )
      console.log(res)
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
    } catch (err) {
      throw err
    }
  }

  return (
    <UserContext.Provider
      value={{
        getUserAbout,
        getUserTrophies,
        test: state.test
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserState
