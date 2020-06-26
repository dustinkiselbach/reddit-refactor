import React, { useEffect, useContext } from 'react'

import RedditContext from '../../context/reddit/redditContext'

import styled from 'styled-components'
import { SubredditPost } from './SubredditPost'
import { Loading } from '../layout/Loading'

import { useInView } from 'react-intersection-observer'
import { PostData } from '../../context/reddit/redditTypes'
import { NoMorePosts } from './NoMorePosts'
import { GettingMorePosts } from './GettingMorePosts'
import { PageIndicator } from './PageIndicator'
import { motion } from 'framer-motion'
import { parentVariants } from '../../utils/variants'

export const Subreddit: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px'
  })

  const redditContext = useContext(RedditContext)
  const { after, posts, subreddit, loading, sortBy, getPosts } = redditContext

  //   useEffect(() => {
  //     setSubreddit!(match.params.subreddit)
  //     console.log('from 1')

  //     return () => {
  //       console.log('left')
  //     }
  //   }, [])

  // TODO fix this second page onward will load new posts
  useEffect(() => {
    if (subreddit && posts?.length === 0) {
      getPosts!()
    }
  }, [subreddit, sortBy])

  useEffect(() => {
    if (inView && after) {
      getPosts!()
    }
  }, [inView])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className='posts'>
          <Container
            variants={parentVariants}
            initial='hidden'
            animate='visible'
          >
            {posts && posts.length > 0 && (
              <>
                {posts.map((grouping, index) => (
                  <React.Fragment key={index}>
                    {index !== 0 && <PageIndicator index={index} />}
                    {grouping.map((post: PostData, index: number) => (
                      <React.Fragment key={index}>
                        <SubredditPost post={post} />
                      </React.Fragment>
                    ))}
                    <div ref={ref} />
                  </React.Fragment>
                ))}
              </>
            )}
            {!after ? <NoMorePosts /> : <GettingMorePosts />}
          </Container>
        </section>
      )}
    </>
  )
}

const Container = styled(motion.div)`
  padding: 6rem 1rem 1rem 1rem;
`
