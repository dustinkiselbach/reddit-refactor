import React from 'react'
import styled from 'styled-components'
import { DefaultSubreddit } from '../../context/reddit/redditTypes'
import { motion } from 'framer-motion'
import { customEase } from '../../utils/customEase'

interface LeftNavProps {
  defaultSubreddits: DefaultSubreddit[]
  setSubreddit: (subreddit: string | null) => void
  setShowLeft: React.Dispatch<boolean>
}

const fallbackIconUrl =
  'https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_550,c_limit/reddit-alien-red-st.jpg'

export const LeftNav: React.FC<LeftNavProps> = ({
  defaultSubreddits,
  setSubreddit,
  setShowLeft
}) => {
  return (
    <LeftNavMenu
      onClick={() => setShowLeft(false)}
      animate={{ x: 0 }}
      initial={{ x: -500 }}
      exit={{ x: -500 }}
      transition={{ duration: 0.2, ease: customEase }}
    >
      <SubredditsList>
        {defaultSubreddits.map(subreddit => (
          <SubredditItem
            key={subreddit.name}
            onClick={() => setSubreddit(subreddit.name)}
          >
            <SubredditIcon
              icon={subreddit.icon !== '' ? subreddit.icon : fallbackIconUrl}
            />
            <h4>{subreddit.name}</h4>
          </SubredditItem>
        ))}
      </SubredditsList>
    </LeftNavMenu>
  )
}

const LeftNavMenu = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundColor};
  position: absolute;
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

  width: 5rem;
  height: 5rem;

  margin: 1rem;
`
