import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AuthState from './context/auth/AuthState'
import RedditState from './context/reddit/RedditState'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'
import { darkTheme, lightTheme } from './themes/my-theme'

import { Navbar } from './components/layout/Navbar'
import { Subreddit } from './components/subreddit/Subreddit'
import { Post } from './components/post/Post'

const App: React.FC = () => {
  const [theme, setTheme] = useState('dark')

  return (
    <>
      <AuthState>
        <RedditState>
          <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Router>
              <Navbar setTheme={setTheme} theme={theme} />
              <Switch>
                <Route exact path='/' component={Subreddit} />
                <Route
                  exact
                  path='/r/:subreddit/comments/:id/:title/:name'
                  component={Post}
                />
              </Switch>
            </Router>
          </ThemeProvider>
        </RedditState>
      </AuthState>
    </>
  )
}

export default App
