import React, { useReducer } from 'react'

import UserContext from './userContext'
import userReducer from './userReducer'
import axios from 'axios'
import {
  GET_USER_TROPHIES,
  GET_USER_ABOUT,
  GET_USERNAME,
  GET_USER_POSTS,
  CLEAR_USER_INFO,
  CHANGE_SORT_USER_CONTENT_BY
} from '../types'

interface Props {
  children: React.ReactNode
}

const UserState: React.FC<Props> = ({ children }) => {
  const initialState = {
    loading: false,
    test: 'test',
    userName: null,
    userData: null,
    userTrophies: null,
    userPosts: [],
    sortUserContentBy: 'new'
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

  const getUserPosts = async (userName: string) => {
    try {
      const res = await axios.get(
        `https://oauth.reddit.com/user/${userName}/overview.json?raw_json=1`
      )

      console.log(res)
      dispatch({ type: GET_USER_POSTS, payload: res.data.data.children })
    } catch (err) {
      throw err
    }
  }

  const getUserName = (userName: string) => {
    dispatch({ type: GET_USERNAME, payload: userName })
  }

  const clearUserInfo = () => {
    dispatch({ type: CLEAR_USER_INFO, payload: null })
  }

  const getUserInfo = (userName: string | null) => {
    // setLoading
    if (userName) {
      getUserName(userName)
      getUserAbout(userName)
      getUserTrophies(userName)
    } else {
      clearUserInfo()
    }
  }

  const changeSortUserContentBy = (sortBy: string) => {
    dispatch({ type: CHANGE_SORT_USER_CONTENT_BY, payload: sortBy })
  }

  return (
    <UserContext.Provider
      value={{
        sortUserContentBy: state.sortUserContentBy,
        userData: state.userData,
        userPosts: state.userPosts,
        userTrophies: state.userTrophies,
        userName: state.userName,
        changeSortUserContentBy,
        getUserInfo,
        getUserPosts
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserState
