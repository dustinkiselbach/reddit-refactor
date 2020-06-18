import { createContext } from 'react'
import { State } from './authTypes'

const activitiesContext = createContext<State>({})

export default activitiesContext
