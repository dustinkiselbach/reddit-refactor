import React, { useReducer } from 'react'
import RedditContext from './redditContext'
import redditReducer from './redditReducer'

import axios from 'axios'

import { GET_POSTS, TEST_TYPE, SET_SUBREDDIT, SET_LOADING } from '../types'
import { Props } from './redditTypes'

// subreddit
// https://www.reddit.com/api/info.json?id={subreddit_id}
// detail
// https://www.reddit.com/{permalink}

const RedditState: React.FC<Props> = ({ children }) => {
  const initialState = {
    loading: false,
    subreddit: null,
    posts: null
  }

  const [state, dispatch] = useReducer(redditReducer, initialState)

  const getPosts = async () => {
    setLoading()
    try {
      const res = await axios.get(
        `https://www.reddit.com/r/${state.subreddit}.json?raw_json=1`
      )

      console.log(res)

      dispatch({ type: GET_POSTS, payload: res.data.data.children })
    } catch (err) {
      throw err
    }
  }

  const setSubreddit = (subreddit: string | null) => {
    dispatch({ type: SET_SUBREDDIT, payload: subreddit })
  }

  const setLoading = () => {
    dispatch({ type: SET_LOADING, payload: null })
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
