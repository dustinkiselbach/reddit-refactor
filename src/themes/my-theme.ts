// my-theme.ts
import { DefaultTheme } from 'styled-components'

const darkTheme: DefaultTheme = {
  colors: {
    backgroundColor: '#121212',
    textColor: '#ffffff',
    primaryColor: '#FFB300',
    secondaryColor: '#6600ff'
  }
}

const lightTheme: DefaultTheme = {
  colors: {
    backgroundColor: '#ffffff',
    textColor: '#121212',
    primaryColor: '#FFD54F',
    secondaryColor: '#b587ff'
  }
}

export { darkTheme, lightTheme }
