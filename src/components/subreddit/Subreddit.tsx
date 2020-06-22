import React, { useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import RedditContext from '../../context/reddit/redditContext'

import styled from 'styled-components'
import { SubredditPost } from './SubredditPost'
import { Loading } from '../layout/Loading'

interface SubredditProps extends RouteComponentProps<{ subreddit: string }> {}

export const Subreddit: React.FC<SubredditProps> = ({ match }) => {
  const redditContext = useContext(RedditContext)
  const { posts, subreddit, loading, setSubreddit, getPosts } = redditContext

  useEffect(() => {
    setSubreddit!(match.params.subreddit)
  }, [])

  useEffect(() => {
    getPosts!()
  }, [subreddit])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className='posts'>
          <Container>
            {posts && (
              <>
                {posts.map((post, index) => (
                  <SubredditPost post={post} key={index} />
                ))}
              </>
            )}
          </Container>
        </section>
      )}
    </>
  )
}

const Container = styled.div`
  padding: 1rem;
  &:first-child {
    padding-top: 5.5rem;
  }
`
