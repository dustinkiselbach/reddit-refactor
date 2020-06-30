import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import RedditContext from '../../context/reddit/redditContext'
import { SubNav } from './SubNav'
import { AnimatePresence } from 'framer-motion'
import { LeftNav } from '../leftnavigation/LeftNav'
import { useHistory } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { RightNav } from '../rightnavigation/RightNav'
import { SubSubNav } from './SubSubNav'

interface Props {}

const postsOptions = ['hot', 'new', 'rising', 'top', 'controversial']
const commentsOptions = ['top', 'best', 'new', 'old', 'controversial', 'Q&A']

export const Navbar: React.FC<Props> = () => {
  const [prevScrollPos, setScrollPos] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)
  const [showSort, setShowSort] = useState(false)
  const [showSubSort, setShowSubSort] = useState(false)
  const [sortLabel, setSortLabel] = useState<null | string>(null)
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowLeft(false),
    onSwipedRight: () => setShowRight(false)
  })

  const rightHandler = useSwipeable({
    onSwipedRight: () => setShowLeft(true)
  })

  const leftHandler = useSwipeable({
    onSwipedLeft: () => setShowRight(true)
  })

  let history = useHistory()

  const redditContext = useContext(RedditContext)
  const {
    subreddit,
    subredditInfo,
    sortBy,
    sortByInterval,
    sortCommentsBy,
    defaultSubreddits,
    autocompleteSubreddits,
    post,
    getPosts,
    clearPosts,
    changeSortBy,
    changeSortCommentsBy,
    setSubreddit,
    subredditAutocomplete
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

  if (post) {
    return (
      <>
        <Nav visible={visible}>
          <NavIcon onClick={() => history.goBack()}>
            <span className='material-icons'>arrow_back</span>
          </NavIcon>
          <div>
            <h2>{subreddit}</h2>
            <label>{sortCommentsBy}</label>
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
              {showSort && (
                <SubNav
                  changeSortBy={changeSortCommentsBy!}
                  options={commentsOptions}
                />
              )}
            </AnimatePresence>
          </NavIcon>
          <NavIcon>
            <span className='material-icons'>more_vert</span>
          </NavIcon>
        </Nav>
      </>
    )
  } else {
    return (
      <>
        <SwipeRight {...rightHandler} />
        <SwipeLeft {...leftHandler} />
        <AnimatePresence>
          {showLeft && defaultSubreddits && (
            <div {...handlers}>
              <LeftNav
                defaultSubreddits={defaultSubreddits}
                autocompleteSubreddits={autocompleteSubreddits}
                setSubreddit={setSubreddit!}
                setShowLeft={setShowLeft}
                subredditAutocomplete={subredditAutocomplete!}
              />
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showRight && subredditInfo && (
            <div {...handlers}>
              <RightNav subredditInfo={subredditInfo} />
            </div>
          )}
        </AnimatePresence>
        <Nav visible={visible}>
          <NavIcon onClick={() => setShowLeft(true)}>
            <span className='material-icons'>menu</span>
          </NavIcon>
          <div>
            <h2>{subreddit}</h2>
            <label>
              {sortBy}
              {sortByInterval && ': ' + sortByInterval}
            </label>
          </div>
          <NavIcon>
            <span className='material-icons'>arrow_drop_down</span>
          </NavIcon>

          <NavIcon onClick={clearPosts!}>
            <span className='material-icons'>refresh</span>
          </NavIcon>
          {/* seems like this works, might cause problems in the future */}
          <NavIcon onClick={() => setShowSort(!showSort && !showSubSort)}>
            <span className='material-icons'>sort</span>
            <AnimatePresence>
              {showSort && (
                <SubNav
                  changeSortBy={changeSortBy}
                  subSubEnabled={true}
                  options={postsOptions}
                  setShowSubSort={setShowSubSort}
                  setSortLabel={setSortLabel}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showSubSort && (
                <SubSubNav
                  sortLabel={sortLabel}
                  changeSortBy={changeSortBy}
                  setShowSort={setShowSort}
                  setShowSubSort={setShowSubSort}
                />
              )}
            </AnimatePresence>
          </NavIcon>
          <NavIcon>
            <span className='material-icons'>more_vert</span>
          </NavIcon>
        </Nav>
      </>
    )
  }
}

const Nav = styled.nav<{ visible: boolean }>`
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  width: calc(100%);
  background-color: ${props => props.theme.colors.backgroundColor};
  box-shadow: ${props => props.theme.boxShadow};
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

const SwipeRight = styled.div`
  height: 100%;
  background-color: transparent;
  width: 15px;
  z-index: 3;
  position: fixed;
`

const SwipeLeft = styled.div`
  height: 100%;
  background-color: transparent;
  width: 15px;
  z-index: 3;
  position: fixed;
  right: 0;
`
