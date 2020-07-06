import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { customEase } from '../../utils/customEase'
import { Link } from 'react-router-dom'

interface CommentItemMenuProps {
  author: string
}

export const CommentItemMenu: React.FC<CommentItemMenuProps> = ({ author }) => {
  return (
    <CommentMenuItemContainer
      initial={{ scaleY: 0, y: '-100%' }}
      animate={{ scaleY: 1, y: 0 }}
      transition={{ duration: 0.2, ease: customEase }}
    >
      <Icon className='material-icons'>arrow_upward</Icon>
      <Icon className='material-icons'>arrow_downward</Icon>
      <Icon className='material-icons'>star</Icon>
      <Link to={`/user/${author}`}>
        <Icon className='material-icons'>account_circle</Icon>
      </Link>
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
