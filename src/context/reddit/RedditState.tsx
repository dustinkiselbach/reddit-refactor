import React, { useEffect, useReducer, useCallback } from 'react'
import RedditContext from './redditContext'
import redditReducer from './redditReducer'

import axios from 'axios'

import {
  GET_POSTS,
  TEST_TYPE,
  SET_SUBREDDIT,
  GET_DEFAULT_SUBREDDITS,
  SET_LOADING,
  CHANGE_SORT_BY
} from '../types'
import { Props } from './redditTypes'
import { defaultSubredditsParser } from '../../utils/defaultSubredditsParser'

// subreddit
// https://www.reddit.com/api/info.json?id={subreddit_id}
// detail
// https://www.reddit.com/{permalink}
// defaults
// https://www.reddit.com/subreddits/default.json

const RedditState: React.FC<Props> = ({ children }) => {
  const initialState = {
    loading: false,
    subreddit: null,
    defaultSubreddits: null,
    sortBy: 'hot',
    posts: null
  }

  const [state, dispatch] = useReducer(redditReducer, initialState)

  useEffect(() => {
    getDefaultSubreddits()
  }, [])

  useEffect(() => {
    getPosts()
  }, [state.sortBy])

  const getPosts = async () => {
    setLoading()
    try {
      const res = await axios.get(
        `https://www.reddit.com/r/${state.subreddit}/${state.sortBy}.json?raw_json=1`
      )

      dispatch({
        type: GET_POSTS,
        payload: res.data.data.children
      })
    } catch (err) {
      throw err
    }
  }

  const getDefaultSubreddits = async () => {
    try {
      const res = await axios.get(
        'https://www.reddit.com/subreddits/default.json'
      )

      console.log(res)

      dispatch({
        type: GET_DEFAULT_SUBREDDITS,
        payload: defaultSubredditsParser(res.data.data.children)
      })
    } catch (err) {
      throw err
    }
  }

  // const searchSubreddits = async () => {
  //   console.log('ran')
  //   try {
  //     const res = await axios.get(
  //       'https://www.reddit.com/subreddits/search.json?q=gonewild&include_over_18=on'
  //     )

  //     console.log(res)
  //   } catch (err) {
  //     throw err
  //   }
  // }

  const setSubreddit = (subreddit: string | null) => {
    dispatch({ type: SET_SUBREDDIT, payload: subreddit })
  }

  const setLoading = () => {
    dispatch({ type: SET_LOADING, payload: null })
  }

  const changeSortBy = (sortBy: string) => {
    dispatch({ type: CHANGE_SORT_BY, payload: sortBy })
  }

  const tryTest = () => {
    dispatch({ type: TEST_TYPE, payload: null })
  }

  return (
    <RedditContext.Provider
      value={{
        subreddit: state.subreddit,
        defaultSubreddits: state.defaultSubreddits,
        posts: state.posts,
        sortBy: state.sortBy,
        loading: state.loading,
        tryTest,
        getPosts,
        setSubreddit,
        changeSortBy
      }}
    >
      {children}
    </RedditContext.Provider>
  )
}

export default RedditState
