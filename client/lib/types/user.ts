// Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'agent' | 'requester'
  avatar?: string
  department?: string
  phone?: string
  location?: string
  createdAt?: string
  lastLogin?: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}