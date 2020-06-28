import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DefaultSubreddit } from '../../context/reddit/redditTypes'
import { motion } from 'framer-motion'
import { customEase } from '../../utils/customEase'

import { LeftNavSearch } from './LeftNavSearch'

interface LeftNavProps {
  defaultSubreddits: DefaultSubreddit[]
  autocompleteSubreddits?: DefaultSubreddit[] | null
  setSubreddit: (subreddit: string | null) => void
  setShowLeft: React.Dispatch<boolean>
  subredditAutocomplete: (query: string) => void
}

const fallbackIconUrl =
  'https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_550,c_limit/reddit-alien-red-st.jpg'

export const LeftNav: React.FC<LeftNavProps> = ({
  defaultSubreddits,
  autocompleteSubreddits,
  setSubreddit,
  setShowLeft,
  subredditAutocomplete
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'scroll'
    }
  }, [])

  return (
    <>
      <DarkenBackground
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: customEase }}
      />
      <LeftNavMenu
        animate={{ x: 0 }}
        initial={{ x: -500 }}
        exit={{ x: -500 }}
        transition={{ duration: 0.2, ease: customEase }}
      >
        <SearchContainer>
          <LeftNavSearch
            placeholder='View subreddit'
            setSubreddit={setSubreddit}
            setShowLeft={setShowLeft}
            subredditAutocomplete={subredditAutocomplete}
          />
        </SearchContainer>
        <SubredditsList
          onClick={() => {
            setShowLeft(false)
            subredditAutocomplete('')
          }}
        >
          {autocompleteSubreddits ? (
            <>
              {autocompleteSubreddits.map(subreddit => (
                <SubredditItem
                  key={subreddit.name}
                  onClick={() => setSubreddit(subreddit.name)}
                >
                  <SubredditIcon
                    icon={
                      subreddit.icon !== '' ? subreddit.icon : fallbackIconUrl
                    }
                  />
                  <h4>{subreddit.name}</h4>
                </SubredditItem>
              ))}
            </>
          ) : (
            <>
              {defaultSubreddits.map(subreddit => (
                <SubredditItem
                  key={subreddit.name}
                  onClick={() => setSubreddit(subreddit.name)}
                >
                  <SubredditIcon
                    icon={
                      subreddit.icon !== '' ? subreddit.icon : fallbackIconUrl
                    }
                  />
                  <h4>{subreddit.name}</h4>
                </SubredditItem>
              ))}
            </>
          )}
        </SubredditsList>
      </LeftNavMenu>
    </>
  )
}

const LeftNavMenu = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundColor};
  position: fixed;
  width: 80%;
  height: 100%;
  z-index: 4;
  overflow-y: scroll;
`

const SubredditsList = styled.ul``

const SubredditItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::after {
    position: absolute;
    content: '';
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    background-color: transparent;
    border-radius: 50px;
    transition: 0.2s all ease-in-out;
    z-index: -1;
  }
  &:active {
    &::after {
      background-color: ${props => props.theme.colors.navActive};
      transform: scale(100);
    }
  }
`

const SubredditIcon = styled.div<{ icon: string }>`
  background-image: url(${props => props.icon});
  background-size: cover;
  background-position: center;
  border-radius: 100%;

  width: 2.5rem;
  height: 2.5rem;

  margin: 1rem;
`
const SearchContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`

const DarkenBackground = styled(motion.div)`
  width: 100%;
  position: fixed;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`
