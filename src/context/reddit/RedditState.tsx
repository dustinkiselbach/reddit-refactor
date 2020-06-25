import React, { useEffect, useReducer } from 'react'
import RedditContext from './redditContext'
import redditReducer from './redditReducer'

import axios from 'axios'

import {
  GET_POSTS,
  TEST_TYPE,
  SET_SUBREDDIT,
  GET_DEFAULT_SUBREDDITS,
  FILTER_POST_FROM_POSTS,
  SET_LOADING,
  CHANGE_SORT_BY,
  SET_AFTER,
  GET_POST_DETAIL,
  CLEAR_POST_DETAIL
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
    posts: [],
    post: null,
    comments: null,
    after: null
  }

  const [state, dispatch] = useReducer(redditReducer, initialState)

  useEffect(() => {
    getDefaultSubreddits()
  }, [])

  const getPosts = async () => {
    if (!state.after) {
      setLoading()
    }
    try {
      const res = await axios.get(
        `https://www.reddit.com/r/${state.subreddit}/${state.sortBy}.json?raw_json=1&after=${state.after}`
      )

      console.log(res)

      dispatch({
        type: GET_POSTS,
        payload: res.data.data.children
      })

      dispatch({
        type: SET_AFTER,
        payload: res.data.data.after
      })
    } catch (err) {
      throw err
    }
  }

  const filterPostFromPosts = (name: string) => {
    dispatch({ type: FILTER_POST_FROM_POSTS, payload: name })
  }

  const getPostDetail = async (permalink: string, name: string) => {
    filterPostFromPosts(name)
    try {
      const res = await axios.get(
        `https://www.reddit.com/r/${permalink}.json?raw_json=1`
      )

      dispatch({
        type: GET_POST_DETAIL,
        payload: res.data[1].data.children
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

  const clearPostDetail = () => {
    dispatch({ type: CLEAR_POST_DETAIL, payload: null })
  }

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
        post: state.post,
        comments: state.comments,
        sortBy: state.sortBy,
        loading: state.loading,
        after: state.after,
        tryTest,
        getPosts,
        getPostDetail,
        clearPostDetail,
        setSubreddit,
        changeSortBy
      }}
    >
      {children}
    </RedditContext.Provider>
  )
}

export default RedditState
