import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginAPI, register as registerAPI, getMe } from '../api/auth'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await getMe()
      setUser(response.data)
    } catch (error) {
      // Token invalid, clear it
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password)
      const { user: userData, token: newToken } = response.data
      
      setUser(userData)
      setToken(newToken)
      localStorage.setItem('token', newToken)
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password, role) => {
    try {
      const response = await registerAPI(name, email, password, role)
      const { user: userData, token: newToken } = response.data
      
      setUser(userData)
      setToken(newToken)
      localStorage.setItem('token', newToken)
      
      toast.success('Registration successful!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

