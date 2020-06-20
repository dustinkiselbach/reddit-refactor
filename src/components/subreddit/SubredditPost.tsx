import React, { useState } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'
import { Ripple } from '../layout/Ripple'
import { getPostType, getMedia } from '../../utils/subredditParser'

interface PostData {
  data: {
    author: string
    created_utc: string
    domain: string
    link_flair_text: string
    num_comments: string
    preview: {
      images: {
        source: {
          url: string
        }
      }[]
      reddit_video_preview: any
    }
    post_hint: string
    score: string
    selftext: string
    secure_media: any
    subreddit: string
    stickied: string
    thumbnail: string
    title: string
    url: string
  }
}

interface SubredditPostProps {
  post: PostData
}

// preview:
// enabled: false
// images: [{…}]
// reddit_video_preview:
// dash_url: "https://v.redd.it/xomset54bx551/DASHPlaylist.mpd"
// duration: 11
// fallback_url: "https://v.redd.it/xomset54bx551/DASH_720"

export const SubredditPost: React.FC<SubredditPostProps> = ({ post }) => {
  const [clicked, setClicked] = useState(false)

  const {
    data: {
      author,
      created_utc,
      domain,
      link_flair_text,
      num_comments,
      preview,
      score,
      selftext,
      subreddit,
      stickied,
      title,
      url
    }
  } = post

  console.log(post)
  const onClick = () => {
    setClicked(!clicked)
  }

  const type = getPostType(post.data)
  const media = getMedia(post.data, type)

  return (
    <Post>
      {clicked && (
        <PicDetail onClick={onClick} thumbnail={media}>
          {type.split(':')[0] === 'video' && (
            <video
              src={media}
              width='100%'
              height='100%'
              playsInline={true}
              loop
              autoPlay={true}
            />
          )}
        </PicDetail>
      )}
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
        <PostTitle stickied={stickied ? true : false}>
          <h2>{title}</h2>
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
          <PreviewText>{selftext.split('\n')[0]}</PreviewText>
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

const Post = styled.div`
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;
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
  h2 {
    color: ${props =>
      props.stickied
        ? props.theme.colors.primaryColor
        : props.theme.colors.textColor};
    font-weight: ${props => (props.stickied ? 600 : 400)};
  }
`

const PostTitleLabel = styled.label`
  color: rgba(255, 255, 255, 0.6);
`

const PostTitleFlair = styled.span`
  color: ${props => props.theme.colors.secondaryColor};
`

const PostTitleSubreddit = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.secondaryColor};
`

const PostFooter = styled.div`
  color: rgba(255, 255, 255, 0.6);
  ul {
    padding: 1rem 0;
  }
`

const Container = styled.div`
  padding: 0.5rem;
  font-weight: 300;
`

const PicDetail = styled.div<{ thumbnail: string }>`
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
