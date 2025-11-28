import api from './axios'

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats')
  return response.data
}

export const getEmployeeWorkload = async () => {
  const response = await api.get('/dashboard/employee-workload')
  return response.data
}

