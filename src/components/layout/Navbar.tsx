import React, { useContext } from 'react'
import styled from 'styled-components'
import RedditContext from '../../context/reddit/redditContext'

interface Props {
  setTheme: React.Dispatch<string>
  theme: string
}

export const Navbar: React.FC<Props> = ({ setTheme, theme }) => {
  const redditContext = useContext(RedditContext)

  const { getPosts } = redditContext

  return (
    <Nav>
      <Brand onClick={getPosts}>blah</Brand>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  /* background-color: ${props => props.theme.colors.primaryColor}; */
`

const Brand = styled.h1``
