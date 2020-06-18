import { createContext } from 'react'
import { State } from './redditTypes'

const redditContext = createContext<State>({})

export default redditContext
