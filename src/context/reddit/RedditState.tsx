import React, { useReducer } from 'react'
import RedditContext from './redditContext'
import redditReducer from './redditReducer'

import axios from 'axios'

import { GET_POSTS, TEST_TYPE, SET_SUBREDDIT } from '../types'
import { Props } from './redditTypes'

const RedditState: React.FC<Props> = ({ children }) => {
  const initialState = {
    loading: false,
    subreddit: null,
    posts: null
  }

  const [state, dispatch] = useReducer(redditReducer, initialState)

  const getPosts = async () => {
    try {
      const res = await axios.get(
        `http://www.reddit.com/r/${state.subreddit}.json?raw_json=1`
      )

      dispatch({ type: GET_POSTS, payload: res.data.data.children })
    } catch (err) {
      throw err
    }
  }

  const setSubreddit = (subreddit: string | null) => {
    dispatch({ type: SET_SUBREDDIT, payload: subreddit })
  }

  const tryTest = () => {
    dispatch({ type: TEST_TYPE, payload: null })
  }

  return (
    <RedditContext.Provider
      value={{
        subreddit: state.subreddit,
        posts: state.posts,
        loading: state.loading,
        tryTest,
        getPosts,
        setSubreddit
      }}
    >
      {children}
    </RedditContext.Provider>
  )
}

export default RedditState
