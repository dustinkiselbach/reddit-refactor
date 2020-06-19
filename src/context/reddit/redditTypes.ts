import { AxiosResponse } from 'axios'

export interface Props {
  children: React.ReactNode
}

export type State = {
  loading?: boolean
  subreddit?: null | string
  posts?: null | []
  tryTest?: () => void
  getPosts?: () => Promise<any>
  setSubreddit?: (subreddit: string | null) => void
  setLoading?: () => void
}

type ActionInterface<T extends string, U> = {
  type: T
  payload: U
}

export type AllActions =
  | ActionInterface<'TEST_TYPE', null>
  | ActionInterface<'GET_POSTS', []>
  | ActionInterface<'SET_SUBREDDIT', string | null>
  | ActionInterface<'SET_LOADING', null>
