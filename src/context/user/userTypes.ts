export type State = {
  test?: string
  loading?: boolean
  userData?: UserData | null
  userTrophies?: TrophyList | null
  getUserInfo?: (userName: string) => void
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
