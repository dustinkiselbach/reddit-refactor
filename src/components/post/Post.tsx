import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import RedditContext from '../../context/reddit/redditContext'
import { SubredditPost } from '../subreddit/SubredditPost'
import { Comments } from './Comments'
import { motion } from 'framer-motion'
import { parentVariants } from '../../utils/variants'
import { customEase } from '../../utils/customEase'
import { Container } from '../style/basicStyles'
import { ReduxState } from '../../redux/store'
import { Loading } from '../layout/Loading'

interface PostProps
  extends RouteComponentProps<{
    subreddit: string
    id: string
    title: string
    name: string
  }> {}

export const Post: React.FC<PostProps> = ({ match }) => {
  const [clickedId, setClickedId] = useState<null | string>(null)

  const state = useSelector((state: ReduxState) => state.loading)

  const {
    params: { subreddit, id, title, name }
  } = match

  const redditContext = useContext(RedditContext)
  const {
    post,
    comments,
    sortCommentsBy,
    clearPostDetail,
    clearCommentDetail,
    getPostDetail,
    getMoreComments
  } = redditContext

  useEffect(() => {
    getPostDetail!(`${subreddit}/comments/${id}/${title}`, name)

    return () => {
      clearPostDetail!()
      clearCommentDetail!()
    }
  }, [sortCommentsBy])

  return (
    <>
      {state.loading ? (
        <Loading />
      ) : (
        <Container
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2, ease: customEase }}
        >
          {post && (
            <>
              <SubredditPost post={post} detail={true} />
            </>
          )}
          {comments && (
            <>
              <CommentsContainer
                variants={parentVariants}
                initial='hidden'
                animate='visible'
              >
                <Comments
                  comments={comments}
                  getMoreComments={getMoreComments!}
                  postName={name}
                  setClickedId={setClickedId}
                  clickedId={clickedId}
                />
              </CommentsContainer>
            </>
          )}
        </Container>
      )}
    </>
  )
}

const CommentsContainer = styled(motion.div)`
  box-shadow: ${props => props.theme.boxShadow};
`
