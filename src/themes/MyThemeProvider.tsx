import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './my-theme'
import { ReduxState } from '../redux/store'

interface MyThemeProviderProps {
  children: React.ReactNode
}

export const MyThemeProvider: React.FC<MyThemeProviderProps> = ({
  children
}) => {
  const state = useSelector((state: ReduxState) => state.theme)

  return (
    <ThemeProvider theme={state.palette === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  )
}
