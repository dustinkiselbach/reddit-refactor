import React from 'react'
import styled from 'styled-components'

export const NoMorePosts: React.FC = () => {
  return <MessageContainer>No more posts were loaded</MessageContainer>
}

const MessageContainer = styled.div`
  background-color: ${props => props.theme.colors.subMenuColor};
  padding: 1rem;
  width: calc(100%-2rem);
  text-align: center;
`
