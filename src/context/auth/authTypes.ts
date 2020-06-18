export interface Props {
  children: React.ReactNode
}

export type State = {
  test?: string
  stateToken?: string
  tryTest?: () => void
}

export type Actions = { type: 'TEST_TYPE' } | { type: 'TYPE_2' }
