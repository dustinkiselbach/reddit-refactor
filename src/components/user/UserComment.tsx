import React from 'react'
import { CommentData } from '../../context/reddit/redditTypes'
import styled from 'styled-components'
import Moment from 'react-moment'

interface UserCommentProps {
  comment: CommentData
}

export const UserComment: React.FC<UserCommentProps> = ({ comment }) => {
  const {
    data: {
      author,
      author_flair_text,
      body_html,
      created_utc,
      id,
      link_title,
      score,
      subreddit
    }
  } = comment
  return (
    <UserCommentContainer>
      <div>{link_title}</div>
      <UserCommentMeta>
        <UserCommentMetaItem>{author}</UserCommentMetaItem>
        <UserCommentMetaItem>{score} points</UserCommentMetaItem>
        <UserCommentMetaItem>
          <Moment unix fromNow>
            {created_utc}
          </Moment>
        </UserCommentMetaItem>
        <UserCommentMetaItem>{subreddit}</UserCommentMetaItem>
      </UserCommentMeta>
      <div dangerouslySetInnerHTML={{ __html: body_html }} />
    </UserCommentContainer>
  )
}

const UserCommentContainer = styled.div`
  position: relative;
  margin: 1px 0;
  padding: 0.5rem;

  a {
    color: ${props => props.theme.colors.primaryColor};
    text-decoration: underline;
  }
  color: ${props => props.theme.colors.textColor};
`
const UserCommentMeta = styled.ul`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.textColorFaded};
  font-size: 0.8rem;
`

const UserCommentMetaItem = styled.li`
  border-radius: 2.5px;
  margin-right: 0.4rem;
`
