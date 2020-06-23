import React from 'react'
import { CommentData } from '../../context/reddit/redditTypes'

interface CommentProps {
  comment: CommentData
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const {
    data: { author, body, replies }
  } = comment

  return (
    <div>
      --{author}, ------ {body}
    </div>
  )
}
