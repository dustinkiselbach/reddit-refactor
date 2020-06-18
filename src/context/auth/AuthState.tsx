import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AuthContext from './authContext'
import authReducer from './authReducer'

import { TEST_TYPE } from '../types'
import { Props, State } from './authTypes'

// const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&state=12345678&redirect_uri=http://localhost:3000&scope=identity`
const AuthState: React.FC<Props> = ({ children }) => {
  const initialState: State = {
    test: 'test',
    stateToken: uuidv4()
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const tryTest = () => {
    dispatch({ type: TEST_TYPE })
  }

  // const aquireAuthToken = async () => {
  //   try {
  //   } catch (err) {}
  // }

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
