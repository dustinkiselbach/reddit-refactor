import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AuthState from './context/auth/AuthState'
import RedditState from './context/reddit/RedditState'
import UserState from './context/user/UserState'

import { GlobalStyle } from './GlobalStyle'

import { Navbar } from './components/layout/Navbar'
import { Subreddit } from './components/subreddit/Subreddit'
import { Post } from './components/post/Post'

import { store } from './redux/store'
import { Provider } from 'react-redux'
import { MyThemeProvider } from './themes/MyThemeProvider'
import { User } from './components/user/User'

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <AuthState>
          <RedditState>
            <UserState>
              <MyThemeProvider>
                <GlobalStyle />
                <Router>
                  <Navbar />
                  <Switch>
                    <Route exact path='/' component={Subreddit} />
                    <Route
                      exact
                      path='/r/:subreddit/comments/:id/:title/:name'
                      component={Post}
                    />
                    <Route exact path='/user/:userName' component={User} />
                  </Switch>
                </Router>
              </MyThemeProvider>
            </UserState>
          </RedditState>
        </AuthState>
      </Provider>
    </>
  )
}

export default App
