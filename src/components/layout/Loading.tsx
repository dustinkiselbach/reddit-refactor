import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Loading: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &::after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${rotate} 0.76s linear infinite;
  }
`
