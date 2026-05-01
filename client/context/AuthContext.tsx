'use client'


import { loginAction, logoutAction, verifySessionAction } from '@/lib/api/actions/auth'
import { AuthContextType, User } from '@/lib/types/user'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'




// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const verifySession = async () => {
      const user = await verifySessionAction()
      if (!user) {
        logout()
      }else{
        setUser(user)
      }
    }
    verifySession()
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    try{
    const user = await loginAction(email, password)
    setUser(user)
    router.push('/portal/dashboard')     
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    await logoutAction()
    router.push('/login')
  }

  

  const updateUser = (updates: Partial<User>) => {
     
  }


  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


export default AuthContext
function setError(message: any) {
  throw new Error('Function not implemented.')
}

