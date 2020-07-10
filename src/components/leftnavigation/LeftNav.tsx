import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DefaultSubreddit } from '../../context/reddit/redditTypes'
import { motion } from 'framer-motion'
import { customEase } from '../../utils/customEase'

import { LeftNavSearch } from './LeftNavSearch'
import { toggleTheme } from '../../redux/actions/themeActions'
import { DarkenBackground } from '../style/basicStyles'

interface LeftNavProps {
  defaultSubreddits: DefaultSubreddit[]
  basicSubreddits: string[]
  autocompleteSubreddits?: DefaultSubreddit[] | null
  setSubreddit: (subreddit: string | null) => void
  setShowLeft: React.Dispatch<boolean>
  subredditAutocomplete: (query: string) => void
  toggleTheme: any
}

const fallbackIconUrl =
  'https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_550,c_limit/reddit-alien-red-st.jpg'

const LeftNavPre: React.FC<LeftNavProps> = ({
  defaultSubreddits,
  autocompleteSubreddits,
  basicSubreddits,
  setSubreddit,
  setShowLeft,
  subredditAutocomplete,
  toggleTheme
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
        <LeftNavTop>
          <Me>
            <h4>guest</h4>
          </Me>
          <MeStuff>
            <MeItem onClick={toggleTheme}>
              <span className='material-icons'>nights_stay</span>{' '}
              <h4>Night Mode</h4>
            </MeItem>
          </MeStuff>
        </LeftNavTop>
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
              {basicSubreddits.map(subreddit => (
                <SubredditItem
                  key={subreddit}
                  onClick={() => setSubreddit(subreddit)}
                >
                  <SubredditIcon icon={fallbackIconUrl} />
                  <h4>{subreddit}</h4>
                </SubredditItem>
              ))}
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

export const LeftNav = connect(null, { toggleTheme })(LeftNavPre)

const LeftNavMenu = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundColor};
  position: fixed;
  width: 80%;
  height: 100%;
  z-index: 4;
  overflow-y: scroll;
`

const LeftNavTop = styled.div``

const Me = styled.div`
  height: 100px;
  background-image: linear-gradient(
    45deg,
    ${props => props.theme.colors.primaryColor},
    ${props => props.theme.colors.secondaryColor}
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1rem;
`

const MeStuff = styled.ul``

const MeItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  span {
    margin: 1rem;
  }

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
  border-top: 1px solid ${props => props.theme.colors.textColorFaded};
`
