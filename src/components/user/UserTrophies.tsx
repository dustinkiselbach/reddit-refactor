import React from 'react'
import { TrophyList, Trophy } from '../../context/user/userTypes'
import styled from 'styled-components'

interface UserTrophiesProps {
  userTrophies: TrophyList
}

export const UserTrophies: React.FC<UserTrophiesProps> = ({ userTrophies }) => {
  const {
    data: { trophies }
  } = userTrophies

  return (
    <TrophyCase>
      {trophies.map((trophy: Trophy, index: number) => (
        <TrophyItem key={index}>
          <img src={trophy.data.icon_40} alt='' />
          <label>{trophy.data.name}</label>
        </TrophyItem>
      ))}
    </TrophyCase>
  )
}

const TrophyCase = styled.div`
  display: flex;
  overflow-x: scroll;
`
const TrophyItem = styled.div`
  margin: 0.5rem;
  display: grid;
  grid-template-rows: 1fr max-content;
  align-items: center;
  justify-items: center;

  img {
    margin: 0.5rem;
  }

  label {
    color: ${props => props.theme.colors.textColorFaded};
    white-space: nowrap;
  }
`
