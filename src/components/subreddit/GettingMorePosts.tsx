import React from 'react'
import styled from 'styled-components'

export const GettingMorePosts: React.FC = () => {
  return <Loader />
}

const Loader = styled.div`
  width: 100%;
  height: 8px;
  background: #eaeaea;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  border-radius: 4px;

  &::before {
    content: ' ';
    display: block;
    position: absolute;
    width: 50%;
    height: 100%;
    background: ${props => props.theme.colors.primaryColor};
    animation: 0.4s progressIndeterminate infinite;
  }

  @keyframes progressIndeterminate {
    from {
      width: 0;
      margin-left: 0;
      margin-right: 100%;
    }

    50% {
      width: 100%;
      margin-left: 0;
      margin-right: 0;
    }

    to {
      width: 0;
      margin-left: 100%;
      margin-right: 0;
    }
  }
`
