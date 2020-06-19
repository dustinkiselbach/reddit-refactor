import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
* {
  text-decoration: none;
  
 }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 12px;

  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    background: ${props => props.theme.colors.backgroundColor};
    color: ${props => props.theme.colors.textColor};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${props => props.theme.colors.textColor};
  }
}

`
