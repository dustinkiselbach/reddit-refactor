import React, { useState, MouseEvent } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { getPostType, getMedia } from '../../utils/subredditParser'
import { Loading } from '../layout/Loading'

import { motion, AnimatePresence } from 'framer-motion'
import { customEase } from '../../utils/customEase'
import { PostData } from '../../context/reddit/redditTypes'
import { childVariants } from '../../utils/variants'

interface SubredditPostProps {
  post: PostData
  detail?: boolean
}

export const SubredditPost: React.FC<SubredditPostProps> = ({
  post,
  detail
}) => {
  const [clicked, setClicked] = useState(false)
  const [gifLoading, setGifLoading] = useState(false)
  const [animateStart, setAnimateStart] = useState(0)

  const {
    data: {
      author,
      created_utc,
      domain,
      link_flair_text,
      name,
      num_comments,
      preview,
      permalink,
      score,
      selftext,
      selftext_html,
      subreddit,
      stickied,
      title,
      url
    }
  } = post

  const type = getPostType(post.data)
  const media = getMedia(post.data, type)

  const onClick = (e: MouseEvent) => {
    const smallMediaContainer = e.currentTarget.getBoundingClientRect()

    // 300px is rougly the size of how far the start
    // needs to move up
    setAnimateStart(smallMediaContainer.y - 300)
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = 'scroll'
    } else {
      document.body.style.overflow = 'hidden'
    }

    setClicked(!clicked)
  }

  const onLoadStart = () => {
    if (type === 'video:hosted' || type === 'video:outside') {
      setGifLoading(true)
    }
  }

  const onLoadEnd = () => {
    setGifLoading(false)
  }

  return (
    <Post
      variants={childVariants}
      transition={{ duration: 0.2, ease: customEase }}
    >
      <AnimatePresence>
        {clicked && (
          <PicDetail
            onClick={onClick}
            thumbnail={media}
            animate={{ y: 0, scaleY: 1, opacity: 1 }}
            initial={{ y: animateStart, scaleY: 0.5, opacity: 0 }}
            exit={{ y: animateStart, scaleY: 0.5, opacity: 0 }}
            transition={{ duration: 0.2, ease: customEase }}
          >
            {type.split(':')[0] === 'video' && (
              <>
                {gifLoading ? <Loading /> : null}
                <video
                  src={media}
                  width='100%'
                  height='100%'
                  playsInline={true}
                  loop
                  autoPlay={true}
                  onLoadStart={onLoadStart}
                  onLoadedData={onLoadEnd}
                />
              </>
            )}
          </PicDetail>
        )}
      </AnimatePresence>
      {/* this is image preview if is a gif video or article with preview */}
      <PostPreview>
        {type !== 'self' && preview && (
          <PreviewImage
            onClick={onClick}
            thumbnail={preview.images[0].source.url}
          >
            {(type === 'link:preview' || type === 'link:video') && (
              <div>
                <span>{domain}</span>
                <a href={url} target='_blank' rel='noopener noreferrer'>
                  {url}
                </a>
              </div>
            )}
          </PreviewImage>
        )}
      </PostPreview>
      <Container>
        <PostTitle stickied={stickied}>
          <h2>
            <Link to={`${permalink}${name}`}>{title}</Link>
          </h2>
          <PostTitleLabel>
            {link_flair_text && (
              <>
                <PostTitleFlair>{link_flair_text} </PostTitleFlair>
                &bull;{' '}
              </>
            )}
            {author} &bull;{' '}
            <Moment unix fromNow>
              {created_utc}
            </Moment>{' '}
            &bull;
            <PostTitleSubreddit> {subreddit} </PostTitleSubreddit> &bull; (
            {domain})
          </PostTitleLabel>
        </PostTitle>
        {/* // text only link*/}
        {type === 'link' && (
          <PreviewLink href={url} target='_blank' rel='noopener noreferrer'>
            <span className='material-icons'>open_in_browser</span>
            <div>
              <h5>{domain}</h5>
              <small>{url}</small>
            </div>
          </PreviewLink>
        )}

        {/* if this is a self post you need to show this on the post preview */}
        {type === 'self' && (
          <>
            {detail ? (
              <div dangerouslySetInnerHTML={{ __html: selftext_html }} />
            ) : (
              <PreviewText>{selftext.split('\n')[0]}</PreviewText>
            )}
          </>
        )}

        <PostFooter>
          <ul>
            <li>{score} points</li>
            <li>{num_comments} comments</li>
          </ul>
        </PostFooter>
      </Container>
    </Post>
  )
}

const Post = styled(motion.div)`
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow};
`

const PostPreview = styled.div``

const PreviewImage = styled.div<{ thumbnail: string }>`
  background-image: url(${props => props.thumbnail});
  background-size: cover;
  background-position: center;
  height: 15rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  div {
    width: 100%;

    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    span {
      display: inline-block;
      padding: 0.5rem;
    }
    a {
      padding: 0.5rem;
      display: inline-block;
      overflow: hidden;
    }
  }
`

const PreviewText = styled.div`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 300;
`

const PreviewLink = styled.a`
  white-space: nowrap;
  display: grid;
  grid-template-columns: 6rem min-content;
  align-items: center;

  span {
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid ${props => props.theme.colors.textColor};

    margin: 1rem;
  }
`

const PostTitle = styled.div<{ stickied: boolean }>`
  a {
    color: ${props =>
      props.stickied
        ? props.theme.colors.primaryColor
        : props.theme.colors.textColor};
    font-weight: ${props => (props.stickied ? 600 : 400)};
  }
`

const PostTitleLabel = styled.label`
  color: ${props => props.theme.colors.textColorFaded};
`

const PostTitleFlair = styled.span`
  color: ${props => props.theme.colors.secondaryColor};
`

const PostTitleSubreddit = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.secondaryColor};
`

const PostFooter = styled.div`
  color: ${props => props.theme.colors.textColorFaded};
  ul {
    padding: 1rem 0;
  }
`

const Container = styled.div`
  padding: 0.5rem;
  font-weight: 300;
`

const PicDetail = styled(motion.div)<{ thumbnail: string }>`
  z-index: 2;
  position: fixed;

  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.colors.backgroundColor};
  background-image: url(${props => props.thumbnail});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  overflow-y: hidden;
`
