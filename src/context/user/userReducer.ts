import { State } from '../user/userTypes'
import { AllActions } from '../user/userTypes'
import {
  GET_USER_TROPHIES,
  GET_USER_ABOUT,
  GET_USERNAME,
  CLEAR_USER_INFO,
  CHANGE_SORT_USER_CONTENT_BY,
  GET_USER_POSTS
} from '../types'

export default (state: State, action: AllActions) => {
  switch (action.type) {
    case GET_USER_TROPHIES: {
      return {
        ...state,
        userTrophies: action.payload
      }
    }
    case GET_USER_ABOUT: {
      return {
        ...state,
        userData: action.payload
      }
    }
    case GET_USER_POSTS: {
      return {
        ...state,
        userPosts: [...state.userPosts!, action.payload]
      }
    }
    case GET_USERNAME: {
      return {
        ...state,
        userName: action.payload
      }
    }
    case CHANGE_SORT_USER_CONTENT_BY: {
      return {
        ...state,
        sortUserContentBy: action.payload
      }
    }
    case CLEAR_USER_INFO: {
      return {
        ...state,
        userTrophies: null,
        userData: null,
        userName: null
      }
    }
    default:
      return state
  }
}
