import { combineReducers } from 'redux'
import { themeReducer } from './themeReducer'
import { loadingReducer } from './loadingReducer'

export const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loadingReducer
})
