import React, { useState, MouseEvent } from 'react'
import styled from 'styled-components'
import { useDebouncedRippleCleanUp } from '../../hooks/useDebouncedRippleCleanup'

interface RippleProps {
  duration?: number
  color?: string
}

interface NewRipple {
  x: number
  y: number
  size: number
}

export const Ripple: React.FC<RippleProps> = ({
  duration = 850,
  color = '#fff'
}) => {
  const [rippleArray, setRippleArray] = useState<NewRipple[]>([])

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([])
  })

  const addRipple = (event: MouseEvent) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect()
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height

    const x =
      event.pageX -
      rippleContainer.x -
      rippleContainer.width / 2 -
      window.scrollX
    const y =
      event.pageY -
      rippleContainer.y -
      rippleContainer.width / 2 -
      window.scrollY
    const newRipple = {
      x,
      y,
      size
    }

    setRippleArray(prevState => [...prevState, newRipple])
  }

  return (
    <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={'ripple_' + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size
              }}
            />
          )
        })}
    </RippleContainer>
  )
}

const RippleContainer = styled.div<{ color: string; duration: number }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${props => props.color};
    animation-name: ripple;
    animation-duration: ${props => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`
