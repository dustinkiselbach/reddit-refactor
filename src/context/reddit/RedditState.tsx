import React, { useEffect, useReducer } from 'react'
import RedditContext from './redditContext'
import redditReducer from './redditReducer'

import axios from 'axios'

import {
  GET_POSTS,
  CLEAR_POSTS,
  TEST_TYPE,
  SET_SUBREDDIT,
  GET_DEFAULT_SUBREDDITS,
  FILTER_POST_FROM_POSTS,
  CHANGE_SORT_BY,
  CHANGE_SORT_BY_INTERVAL,
  SET_AFTER,
  GET_POST_DETAIL,
  CLEAR_POST_DETAIL,
  SUBREDDIT_AUTOCOMPLETE,
  CHANGE_SORT_COMMENTS_BY,
  GET_SUBREDDIT_INFO,
  GET_POST_ON_REFRESH,
  CLEAR_COMMENT_DETAIL,
  GET_TRENDING_SUBREDDITS,
  CLEAR_SUBREDDIT_INFO,
  CHANGE_SEARCH_TERM
} from '../types'
import { Props } from './redditTypes'
import { defaultSubredditsParser } from '../../utils/defaultSubredditsParser'
import { connect } from 'react-redux'
import { setLoading } from '../../redux/actions/loadingActions'
import activitiesContext from '../auth/authContext'

// subreddit
// https://www.reddit.com/api/info.json?id={subreddit_id}
// detail
// https://www.reddit.com/{permalink}
// defaults
// https://www.reddit.com/subreddits/default.json

const RedditState: React.FC<Props> = ({ children, setLoading }) => {
  const initialState = {
    trendingSubreddits: null,
    subreddit: 'all',
    subredditInfo: null,
    defaultSubreddits: null,
    autocompleteSubreddits: null,
    searchTerm: null,
    sortBy: 'hot',
    sortByInterval: null,
    sortCommentsBy: 'suggested',
    posts: [],
    post: null,
    comments: null,
    after: null,
    basicSubreddits: ['all', 'popular']
  }

  const [state, dispatch] = useReducer(redditReducer, initialState)

  useEffect(() => {
    getDefaultSubreddits()
    getTrendingSubreddits()
  }, [])

  const getPosts = async () => {
    if (!state.after) {
      setLoading()
    }
    try {
      const res = await axios.get(
        `https://oauth.reddit.com/r/${state.subreddit}/${state.sortBy}.json?raw_json=1&after=${state.after}&t=${state.sortByInterval}`
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
    if (!state.after) {
      setLoading()
    }
  }

  const clearPosts = () => {
    dispatch({ type: CLEAR_POSTS, payload: null })
  }

  const filterPostFromPosts = (name: string) => {
    dispatch({ type: FILTER_POST_FROM_POSTS, payload: name })
  }

  const getPostDetail = async (permalink: string, name: string) => {
    // FASTER IF USER ALREADY HAS POSTS LOADED
    if (state.posts!.length > 0) {
      filterPostFromPosts(name)
      try {
        const res = await axios.get(
          `https://oauth.reddit.com/r/${permalink}.json?raw_json=1&sort=${state.sortCommentsBy}`
        )

        dispatch({
          type: GET_POST_DETAIL,
          payload: res.data[1].data.children
        })
      } catch (err) {
        throw err
      }
    } else {
      // SLOWER BUT WILL WORK IF PAGE IS RELOADED
      // GET THE SUBREDDIT FROM THE URL
      setSubreddit(permalink.split('/')[0])
      setLoading()
      try {
        const res = await axios.get(
          `https://oauth.reddit.com/r/${permalink}.json?raw_json=1&sort=${state.sortCommentsBy}`
        )

        dispatch({
          type: GET_POST_DETAIL,
          payload: res.data[1].data.children
        })
        dispatch({
          type: GET_POST_ON_REFRESH,
          payload: res.data[0].data.children[0]
        })
        setLoading()
      } catch (err) {
        throw err
      }
    }
  }

  const getMoreComments = async (linkId: string, children: string[]) => {
    try {
      const res = await axios.get(
        `https://oauth.reddit.com/api/morechildren?api_type=json&link_id=${linkId}&children=${children.join()}`
      )
      return res.data.json.data.things
    } catch (err) {
      throw err
    }
  }

  const getDefaultSubreddits = async () => {
    try {
      const res = await axios.get(
        'https://oauth.reddit.com/subreddits/default.json'
      )

      dispatch({
        type: GET_DEFAULT_SUBREDDITS,
        payload: defaultSubredditsParser(res.data.data.children)
      })
    } catch (err) {
      throw err
    }
  }

  // using fetch because this endpoint won't accept headers
  const getTrendingSubreddits = async () => {
    try {
      const data = await (
        await fetch('https://www.reddit.com/api/trending_subreddits.json')
      ).json()
      dispatch({ type: GET_TRENDING_SUBREDDITS, payload: data.subreddit_names })
    } catch (err) {
      throw err
    }
  }

  const subredditAutocomplete = async (query: string) => {
    if (query.length === 0) {
      dispatch({
        type: SUBREDDIT_AUTOCOMPLETE,
        payload: null
      })
    } else {
      try {
        const res = await axios.get(
          `https://oauth.reddit.com/api/subreddit_autocomplete_v2?query=${query}&include_over_18=true&include_profiles=false`
        )
        dispatch({
          type: SUBREDDIT_AUTOCOMPLETE,
          payload: defaultSubredditsParser(res.data.data.children)
        })
      } catch (err) {
        throw err
      }
    }
  }

  const getSubredditInfo = async () => {
    if (state.subreddit && state.basicSubreddits) {
      if (state.basicSubreddits.includes(state.subreddit)) {
        dispatch({
          type: CLEAR_SUBREDDIT_INFO,
          payload: null
        })
      } else {
        try {
          const res = await axios.get(
            `https://oauth.reddit.com/r/${state.subreddit}/about`
          )

          dispatch({
            type: GET_SUBREDDIT_INFO,
            payload: res.data
          })
        } catch (err) {
          throw err
        }
      }
    }
  }
  const subredditSearch = async (q: string) => {
    try {
      const res = await axios.post(
        `https://oauth.reddit.com/api/search_subreddits?query=${q}&include_over_18`
      )
      console.log(res)
    } catch (err) {
      throw err
    }
  }

  const clearPostDetail = () => {
    dispatch({ type: CLEAR_POST_DETAIL, payload: null })
  }

  const clearCommentDetail = () => {
    dispatch({ type: CLEAR_COMMENT_DETAIL, payload: null })
  }

  const setSubreddit = (subreddit: string | null) => {
    dispatch({ type: SET_SUBREDDIT, payload: subreddit })
  }

  // const setLoading = () => {
  //   dispatch({ type: SET_LOADING, payload: null })
  // }

  const changeSortBy = (sortBy: string, sortByInterval?: string) => {
    dispatch({ type: CHANGE_SORT_BY, payload: sortBy })
    if (sortByInterval) {
      dispatch({ type: CHANGE_SORT_BY_INTERVAL, payload: sortByInterval })
    } else {
      dispatch({ type: CHANGE_SORT_BY_INTERVAL, payload: null })
    }
  }
  const changeSortCommentsBy = (sortCommentsBy: string) => {
    dispatch({ type: CHANGE_SORT_COMMENTS_BY, payload: sortCommentsBy })
  }

  const changeSearchTerm = (search: string) => {
    dispatch({ type: CHANGE_SEARCH_TERM, payload: search })
  }

  const tryTest = () => {
    dispatch({ type: TEST_TYPE, payload: null })
  }

  return (
    <RedditContext.Provider
      value={{
        trendingSubreddits: state.trendingSubreddits,
        subreddit: state.subreddit,
        defaultSubreddits: state.defaultSubreddits,
        autocompleteSubreddits: state.autocompleteSubreddits,
        subredditInfo: state.subredditInfo,
        posts: state.posts,
        post: state.post,
        comments: state.comments,
        sortBy: state.sortBy,
        sortByInterval: state.sortByInterval,
        sortCommentsBy: state.sortCommentsBy,
        searchTerm: state.searchTerm,
        after: state.after,
        basicSubreddits: state.basicSubreddits,
        tryTest,
        getPosts,
        clearPosts,
        getPostDetail,
        getMoreComments,
        getSubredditInfo,
        clearPostDetail,
        clearCommentDetail,
        setSubreddit,
        subredditAutocomplete,
        changeSortBy,
        changeSortCommentsBy,
        changeSearchTerm
      }}
    >
      {children}
    </RedditContext.Provider>
  )
}

export default connect(null, { setLoading })(RedditState)
