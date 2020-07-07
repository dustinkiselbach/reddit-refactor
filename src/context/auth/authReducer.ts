import { TEST_TYPE, AUTHENTICATE } from '../types'
import { State, AllActions } from './authTypes'

export default (state: State, action: AllActions) => {
  switch (action.type) {
    case TEST_TYPE: {
      return {
        ...state,
        test: 'tested'
      }
    }
    case AUTHENTICATE: {
      return {
        ...state,
        authenticated: action.payload
      }
    }
    default:
      return state
  }
}
