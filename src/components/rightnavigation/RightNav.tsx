import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { customEase } from '../../utils/customEase'
import { DarkenBackground } from '../style/basicStyles'
import { decodeHTML } from '../../utils/decodeHtml'
import { SubredditInfo } from '../../context/reddit/redditTypes'

interface RightNavProps {
  subredditInfo?: SubredditInfo
  trendingSubreddits?: string[] | null
  setSubreddit: (subreddit: string) => void
  setShowRight: any
}

export const RightNav: React.FC<RightNavProps> = ({
  subredditInfo,
  setSubreddit,
  setShowRight,
  trendingSubreddits
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'scroll'
    }
  }, [])

  if (subredditInfo) {
    const {
      data: {
        accounts_active,
        description_html,
        display_name_prefixed,
        icon_img,
        subscribers
      }
    } = subredditInfo

    return (
      <>
        <DarkenBackground
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: customEase }}
        />
        <RightNavMenu
          animate={{ x: 0 }}
          initial={{ x: 500 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.2, ease: customEase }}
        >
          <SubredditHeader>
            <SubredditIcon icon={icon_img} />
            <SubredditHeaderInfo>
              <h4>{display_name_prefixed}</h4>
              <h5>
                {subscribers} subscribers - {accounts_active} active
              </h5>
            </SubredditHeaderInfo>
          </SubredditHeader>

          <div
            dangerouslySetInnerHTML={{ __html: decodeHTML(description_html) }}
          />
        </RightNavMenu>
      </>
    )
  } else {
    return (
      <>
        <DarkenBackground
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: customEase }}
        />
        <RightNavMenu
          animate={{ x: 0 }}
          initial={{ x: 500 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.2, ease: customEase }}
        >
          <TrendingButton
            onClick={() => {
              setShowRight(false)
              setSubreddit('trendingsubreddits')
            }}
          >
            <Icon className='material-icons'>trending_up</Icon>
            <div>Trending</div>
          </TrendingButton>
          <TrendingSubreddits>
            {trendingSubreddits && (
              <>
                {trendingSubreddits.map(item => (
                  <TrendingSubredditItem
                    key={item}
                    onClick={() => {
                      setShowRight(false)
                      setSubreddit(item)
                    }}
                  >
                    /r/{item}
                  </TrendingSubredditItem>
                ))}
              </>
            )}
          </TrendingSubreddits>
        </RightNavMenu>
      </>
    )
  }
}

const RightNavMenu = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundColor};
  position: fixed;
  width: 80%;
  height: 100%;
  z-index: 4;
  overflow-y: scroll;
  right: 0;
  padding: 1rem;

  a {
    color: ${props => props.theme.colors.primaryColor};
    text-decoration: underline;
  }
`
const SubredditHeader = styled.div`
  display: flex;
  align-items: center;
`

const SubredditHeaderInfo = styled.div`
  h4 {
    margin: 2px;
  }

  h5 {
    margin: 2px;
    color: ${props => props.theme.colors.textColorFaded};
  }
`

const Icon = styled.span`
  margin-right: 1rem;
`

const TrendingButton = styled.div`
  background-color: ${props => props.theme.colors.subMenuColor};
  display: flex;
  align-items: center;
  padding: 1rem;
  div {
    font-size: 1.2rem;
  }
`

const TrendingSubreddits = styled.ul`
  margin: 1rem 0;
`

const TrendingSubredditItem = styled.li`
  padding: 1rem;
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
