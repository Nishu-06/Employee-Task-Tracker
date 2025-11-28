import api from '../api'

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (name, email, password, role = 'user') => {
  const response = await api.post('/auth/register', { name, email, password, role })
  return response.data
}

export const getMe = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const updateProfile = async (data) => {
  const response = await api.put('/auth/profile', data)
  return response.data
}

export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.put('/auth/change-password', { currentPassword, newPassword })
  return response.data
}

