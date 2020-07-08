export type LoadingState = {
  loading: boolean
}

const initialState = {
  loading: false
}

export const SET_LOADING = 'SET_LOADING'

export const loadingReducer = (
  state: LoadingState = initialState,
  action: { type: 'SET_LOADING' }
) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: state.loading ? false : true
      }
    default:
      return state
  }
}
