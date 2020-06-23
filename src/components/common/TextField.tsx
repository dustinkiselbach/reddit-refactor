import React from 'react'
import styled from 'styled-components'

interface TextFieldProps {
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  value,
  onChange
}) => {
  return (
    <Input
      type='text'
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}

const Input = styled.input`
  padding: 1rem 0;
  width: calc(100% - 2rem);
  background-color: ${props => props.theme.colors.backgroundColor};
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.textColorFaded};
  font-family: inherit;
  color: ${props => props.theme.colors.textColor};
  font-weight: bold;
  overflow: visible;

  &::placeholder {
    color: ${props => props.theme.colors.textColorFaded};
  }

  &:focus {
    outline: none;
  }
`
