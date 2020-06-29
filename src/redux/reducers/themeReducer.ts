export type ThemeState = {
  palette: string
}

const initialState = {
  palette: 'dark'
}

export const TOGGLE_THEME = 'TOGGLE_THEME'

export const themeReducer = (
  state: ThemeState = initialState,
  action: { type: 'TOGGLE_THEME' }
) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        palette: state.palette === 'dark' ? 'light' : 'dark'
      }
    default:
      console.log('fart')
      return state
  }
}
