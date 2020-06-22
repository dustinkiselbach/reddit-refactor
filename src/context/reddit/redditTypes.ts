export interface Props {
  children: React.ReactNode
}

export type State = {
  loading?: boolean
  subreddit?: null | string
  sortBy?: string
  posts?: null | []
  defaultSubreddits?: null | DefaultSubreddit[]
  tryTest?: () => void
  getPosts?: () => Promise<any>
  setSubreddit?: (subreddit: string | null) => void
  changeSortBy?: (sortBy: string) => void
  setLoading?: () => void
}

type ActionInterface<T extends string, U> = {
  type: T
  payload: U
}

export type DefaultSubreddit = { name: string; icon: string }

export type AllActions =
  | ActionInterface<'TEST_TYPE', null>
  | ActionInterface<'GET_POSTS', []>
  | ActionInterface<'SET_SUBREDDIT', string | null>
  | ActionInterface<'SET_LOADING', null>
  | ActionInterface<'CHANGE_SORT_BY', string>
  | ActionInterface<'GET_DEFAULT_SUBREDDITS', DefaultSubreddit[]>
