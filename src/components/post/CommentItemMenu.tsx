import React, { useContext } from 'react'
import UserContext from '../../context/user/userContext'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { customEase } from '../../utils/customEase'

interface CommentItemMenuProps {
  author: string
}

export const CommentItemMenu: React.FC<CommentItemMenuProps> = ({ author }) => {
  const userContext = useContext(UserContext)

  const { getUserAbout } = userContext

  return (
    <CommentMenuItemContainer
      initial={{ scaleY: 0, y: '-100%' }}
      animate={{ scaleY: 1, y: 0 }}
      transition={{ duration: 0.2, ease: customEase }}
    >
      <Icon className='material-icons'>arrow_upward</Icon>
      <Icon className='material-icons'>arrow_downward</Icon>
      <Icon className='material-icons'>star</Icon>
      <Icon className='material-icons' onClick={() => getUserAbout!(author)}>
        account_circle
      </Icon>
      <Icon className='material-icons'>reply</Icon>
      <Icon className='material-icons'>expand_less</Icon>
      <Icon className='material-icons'>more_vert</Icon>
    </CommentMenuItemContainer>
  )
}

const CommentMenuItemContainer = styled(motion.div)`
  background-color: ${props => props.theme.colors.subMenuColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Icon = styled.span`
  padding: 1rem;
`
