import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { customEase } from '../../utils/customEase'

interface SubSubNavProps {
  changeSortBy: ((sortBy: string, sortByInterval?: string) => void) | undefined
  setShowSubSort: Dispatch<SetStateAction<boolean>>
  setShowSort: Dispatch<SetStateAction<boolean>>
  sortLabel: string | null
}

const options = ['hour', 'day', 'week', 'month', 'year', 'all']

export const SubSubNav: React.FC<SubSubNavProps> = ({
  changeSortBy,
  setShowSubSort,
  setShowSort,
  sortLabel
}) => {
  return (
    <>
      {sortLabel && (
        <Menu
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -100, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: customEase }}
        >
          <ul>
            <h4>{sortLabel}</h4>
            {options.map(option => (
              <li
                onClick={() => {
                  changeSortBy!(sortLabel, option)
                  setShowSubSort(false)
                  setShowSort(false)
                }}
                key={option}
              >
                {option}
              </li>
            ))}
          </ul>
        </Menu>
      )}
    </>
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

  h4 {
    padding: 1rem;
    margin: 0.5rem 0;
    font-size: 1.5rem;
    position: relative;
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
