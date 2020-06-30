export type State = {
  test?: string
  getUserAbout?: (userName: string) => void
  getUserTrophies?: (userName: string) => void
}

type ActionInterface<T extends string, U> = {
  type: T
  payload: U
}

export type AllActions = ActionInterface<'TEST_TYPE', null>
