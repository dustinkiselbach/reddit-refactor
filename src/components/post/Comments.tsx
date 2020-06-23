import React from 'react'
import { CommentData } from '../../context/reddit/redditTypes'
import { Comment } from './Comment'

interface CommentsProps {
  comments: CommentData[]
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.data.author} comment={comment} />
      ))}
    </div>
  )
}
