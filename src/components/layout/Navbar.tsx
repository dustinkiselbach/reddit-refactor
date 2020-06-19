import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import RedditContext from '../../context/reddit/redditContext'

interface Props {
  setTheme: React.Dispatch<string>
  theme: string
}

export const Navbar: React.FC<Props> = ({ setTheme, theme }) => {
  const [prevScrollPos, setScrollPos] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)

  const redditContext = useContext(RedditContext)
  const { getPosts } = redditContext

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  // Hide or show the menu.
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    const visible = prevScrollPos > currentScrollPos

    setScrollPos(currentScrollPos)
    setVisible(visible)
  }

  return (
    <Nav visible={visible}>
      <NavIcon>
        <span className='material-icons'>menu</span>
      </NavIcon>
      <h2>frontpage</h2>
      <NavIcon>
        <span className='material-icons'>arrow_drop_down</span>
      </NavIcon>

      <NavIcon onClick={getPosts}>
        <span className='material-icons'>refresh</span>
      </NavIcon>
      <NavIcon>
        <span className='material-icons'>sort</span>
      </NavIcon>
      <NavIcon>
        <span className='material-icons'>more_vert</span>
      </NavIcon>
    </Nav>
  )
}

const Nav = styled.nav<{ visible: boolean }>`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  width: calc(100% - 2rem);
  background-color: ${props => props.theme.colors.backgroundColor};
  transform: translateY(${props => (props.visible ? '0' : '-100px')});
  transition: all 0.2s ease-in-out;
  z-index: 1;
`
const NavIcon = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 3rem;
  height: 3rem;
  transition: all 0.2s ease-in-out;

  span {
    font-weight: 300;
    font-size: 2.5rem;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`
