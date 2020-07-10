import { PostData, CommentData } from '../reddit/redditTypes'

export type State = {
  after?: string | null
  test?: string
  loading?: boolean
  userData?: UserData | null
  userPosts?: (PostData | CommentData)[][]
  userTrophies?: TrophyList | null
  userName?: string | null
  sortUserContentBy?: string
  getUserInfo?: (userName: string | null) => void
  getUserPosts?: (userName: string | null) => void
  changeSortUserContentBy?: (sortBy: string) => void
}

export interface Trophy {
  data: {
    award_id: string | null
    description: string | null
    icon_40: string
    icon_70: string
    id: string
    name: string
    url: string | null
  }
  kind: 't6'
}

export interface TrophyList {
  data: {
    trophies: Trophy[]
  }
  kind: 'TrophyList'
}

export interface UserData {
  data: {
    comment_karma: number
    created_utc: number
    name: string
    link_karma: number
    subreddit: any
  }
  kind: 't2'
}

type ActionInterface<T extends string, U> = {
  type: T
  payload: U
}

export type AllActions =
  | ActionInterface<'TEST_TYPE', null>
  | ActionInterface<'GET_USER_TROPHIES', TrophyList>
  | ActionInterface<'GET_USER_ABOUT', UserData>
  | ActionInterface<'GET_USERNAME', string | null>
  | ActionInterface<'CLEAR_USER_INFO', null>
  | ActionInterface<'CHANGE_SORT_USER_CONTENT_BY', string>
  | ActionInterface<'GET_USER_POSTS', (CommentData | PostData)[]>
  | ActionInterface<'CLEAR_USER_POSTS', null>
  | ActionInterface<'SET_AFTER', string>
