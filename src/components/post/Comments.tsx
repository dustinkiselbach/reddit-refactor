import React from 'react'
import { CommentData } from '../../context/reddit/redditTypes'
import { Comment } from './Comment'

interface CommentsProps {
  comments: CommentData[] | string
  number?: number
}

export const Comments: React.FC<CommentsProps> = ({ comments, number = 0 }) => {
  console.log(number)
  return (
    <>
      {comments instanceof Object && (
        <>
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} number={number} />
          ))}
        </>
      )}
    </>
  )
}
