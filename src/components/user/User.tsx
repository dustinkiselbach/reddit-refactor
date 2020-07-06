import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/user/userContext'
import { RouteComponentProps } from 'react-router-dom'
import { UserHeader } from './UserHeader'
import { UserTrophies } from './UserTrophies'
import { Container } from '../style/basicStyles'

interface UserProps
  extends RouteComponentProps<{
    userName: string
  }> {}

export const User: React.FC<UserProps> = ({ match }) => {
  const userContext = useContext(UserContext)

  const { userData, userTrophies, getUserInfo } = userContext

  useEffect(() => {
    getUserInfo!(match.params.userName)
  }, [])

  return (
    <Container>
      {userData && userTrophies && (
        <>
          <UserHeader userData={userData!} />
          <UserTrophies userTrophies={userTrophies!} />
        </>
      )}
    </Container>
  )
}
