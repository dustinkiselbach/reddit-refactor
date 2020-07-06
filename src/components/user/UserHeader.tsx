import React from 'react'
import { UserData } from '../../context/user/userTypes'
import styled from 'styled-components'
import Moment from 'react-moment'

interface UserHeaderProps {
  userData: UserData
}

export const UserHeader: React.FC<UserHeaderProps> = ({ userData }) => {
  console.log(userData)

  const {
    data: { comment_karma, created_utc, name, link_karma }
  } = userData

  return (
    <UserDataContainer>
      <UserKarma>
        <h2>{link_karma}</h2>
        <label>post karma</label>
      </UserKarma>
      <UserKarma>
        <h2>{comment_karma}</h2>
        <label>comment karma</label>
      </UserKarma>
      <UserDates>
        <p>
          redditor for <Moment date={created_utc} durationFromNow unix />
        </p>
        <p>
          joined on{' '}
          <Moment format='YYYY/MM/DD' unix>
            {created_utc}
          </Moment>
        </p>
      </UserDates>
      <div>+ Friends</div>
    </UserDataContainer>
  )
}

const UserDataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
`
const UserKarma = styled.div`
  padding: 1rem;

  h2 {
    font-size: 2rem;
    text-align: center;
    margin: 2px;
  }

  label {
    text-transform: uppercase;
    color: ${props => props.theme.colors.textColorFaded};
  }
`
const UserDates = styled.div`
  padding: 1rem;
  p {
    color: ${props => props.theme.colors.textColorFaded};
    margin: 2px;
  }
`
