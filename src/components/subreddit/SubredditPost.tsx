import React from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'

interface SubredditPostProps {
  post: any
}

export const SubredditPost: React.FC<SubredditPostProps> = ({ post }) => {
  console.log(post)

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
      thumbnail,
      title
    }
  } = post

  return (
    <Post>
      <PostPreview>
        {thumbnail !== 'self' && (
          <PreviewImage thumbnail={preview.images[0].source.url} />
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
        <PreviewText>{selftext.split('**')[1]}</PreviewText>
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
`

const PostPreview = styled.div``

const PreviewImage = styled.div<{ thumbnail: string }>`
  background-image: url(${props => props.thumbnail});
  background-size: cover;
  background-position: center;
  height: 15rem;
`

const PreviewText = styled.div`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 400;
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
