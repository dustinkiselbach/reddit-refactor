// my-theme.ts
import { DefaultTheme } from 'styled-components'

const darkTheme: DefaultTheme = {
  colors: {
    backgroundColor: 'rgb(18, 18, 18)',
    textColor: 'rgb(255, 255, 255)',
    textColorFaded: 'rgba(255, 255, 255, 0.6)',
    primaryColor: '#FFB300',
    secondaryColor: '#6600ff',
    subMenuColor: 'rgb(42, 42, 42)',
    navActive: 'rgba(255,255,255,0.2)',
    highlight: '#264061'
  },
  boxShadow: 'none'
}

const lightTheme: DefaultTheme = {
  colors: {
    backgroundColor: 'rgb(255, 255, 255)',
    textColor: 'rgb(18, 18, 18)',
    textColorFaded: 'rgba(18, 18, 18, 0.6)',
    primaryColor: '#FFD54F',
    secondaryColor: '#b587ff',
    subMenuColor: 'rgb(255, 255, 255)',
    navActive: 'rgba(18,18,18,0.2)',
    highlight: '#65A6F9'
  },
  boxShadow: '0 0.4rem 0.4rem rgba(0,0,0,0.2)'
}

export { darkTheme, lightTheme }
