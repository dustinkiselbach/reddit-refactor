import React, { useContext } from 'react'
import { CommentData } from '../../context/reddit/redditTypes'
import RedditContext from '../../context/reddit/redditContext'
import styled from 'styled-components'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

interface UserCommentProps {
  comment: CommentData
}

// quick fix to format the link to work seamlessly
// with the way my post component works
const fixPermalinkUrl = (permalink: string, linkId: string) => {
  let linkArr = permalink.split('/')
  linkArr[linkArr.length - 2] = linkId
  return linkArr.join('/')
}

export const UserComment: React.FC<UserCommentProps> = ({ comment }) => {
  const redditContext = useContext(RedditContext)
  const {
    data: {
      author,
      body_html,
      created_utc,
      link_title,
      link_id,
      permalink,
      score,
      subreddit
    }
  } = comment

  return (
    <Link
      to={fixPermalinkUrl(permalink, link_id)}
      onClick={() => redditContext.clearPosts!()}
    >
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
  overflow-x: hidden;

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
