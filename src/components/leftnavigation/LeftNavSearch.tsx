import React, { useState } from 'react'
import { TextField } from '../common/TextField'
import styled from 'styled-components'

interface LeftNavSearchProps {
  placeholder: string
  setSubreddit: (subreddit: string | null) => void
  setShowLeft: React.Dispatch<boolean>
  subredditAutocomplete: (query: string) => void
}

export const LeftNavSearch: React.FC<LeftNavSearchProps> = ({
  placeholder,
  setSubreddit,
  setShowLeft,
  subredditAutocomplete
}) => {
  const [field, setField] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(e.target.value)
    subredditAutocomplete(e.target.value)
  }

  const onSubmit = () => {
    setSubreddit(field)
    setShowLeft(false)
  }

  return (
    <>
      <TextField placeholder={placeholder} onChange={onChange} value={field} />
      {field.length > 0 && (
        <>
          <Icon
            className='material-icons'
            onClick={() => {
              setField('')
              subredditAutocomplete('')
            }}
          >
            close
          </Icon>
          <SubmitButton onClick={onSubmit}>Go</SubmitButton>
        </>
      )}
    </>
  )
}

const Icon = styled.span`
  margin-left: -2rem;
  color: ${props => props.theme.colors.textColorFaded};
`
const SubmitButton = styled.button`
  border: none;
  background-color: ${props => props.theme.colors.backgroundColor};
  color: ${props => props.theme.colors.textColorFaded};
  outline: none;
`
