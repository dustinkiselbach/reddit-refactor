import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import RedditContext from '../../context/reddit/redditContext'
import { SubredditPost } from '../subreddit/SubredditPost'
import { Comments } from './Comments'

interface PostProps
  extends RouteComponentProps<{
    subreddit: string
    id: string
    title: string
    name: string
  }> {}

export const Post: React.FC<PostProps> = ({ match }) => {
  const {
    params: { subreddit, id, title, name }
  } = match
  const redditContext = useContext(RedditContext)
  const { post, clearPostDetail, getPostDetail } = redditContext

  useEffect(() => {
    getPostDetail!(`${subreddit}/comments/${id}/${title}`, name)

    return () => {
      clearPostDetail!()
    }
  }, [])

  console.log(post)

  return (
    <Container>
      {post && (
        <>
          <SubredditPost post={post.info} />
          <Comments comments={post.comments} />
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 6rem 1rem 1rem 1rem;
`
