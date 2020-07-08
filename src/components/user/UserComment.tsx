import React from 'react'
import { CommentData } from '../../context/reddit/redditTypes'
import styled from 'styled-components'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

interface UserCommentProps {
  comment: CommentData
}

export const UserComment: React.FC<UserCommentProps> = ({ comment }) => {
  const {
    data: {
      author,
      body_html,
      created_utc,
      link_title,
      permalink,
      score,
      subreddit
    }
  } = comment
  return (
    <Link to={permalink}>
      <UserCommentContainer>
        <UserCommentPostTitle>{link_title}</UserCommentPostTitle>
        <UserCommentMeta>
          <UserCommentMetaItem>{author}</UserCommentMetaItem>
          <UserCommentMetaItem>{score} points</UserCommentMetaItem>
          <UserCommentMetaItem>
            <Moment unix fromNow>
              {created_utc}
            </Moment>
          </UserCommentMetaItem>
          <UserCommentMetaItem>&bull;</UserCommentMetaItem>
          <UserCommentMetaItem>{subreddit}</UserCommentMetaItem>
        </UserCommentMeta>
        <div dangerouslySetInnerHTML={{ __html: body_html }} />
      </UserCommentContainer>
    </Link>
  )
}

const UserCommentPostTitle = styled.h4`
  font-style: italic;
`

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
