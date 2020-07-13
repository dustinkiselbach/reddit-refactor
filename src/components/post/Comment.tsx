import React, { useState, Dispatch, SetStateAction } from 'react'
import { CommentData, CommentMore } from '../../context/reddit/redditTypes'
import { Comments } from './Comments'
import styled from 'styled-components'
import Moment from 'react-moment'
import { motion } from 'framer-motion'
import { childVariants } from '../../utils/variants'
import { customEase } from '../../utils/customEase'
import { decodeHTML } from '../../utils/decodeHtml'
import { CommentItemMenu } from './CommentItemMenu'

interface CommentProps {
  clickedId: string | null
  setClickedId: Dispatch<SetStateAction<string | null>>
  comment: CommentData | CommentMore
  number: number
  more?: boolean
  postName: string
  getMoreComments: (linkId: string, children: string[]) => Promise<any>
}

const isComment = (variableToCheck: any): variableToCheck is CommentData =>
  (variableToCheck as CommentData).kind === 't1'

const colors = ['#de3e49', '#3e56de', '#d433ce', '#33d453', '#ed683b']

export const Comment: React.FC<CommentProps> = ({
  clickedId,
  setClickedId,
  comment,
  number,
  more,
  postName,
  getMoreComments
}) => {
  const [loadMore, setLoadMore] = useState(false)

  const [moreComments, setMoreComments] = useState<CommentData[] | null>(null)

  const getMoreReplies = async (children: string[]) => {
    setLoadMore(true)
    const res = await getMoreComments(postName, children)
    setMoreComments(res)
  }
  // console.log(comment)
  // console.log(moreComments)

  if (isComment(comment)) {
    const {
      data: {
        author,
        author_flair_text,
        body_html,
        created_utc,
        distinguished,
        id,
        is_submitter,
        replies,
        score,
        score_hidden,
        stickied
      }
    } = comment

    return (
      <>
        <CommentContainer
          variants={childVariants}
          exit={{ x: -200 }}
          transition={{ duration: 0.2, ease: customEase }}
          style={{ marginLeft: number * 2 }}
          labelColor={
            number === 0 ? 'transparent' : colors[number % colors.length]
          }
          onClick={() => setClickedId(id)}
          clicked={clickedId === id}
        >
          <CommentItem>
            <CommentMeta>
              <CommentMetaItem
                isSubmitter={is_submitter}
                isSticked={stickied}
                isDistinguished={distinguished === 'moderator' ? true : false}
              >
                {author}
              </CommentMetaItem>

              {author_flair_text && (
                <CommentMetaItem isFlair={true}>
                  {author_flair_text}
                </CommentMetaItem>
              )}
              {distinguished && (
                <CommentMetaItem>[{distinguished[0]}]</CommentMetaItem>
              )}
              <CommentMetaItem>
                {score_hidden ? '[score hidden]' : `${score} points`}
              </CommentMetaItem>

              <CommentMetaItem>
                <Moment unix fromNow>
                  {created_utc}
                </Moment>
              </CommentMetaItem>
            </CommentMeta>
            <div
              dangerouslySetInnerHTML={
                !more
                  ? { __html: body_html }
                  : { __html: decodeHTML(body_html) }
              }
            ></div>
          </CommentItem>
        </CommentContainer>
        {clickedId === id && <CommentItemMenu author={author} />}
        {/* recursivly calling replies */}
        {replies instanceof Object && (
          <Comments
            comments={replies.data.children}
            number={number + 1}
            getMoreComments={getMoreComments}
            postName={postName}
            clickedId={clickedId}
            setClickedId={setClickedId}
          />
        )}
      </>
    )
  } else {
    const {
      data: { count, children, id }
    } = comment

    if (id === '_') {
      return null
    }

    return (
      <>
        {!moreComments ? (
          <CommentContainer
            variants={childVariants}
            transition={{ duration: 0.2, ease: customEase }}
            style={{ marginLeft: number * 2 }}
            labelColor={
              number === 0 ? 'transparent' : colors[number % colors.length]
            }
            more={true}
            onClick={() => getMoreReplies(children)}
          >
            {loadMore ? (
              <CommentItem>Loading . . . </CommentItem>
            ) : (
              <CommentItem>View More ({count})</CommentItem>
            )}
          </CommentContainer>
        ) : (
          <>
            {moreComments &&
              moreComments.map((comment: CommentData, index: number) => (
                <>
                  <Comment
                    key={index}
                    more={true}
                    comment={comment}
                    number={comment.data.depth}
                    postName={postName}
                    getMoreComments={getMoreComments}
                    clickedId={clickedId}
                    setClickedId={setClickedId}
                  />
                </>
              ))}
          </>
        )}
      </>
    )
  }
}

const CommentContainer = styled(motion.div)<{
  labelColor: string
  clicked?: boolean
  more?: boolean
}>`
  position: relative;
  margin: 1px 0;
  &:before {
    content: '';
    width: 5px;
    height: 100%;
    background-color: ${props => props.labelColor};
    position: absolute;
    margin-left: -0.5rem;
  }
  a {
    color: ${props => props.theme.colors.primaryColor};
    text-decoration: underline;
  }
  color: ${props =>
    props.more
      ? props.theme.colors.primaryColor
      : props.theme.colors.textColor};

  background-color: ${props => props.clicked && props.theme.colors.highlight};
`
const CommentItem = styled.div`
  padding: 0.5rem;
  overflow-x: hidden;
`
const CommentMeta = styled.ul`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.textColorFaded};
  font-size: 0.8rem;
`

const CommentMetaItem = styled.li<{
  isSubmitter?: boolean
  isSticked?: boolean
  isDistinguished?: boolean
  isFlair?: boolean
}>`
  border-radius: 2.5px;
  margin-right: 0.4rem;

  ${props => {
    if (props.isSubmitter) {
      return `
        padding: 0.2rem 0.4rem;
        background-color: #3e56de;
        color: ${props.theme.colors.textColor};
      `
    } else if (props.isSticked || props.isDistinguished) {
      return `
        padding: 0.2rem 0.4rem;
        background-color: #33d453;
        color: ${props.theme.colors.textColor};
      `
    } else if (props.isFlair) {
      return `
        color: ${props.theme.colors.primaryColor};
      `
    }
  }}
`
