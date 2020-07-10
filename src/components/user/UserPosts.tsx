import React from 'react'
import { CommentData, PostData } from '../../context/reddit/redditTypes'
import { SubredditPost } from '../subreddit/SubredditPost'
import { UserComment } from './UserComment'
import { PageIndicator } from '../subreddit/PageIndicator'
import { NoMorePosts } from '../subreddit/NoMorePosts'
import { GettingMorePosts } from '../subreddit/GettingMorePosts'
import { motion } from 'framer-motion'
import { childVariants } from '../../utils/variants'
import { customEase } from '../../utils/customEase'

interface UserPostsProps {
  after: string | null
  inViewRef: (node?: Element | null) => void
  userPosts: (PostData | CommentData)[][]
}

export const UserPosts: React.FC<UserPostsProps> = ({
  after,
  inViewRef,
  userPosts
}) => {
  return (
    <>
      {userPosts.map((userPostArr, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <PageIndicator index={index} />}
          {userPostArr.map((userPost, index2) => (
            <motion.div
              variants={childVariants}
              transition={{ duration: 0.2, ease: customEase }}
              key={index2}
            >
              {userPost.kind === 't1' ? (
                <UserComment comment={userPost} />
              ) : (
                <SubredditPost post={userPost} />
              )}
            </motion.div>
          ))}
          <div ref={inViewRef} />
        </React.Fragment>
      ))}
      {!after ? <NoMorePosts /> : <GettingMorePosts />}
    </>
  )
}
