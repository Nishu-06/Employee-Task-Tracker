import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'https://employee-task-tracker-vfc4.onrender.com/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || 'An error occurred'

      if (status === 401) {
        localStorage.removeItem('token')
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      return Promise.reject(new Error(message))
    }

    if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'))
    }

    return Promise.reject(error)
  }
)

export default api

