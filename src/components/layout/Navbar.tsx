import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import RedditContext from '../../context/reddit/redditContext'
import { SubNav } from './SubNav'
import { AnimatePresence } from 'framer-motion'
import { LeftNav } from '../leftnavigation/LeftNav'
import { useHistory } from 'react-router-dom'

interface Props {
  setTheme: React.Dispatch<string>
  theme: string
}

export const Navbar: React.FC<Props> = () => {
  const [prevScrollPos, setScrollPos] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)
  const [showSort, setShowSort] = useState(false)
  const [showLeft, setShowLeft] = useState(true)
  let history = useHistory()

  const redditContext = useContext(RedditContext)
  const {
    subreddit,
    sortBy,
    defaultSubreddits,
    post,
    getPosts,
    changeSortBy,
    setSubreddit
  } = redditContext

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  // Hide or show the menu.
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    const visible = prevScrollPos > currentScrollPos

    setScrollPos(currentScrollPos)
    setVisible(visible)
  }

  let leftButton

  if (post) {
    leftButton = (
      <NavIcon onClick={() => history.goBack()}>
        <span className='material-icons'>arrow_back</span>
      </NavIcon>
    )
  } else {
    leftButton = (
      <NavIcon onClick={() => setShowLeft(true)}>
        <span className='material-icons'>menu</span>
      </NavIcon>
    )
  }

  return (
    <>
      <AnimatePresence>
        {showLeft && defaultSubreddits && (
          <LeftNav
            defaultSubreddits={defaultSubreddits}
            setSubreddit={setSubreddit!}
            setShowLeft={setShowLeft}
          />
        )}
      </AnimatePresence>
      <Nav visible={visible}>
        {leftButton}
        <div>
          <h2>{subreddit}</h2>
          <label>{sortBy}</label>
        </div>
        <NavIcon>
          <span className='material-icons'>arrow_drop_down</span>
        </NavIcon>

        <NavIcon onClick={getPosts}>
          <span className='material-icons'>refresh</span>
        </NavIcon>
        <NavIcon onClick={() => setShowSort(!showSort)}>
          <span className='material-icons'>sort</span>
          <AnimatePresence>
            {showSort && <SubNav changeSortBy={changeSortBy} />}
          </AnimatePresence>
        </NavIcon>
        <NavIcon>
          <span className='material-icons'>more_vert</span>
        </NavIcon>
      </Nav>
    </>
  )
}

const Nav = styled.nav<{ visible: boolean }>`
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  width: calc(100%);
  background-color: ${props => props.theme.colors.backgroundColor};
  transform: translateY(${props => (props.visible ? '0' : '-100px')});
  transition: all 0.2s ease-in-out;
  z-index: 1;
  div {
    h2 {
      margin: 0.5rem 0;
    }
    label {
      font-weight: 300;
      text-transform: uppercase;
    }
  }
`
const NavIcon = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 3rem;
  height: 3rem;
  transition: all 0.2s ease-in-out;
  position: relative;

  span {
    font-weight: 300;
    font-size: 2.2rem;
  }

  &:active {
    background-color: ${props => props.theme.colors.navActive};
  }
`
