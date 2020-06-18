import { GET_POSTS, TEST_TYPE, SET_SUBREDDIT } from '../types'
import { State, AllActions } from './redditTypes'

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
        posts: action.payload
      }
    }
    case SET_SUBREDDIT: {
      return {
        ...state,
        subreddit: action.payload
      }
    }
    default:
      return state
  }
}
