import React from 'react'
import styled from 'styled-components'

interface PageIndicatorProps {
  index: number
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({ index }) => {
  return (
    <PageIndicatorContainer>
      <span className='material-icons' onClick={() => window.scrollTo(0, 0)}>
        keyboard_arrow_up
      </span>{' '}
      Page {index + 1}{' '}
      <span
        className='material-icons'
        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
      >
        keyboard_arrow_down
      </span>
    </PageIndicatorContainer>
  )
}

const PageIndicatorContainer = styled.div`
  padding: 1rem;
  width: calc(100%-2rem);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.colors.textColorFaded};
`
