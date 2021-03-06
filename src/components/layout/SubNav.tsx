import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { customEase } from '../../utils/customEase'

interface SubNavProps {
  changeSortBy: ((sortBy: string) => void) | undefined
  options: string[]
  subSubEnabled?: boolean
  setShowSubSort?: Dispatch<SetStateAction<boolean>>
  setSortLabel?: Dispatch<SetStateAction<string | null>>
}

export const SubNav: React.FC<SubNavProps> = ({
  changeSortBy,
  options,
  subSubEnabled,
  setShowSubSort,
  setSortLabel
}) => {
  const openSubSubMenu = (option: string) => {
    setShowSubSort!(true)
    setSortLabel!(option)
  }

  return (
    <Menu
      animate={{ y: 0, x: 0, opacity: 1 }}
      initial={{ y: -100, x: 10, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: customEase }}
    >
      <ul>
        {options.map(option => (
          <li
            key={option}
            onClick={() => {
              subSubEnabled && (option === 'top' || option === 'controversial')
                ? // open subsub menu
                  openSubSubMenu(option)
                : changeSortBy!(option)
            }}
          >
            {option}
            {subSubEnabled && option === 'top' && (
              <span className='material-icons'>arrow_right</span>
            )}
            {subSubEnabled && option === 'controversial' && (
              <span className='material-icons'>arrow_right</span>
            )}
          </li>
        ))}
      </ul>
    </Menu>
  )
}

const Menu = styled(motion.div)`
  position: absolute;
  width: 189px;
  text-align: left;
  top: 0;
  left: 0;
  z-index: 2;
  margin-top: -17px;
  margin-left: -60px;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.subMenuColor};
  box-shadow: ${props => props.theme.boxShadow};
  overflow: hidden;

  ul {
    li {
      overflow: hidden;
      padding: 1rem;
      margin: 0.5rem 0;
      font-size: 1.5rem;
      position: relative;
      text-transform: capitalize;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &::after {
        position: absolute;
        content: '';
        display: inline-block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        background-color: transparent;
        border-radius: 50px;
        transition: 0.2s all ease-in-out;
        z-index: -1;
      }
      &:active {
        &::after {
          background-color: ${props => props.theme.colors.navActive};
          transform: scale(50);
        }
      }
    }
  }
`
