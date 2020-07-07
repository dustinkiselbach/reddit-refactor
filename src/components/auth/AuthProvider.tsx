import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authContext = useContext(AuthContext)

  return (
    <>
      {authContext.authenticated ? (
        children
      ) : (
        <div style={{ backgroundColor: '#000000', height: '100vh' }} />
      )}
    </>
  )
}
