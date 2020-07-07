import React from 'react'
import { CommentData, PostData } from '../../context/reddit/redditTypes'
import { SubredditPost } from '../subreddit/SubredditPost'
import { UserComment } from './UserComment'

interface UserPostsProps {
  userPosts: (PostData | CommentData)[][]
}

export const UserPosts: React.FC<UserPostsProps> = ({ userPosts }) => {
  return (
    <>
      {userPosts.map((userPostArr, index) => (
        <div key={index}>
          {userPostArr.map((userPost, index2) => (
            <React.Fragment key={index2}>
              {userPost.kind === 't1' ? (
                <UserComment comment={userPost} />
              ) : (
                <SubredditPost post={userPost} />
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </>
  )
}
