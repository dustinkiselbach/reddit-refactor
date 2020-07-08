import {
  GET_POSTS,
  CLEAR_POSTS,
  TEST_TYPE,
  SET_SUBREDDIT,
  GET_DEFAULT_SUBREDDITS,
  CHANGE_SORT_BY,
  SET_AFTER,
  GET_POST_DETAIL,
  CLEAR_POST_DETAIL,
  FILTER_POST_FROM_POSTS,
  SUBREDDIT_AUTOCOMPLETE,
  CHANGE_SORT_COMMENTS_BY,
  GET_SUBREDDIT_INFO,
  CHANGE_SORT_BY_INTERVAL,
  GET_POST_ON_REFRESH
} from '../types'
import { State, AllActions, PostData } from './redditTypes'

export default (state: State, action: AllActions): State => {
  switch (action.type) {
    case TEST_TYPE: {
      return {
        ...state
        // posts: action.payload
      }
    }
    case GET_POSTS: {
      return {
        ...state,
        posts: [...state.posts!, action.payload]
      }
    }
    case CLEAR_POSTS: {
      return {
        ...state,
        posts: [],
        after: null
      }
    }
    case GET_POST_DETAIL: {
      return {
        ...state,
        comments: action.payload
      }
    }
    case GET_POST_ON_REFRESH: {
      console.log(action.payload)
      return {
        ...state,
        post: action.payload
      }
    }
    case GET_SUBREDDIT_INFO: {
      return {
        ...state,
        subredditInfo: action.payload
      }
    }
    case FILTER_POST_FROM_POSTS: {
      return {
        ...state,
        post: state.posts!.map(postArr =>
          postArr.filter((post: PostData) => post.data.name === action.payload)
        )[state.posts!.length - 1][0]
      }
    }
    case CLEAR_POST_DETAIL: {
      return {
        ...state,
        post: null,
        comments: null
      }
    }
    case SET_SUBREDDIT: {
      return {
        ...state,
        subreddit: action.payload,
        after: null,
        posts: []
      }
    }
    case GET_DEFAULT_SUBREDDITS: {
      return {
        ...state,
        defaultSubreddits: action.payload
      }
    }
    case SUBREDDIT_AUTOCOMPLETE: {
      return {
        ...state,
        autocompleteSubreddits: action.payload
      }
    }
    case CHANGE_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload,
        after: null,
        posts: []
      }
    }
    case CHANGE_SORT_BY_INTERVAL: {
      return {
        ...state,
        sortByInterval: action.payload
      }
    }
    case CHANGE_SORT_COMMENTS_BY: {
      return {
        ...state,
        sortCommentsBy: action.payload
      }
    }
    case SET_AFTER: {
      return {
        ...state,
        after: action.payload
      }
    }

    default:
      return state
  }
}
