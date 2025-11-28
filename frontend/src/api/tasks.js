import api from '../api'

export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams()
  if (filters.status) params.append('status', filters.status)
  if (filters.priority) params.append('priority', filters.priority)
  if (filters.assigned_to) params.append('assigned_to', filters.assigned_to)
  if (filters.search) params.append('search', filters.search)
  
  const response = await api.get(`/tasks?${params.toString()}`)
  return response.data
}

export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`)
  return response.data
}

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData)
  return response.data
}

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData)
  return response.data
}

export const updateTaskStatus = async (id, status) => {
  const response = await api.patch(`/tasks/${id}/status`, { status })
  return response.data
}

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`)
  return response.data
}

