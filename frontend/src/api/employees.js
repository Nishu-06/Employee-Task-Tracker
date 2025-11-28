import api from '../api'

export const getEmployees = async (filters = {}) => {
  const params = new URLSearchParams()
  if (filters.department) params.append('department', filters.department)
  if (filters.role) params.append('role', filters.role)
  if (filters.search) params.append('search', filters.search)
  
  const response = await api.get(`/employees?${params.toString()}`)
  return response.data
}

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`)
  return response.data
}

export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData)
  return response.data
}

export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData)
  return response.data
}

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`)
  return response.data
}

