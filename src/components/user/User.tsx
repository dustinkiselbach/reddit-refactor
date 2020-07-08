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

interface UserProps
  extends RouteComponentProps<{
    userName: string
  }> {}

export const User: React.FC<UserProps> = ({ match }) => {
  const state = useSelector((state: ReduxState) => state.loading)

  const userContext = useContext(UserContext)

  const {
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
    getUserPosts!(match.params.userName)
  }, [sortUserContentBy])

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
        <>{userPosts && <UserPosts userPosts={userPosts} />}</>
      )}
    </Container>
  )
}
