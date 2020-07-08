import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

import { ThemeState } from './reducers/themeReducer'
import { LoadingState } from './reducers/loadingReducer'

export type ReduxState = {
  theme: ThemeState
  loading: LoadingState
}

const initialState = {}

const middleware = [thunk]

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
