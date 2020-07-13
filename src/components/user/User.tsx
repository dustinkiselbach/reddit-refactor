import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import UserContext from '../../context/user/userContext'
import { RouteComponentProps } from 'react-router-dom'
import { UserHeader } from './UserHeader'
import { UserTrophies } from './UserTrophies'
import { Container } from '../style/basicStyles'
import { UserPosts } from './UserPosts'
import { ReduxState } from '../../redux/store'
import { Loading } from '../layout/Loading'
import { useInView } from 'react-intersection-observer'
import { parentVariants } from '../../utils/variants'
import { motion } from 'framer-motion'

interface UserProps
  extends RouteComponentProps<{
    userName: string
  }> {}

export const User: React.FC<UserProps> = ({ match }) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px'
  })

  const state = useSelector((state: ReduxState) => state.loading)

  const userContext = useContext(UserContext)

  const {
    after,
    userData,
    userPosts,
    userTrophies,
    sortUserContentBy,
    getUserInfo,
    getUserPosts
  } = userContext

  useEffect(() => {
    getUserInfo!(match.params.userName)

    return () => {
      getUserInfo!(null)
      getUserPosts!(null)
    }
  }, [])

  useEffect(() => {
    if (userPosts?.length === 0) {
      getUserPosts!(match.params.userName)
    }
  }, [sortUserContentBy, userPosts])

  useEffect(() => {
    if (inView && after) {
      getUserPosts!(match.params.userName)
    }
  }, [inView])

  return (
    <Container>
      {userData && userTrophies && (
        <>
          <UserHeader userData={userData!} />
          <UserTrophies userTrophies={userTrophies!} />
        </>
      )}
      {state.loading ? (
        <Loading />
      ) : (
        <motion.div
          variants={parentVariants}
          initial='hidden'
          animate='visible'
        >
          {userPosts && (
            <UserPosts
              after={after!}
              inViewRef={inViewRef}
              userPosts={userPosts}
            />
          )}
        </motion.div>
      )}
    </Container>
  )
}
