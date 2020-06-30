import { createContext } from 'react'
import { State } from './userTypes'

const activitiesContext = createContext<State>({})

export default activitiesContext
