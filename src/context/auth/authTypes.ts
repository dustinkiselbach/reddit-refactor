export interface Props {
  children: React.ReactNode
}

export type State = {
  authenticated?: boolean
  test?: string
  stateToken?: string
  tryTest?: () => void
}

type ActionInterface<T extends string, U> = {
  type: T
  payload: U
}

export type AllActions =
  | ActionInterface<'TEST_TYPE', null>
  | ActionInterface<'AUTHENTICATE', boolean>
