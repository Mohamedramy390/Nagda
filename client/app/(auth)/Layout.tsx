import { AuthProvider } from '@/context/AuthContext'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {

  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default Layout