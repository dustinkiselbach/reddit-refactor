import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
  padding: 6rem 1rem 1rem 1rem;
`

export const DarkenBackground = styled(motion.div)`
  width: 100%;
  position: fixed;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`
