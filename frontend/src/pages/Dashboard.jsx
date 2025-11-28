import { useEffect, useState } from 'react'
import { Users, CheckSquare, CheckCircle2, Clock } from 'lucide-react'
import { getDashboardStats } from '../api/dashboard'
import LoadingSpinner from '../components/LoadingSpinner'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await getDashboardStats()
      setStats(response.data)
    } catch (error) {
      toast.error(error.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    )
  }

  const statusColors = {
    'To Do': '#3b82f6',
    'In Progress': '#f59e0b',
    'Completed': '#10b981'
  }

  const priorityColors = {
    'Low': '#6b7280',
    'Medium': '#f59e0b',
    'High': '#ef4444'
  }

  const statusData = stats.tasksByStatus.map(item => ({
    name: item.status,
    value: item.count,
    color: statusColors[item.status] || '#6b7280'
  }))

  const priorityData = stats.tasksByPriority.map(item => ({
    name: item.priority,
    value: item.count,
    color: priorityColors[item.priority] || '#6b7280'
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Overview of your team and tasks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.overview.totalEmployees}
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.overview.totalTasks}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.overview.completedTasks}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.overview.pendingTasks}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Status */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Tasks by Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks by Priority */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Tasks by Priority
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Tasks
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {stats.recentTasks.length} {stats.recentTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        {stats.recentTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No recent tasks</p>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.recentTasks.map((task) => {
              const assignedTo = task.assigned_to;
              const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'Completed';
              
              return (
                <div
                  key={task._id || task.id || Math.random()}
                  className="group relative flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200"
                >
                  {/* Status indicator bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
                    task.status === 'Completed' ? 'bg-green-500' :
                    task.status === 'In Progress' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {task.title}
                      </h3>
                      {isOverdue && (
                        <span className="flex-shrink-0 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                          Overdue
                        </span>
                      )}
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status Badge */}
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        task.status === 'In Progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {task.status}
                      </span>
                      
                      {/* Priority Badge */}
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {task.priority} Priority
                      </span>
                      
                      {/* Assigned To */}
                      {assignedTo && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <img
                            src={assignedTo.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(assignedTo.name)}&background=random`}
                            alt={assignedTo.name}
                            className="h-6 w-6 rounded-full border-2 border-white dark:border-gray-700"
                          />
                          <span className="font-medium">{assignedTo.name}</span>
                        </div>
                      )}
                      
                      {/* Deadline */}
                      {task.deadline && (
                        <div className={`flex items-center gap-1.5 text-xs ${
                          isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Due: {format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

