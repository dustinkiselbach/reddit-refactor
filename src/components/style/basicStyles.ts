import styled from 'styled-components'
import { motion } from 'framer-motion'

export const DarkenBackground = styled(motion.div)`
  width: 100%;
  position: fixed;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`
