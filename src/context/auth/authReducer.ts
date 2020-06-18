import { TEST_TYPE } from '../types'
import { State, Actions } from './authTypes'

export default (state: State, action: Actions) => {
  switch (action.type) {
    case TEST_TYPE: {
      return {
        ...state,
        test: 'tested'
      }
    }
    default:
      return state
  }
}
