import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AuthState from './context/auth/AuthState'
import RedditState from './context/reddit/RedditState'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'
import { darkTheme, lightTheme } from './themes/my-theme'

import { Navbar } from './components/layout/Navbar'
import { Subreddit } from './components/subreddit/Subreddit'

const App: React.FC = () => {
  const [theme, setTheme] = useState('dark')

  return (
    <>
      <AuthState>
        <RedditState>
          <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Navbar setTheme={setTheme} theme={theme} />
            <Router>
              <Switch>
                <Route exact path='/r/:subreddit' component={Subreddit} />
              </Switch>
            </Router>
          </ThemeProvider>
        </RedditState>
      </AuthState>
    </>
  )
}

export default App
