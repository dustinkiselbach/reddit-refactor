import { State } from '../user/userTypes'
import { AllActions } from '../user/userTypes'
import { GET_USER_TROPHIES, GET_USER_ABOUT } from '../types'

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
    default:
      return state
  }
}
