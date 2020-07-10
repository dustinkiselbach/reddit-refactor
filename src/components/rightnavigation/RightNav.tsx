import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { customEase } from '../../utils/customEase'
import { DarkenBackground } from '../style/basicStyles'
import { decodeHTML } from '../../utils/decodeHtml'

interface RightNavProps {
  subredditInfo: any
}

export const RightNav: React.FC<RightNavProps> = ({ subredditInfo }) => {
  const {
    data: { display_name, description_html }
  } = subredditInfo

  return (
    <>
      <DarkenBackground
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: customEase }}
      />
      <RightNavMenu
        animate={{ x: 0 }}
        initial={{ x: 500 }}
        exit={{ x: 500 }}
        transition={{ duration: 0.2, ease: customEase }}
      >
        {display_name}
        <div
          dangerouslySetInnerHTML={{ __html: decodeHTML(description_html) }}
        ></div>
      </RightNavMenu>
    </>
  )
}

const RightNavMenu = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundColor};
  position: fixed;
  width: 80%;
  height: 100%;
  z-index: 4;
  overflow-y: scroll;
  right: 0;
  padding: 1rem;
`
