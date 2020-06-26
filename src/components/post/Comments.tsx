import React from 'react'
import { CommentData } from '../../context/reddit/redditTypes'
import { Comment } from './Comment'

interface CommentsProps {
  comments: CommentData[] | string
  number?: number
  postName: string
  getMoreComments: (linkId: string, children: string[]) => Promise<any>
}

export const Comments: React.FC<CommentsProps> = ({
  comments,
  number = 0,
  postName,
  getMoreComments
}) => {
  return (
    <>
      {comments instanceof Object && (
        <>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              number={number}
              postName={postName}
              getMoreComments={getMoreComments}
            />
          ))}
        </>
      )}
    </>
  )
}
